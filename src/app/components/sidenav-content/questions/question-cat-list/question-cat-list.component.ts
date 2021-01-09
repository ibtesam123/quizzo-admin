import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question-cat-list',
  templateUrl: './question-cat-list.component.html',
  styleUrls: ['./question-cat-list.component.css']
})
export class QuestionCatListComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
  ) { }

  @Output()
  backEvent = new EventEmitter()

  @Output()
  categoryEvent = new EventEmitter()

  categoryList: Category[] = []
  categoryLoading: boolean = false

  colorList: string[] = [
    '#64748B',
    '#EF4444',
    '#F97316',
    '#F59E0B',
    '#84CC16',
    '#22C55E',
    '#14B8A6',
    '#0EA5E9',
    '#8B5CF6',
    '#EC4899',
    '#F43F5E',
  ]

  ngOnInit(): void {
    this.categoryLoading = true
    if (!this.apiService.categoryList) {
      this.apiService.getAllCategory().then(_ => {
        this.categoryLoading = false
        this.categoryList = this.apiService.categoryList
      })
    } else {
      this.categoryLoading = false
      this.categoryList = this.apiService.categoryList
    }
  }

  backClicked() {
    this.backEvent.emit("")
  }

  getColor(i: number): string {
    if (i >= this.colorList.length) {
      i = i % this.colorList.length
    }
    const color = this.colorList[i]

    return `background-color:${color};`
  }

  categoryClicked(index: number) {
    this.categoryEvent.emit(this.categoryList[index].id)
  }
}
