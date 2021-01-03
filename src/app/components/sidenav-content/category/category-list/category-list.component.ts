import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
  ) { }

  @Output()
  addCategoryEvent = new EventEmitter()

  categoryList: Category[]
  categoryLoading: boolean
  searchText: string = ""

  ngOnInit(): void {
    this.categoryLoading = true
    this.apiService.getAllCategory()
      .then((_) => {
        this.categoryLoading = false
        if (this.apiService.categoryList)
          this.categoryList = this.apiService.categoryList
        else
          this.categoryList = []
        this.categoryLoading = false
      })
  }

  async refreshCategory() {

    this.categoryLoading = true

    await this.apiService.refreshCategory()
    this.categoryList = this.apiService.categoryList

    this.categoryLoading = false
  }

  addCategoryClicked() {
    this.addCategoryEvent.emit("")
  }

}
