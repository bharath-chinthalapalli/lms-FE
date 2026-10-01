import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate() {
    // let currentUser: boolean = JSON.parse(this.loggedInUserService.getLoggedInUser());

    // if (currentUser /*&& currentUser.auth_token*/) {
    //   return true;
    // }
    // this._router.navigate(["/login"]);
    return false;
  }
}
