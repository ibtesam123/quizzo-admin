import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private readonly apiService: ApiService,
  ) { }

  categoryList: Category[]
  categoryLoading: boolean

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

}
