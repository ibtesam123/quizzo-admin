import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AUTH_COOKIE } from '../constants/constant';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }


  async validateAdmin(): Promise<boolean> {

    if (this.cookieService.check(AUTH_COOKIE)) {

      if (this.authService.admin)
        return true


      let token = this.cookieService.get(AUTH_COOKIE)

      let res = await this.authService.getAdmin(token)

      if (!res) {
        this.cookieService.delete(AUTH_COOKIE)
        this.router.navigate(['/login'])
        return false
      }
      return true
    } else {

      if (this.authService.admin) {
        console.log('admin found')
        return true
      }

      this.router.navigate(['/login'])
      return false
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateAdmin();
  }

}
