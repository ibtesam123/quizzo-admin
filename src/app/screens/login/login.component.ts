import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE } from 'src/app/constants/constant';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
  ) { }

  ngOnInit(): void {
  }

  rememberMe: boolean = false

  rememberClasses = {
    'bg-blue-500': this.rememberMe,
    'bg-gray-300': !this.rememberMe
  }

  authLoading: boolean = false
  authError: string

  email: string
  password: string

  toggleRemember() {
    this.rememberMe = !this.rememberMe
    this.rememberClasses = {
      'bg-blue-500': this.rememberMe,
      'bg-gray-300': !this.rememberMe
    }
  }

  async login(event) {
    event.preventDefault()
    this.authLoading = !this.authLoading

    if (!this.email || this.email.length == 0 || !this.password || this.password.length == 0) {
      this.authError = "email and password required"
      this.authLoading = false
      return
    }

    this.authError = undefined

    let res = await this.authService.login(this.email, this.password)

    console.log(res)

    if (res) {
      this.authLoading = false
      this.authError = undefined

      if (this.rememberMe)
        this.cookieService.set(AUTH_COOKIE, this.authService.admin.token)

      this.router.navigate(['/home'])
    } else {
      this.authLoading = false
      this.authError = this.authService.error
    }

    this.email = ""
    this.password = ""
  }

}
