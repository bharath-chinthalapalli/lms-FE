import { isPlatformBrowser } from '@angular/common';
import { Injectable,  Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  public loginUserValidation = new BehaviorSubject({})

  getLoggedInUser() {
    const loggedIn = isPlatformBrowser(this.platformId)
      ? localStorage.getItem("loggedInUser")
      : "";
    return loggedIn;
  }
  //  localStorageData:any;
  setLoggedInUser(localStorageData:any) {
    localStorage.setItem("loggedInUser", JSON.stringify(localStorageData));
  }
  removeLoggedInUser() {
    localStorage.removeItem("loggedInUser");
  }

}
