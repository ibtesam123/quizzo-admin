import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constant';
import { Category } from '../models/category.model';
import { Question } from '../models/question.model';
import { CategoryListResponse, CategoryResponse } from '../response/category.response';
import { QuestionListResponse, QuestionResponse } from '../response/question.response';
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

      // Upload category
      let res = await this.http.post<CategoryResponse>(`${BASE_URL}/category`,
        {
          name: catName,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.authService.admin.token}`,
            'content-type': 'application/json'
          }
        }).toPromise()

      // Upload image
      let formData = new FormData()
      formData.append('image', image)

      let res2 = await this.http.post<CategoryResponse>(
        `${BASE_URL}/category/image?catID=${res.data.id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.authService.admin.token}`,
          }
        },
      ).toPromise()

      this.categoryList.push(res2.data)

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
    categoryID: number,
    image: File,
  ): Promise<boolean> {

    try {

      console.log(categoryID)

      //Upload question
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

      // Upload image
      if (image) {
        let formData = new FormData()
        formData.append('image', image)

        await this.http.post<QuestionResponse>(
          `${BASE_URL}/question/image?qID=${res.data.id}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${this.authService.admin.token}`,
            }
          },
        ).toPromise()
      }

      this.error = undefined

      return true

    } catch ({ error }) {
      console.log(error)
      this.error = error?.message
      return false
    }

  }

  async getQuestionsForCategory(id: number, pageIndex: number): Promise<Question[]> {
    try {

      let res = await this.http.get<QuestionListResponse>(
        `${BASE_URL}/question/category/${id}?limit=20`,
        {
          headers: {
            'Authorization': `Bearer ${this.authService.admin.token}`
          }
        }
      ).toPromise()

      return res.data

    } catch ({ error }) {
      console.log(error)
      return []
    }
  }
}
