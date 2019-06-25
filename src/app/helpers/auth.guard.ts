import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad,
  Route, Router,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { stringify } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private authService: AuthService) {}

  private isMatch = false;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.canActivate(route, state) && this.checkRole(url);
  }

  canLoad(route: Route) {
    const url = `/${route.path}`;
    return this.checkRole(url);
  }

  checkLogin(url: string) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

  checkRole(url: string) {
    const check = this.authService.checkRole(url);
    if (!check) {
      alert('No permission to access ' + url);
    }
    return check;
  }

}
