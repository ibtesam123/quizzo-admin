import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constant';
import { Category } from '../models/category.model';
import { CategoryListResponse, CategoryResponse } from '../response/category.response';
import { QuestionResponse } from '../response/question.response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) { }

  categoryList: Category[]

  error: string

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

  async addCategory(catName: string, image: File): Promise<boolean> {
    try {
      let res = await this.http.post<CategoryResponse>(`${BASE_URL}/category`,
        {
          name: catName,
          image: null,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.authService.admin.token}`,
            'content-type': 'application/json'
          }
        }).toPromise()

      this.categoryList.push(res.data)

      this.error = undefined

      return true

    } catch ({ error }) {
      console.log(error)
      this.error = error?.message
      return false
    }
  }

  async addQuestion(
    question: string,
    options: string[],
    answer: number,
    categoryID: number
  ): Promise<boolean> {

    try {

      let res = await this.http.post<QuestionResponse>(
        `${BASE_URL}/question`,
        {
          "question": question,
          "options": options,
          "answer": answer,
          "categoryID": categoryID,
        }, {
        headers: {
          'Authorization': `Bearer ${this.authService.admin.token}`
        }
      }
      ).toPromise();

      console.log(res.data)
      this.error = undefined

      return true

    } catch ({ error }) {
      console.log(error)
      this.error = error?.message
      return false
    }

  }
}
