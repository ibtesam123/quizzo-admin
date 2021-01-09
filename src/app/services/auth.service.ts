import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/constant';
import { User } from '../models/user.model';
import { ErrorResponse } from '../response/error.response';
import { UserResponse } from '../response/user.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admin: User

  errorMessage: string

  constructor(
    private readonly http: HttpClient,
  ) { }

  async login(email: string, password: string): Promise<boolean> {

    try {
      let res = await this.http.post<UserResponse>(
        `${BASE_URL}/user/login`,
        {
          email: email,
          password: password
        }).toPromise()

      this.admin = res.data
      this.errorMessage = undefined
      return true
    } catch ({ error }) {
      console.log(error)
      this.errorMessage = error.message
      this.admin = undefined
      return false
    }
  }

  async getAdmin(token: string): Promise<boolean> {
    try {

      let res = await this.http.get<UserResponse>(
        `${BASE_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).toPromise()

      this.admin = res.data
      this.errorMessage = undefined

      return true
    } catch ({ error }) {
      this.errorMessage = error.message
      this.admin = undefined
      return false
    }
  }

}
