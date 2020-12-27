import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constant';
import { Category } from '../models/category.model';
import { CategoryListResponse } from '../response/category.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  categoryList: Category[]

  async getAllCategory(): Promise<void> {
    try {
      if (this.categoryList)
        return

      let res = await this.http.get<CategoryListResponse>(`${BASE_URL}/category`).toPromise()

      this.categoryList = res.data

    } catch ({ error }) {
      console.log(error)
    }
  }

  async refreshCategory(): Promise<void> {
    try {
      let res = await this.http.get<CategoryListResponse>(`${BASE_URL}/category`).toPromise()

      this.categoryList = res.data

    } catch ({ error }) {
      console.log(error)
    }
  }
}
