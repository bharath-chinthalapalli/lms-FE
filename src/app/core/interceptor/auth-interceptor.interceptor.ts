import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUserService } from 'src/app/shared/services/logged-in-user.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private loggedInUserService: LoggedInUserService) { }

  intercept(
    request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedInUserStringValue = this.loggedInUserService.getLoggedInUser();
    if (loggedInUserStringValue) {
      let loggedInUser = JSON.parse(loggedInUserStringValue)
      if (loggedInUser && loggedInUser.token) {
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer '+ loggedInUser.token,
          }
        });

      }
    }
    return next.handle(request);
  }
}
