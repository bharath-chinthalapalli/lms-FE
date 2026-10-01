import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseUrl + '/api/v1/';
  // baseUrl = "https://7fdb4d97e7a961.lhr.life" +  "/api/v1/";
  API_URL = {}

  // LMS_API_URL = {

  // orgainsation_process_url: 'organization/',
  // skill_management_process_url: 'skill/',
  // };
  constructor(private _httpclient: HttpClient, private _router: Router) {}

  /**
   * Get Method getting Data From Back-End   --Deepa
   * @param url
   * @param params
   * Added HttpHeaders to call security based api
   */

  getService(url: string, params?: any) {
    return this._httpclient
      .get(this.baseUrl + url)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .pipe(
        catchError((response) => {
          this.errorHandlerForHttpRequest(response);
          return of(null);
        })
      );
  }
  // Post Method Call Retreive data from server
  postService(url: string, data?: any) {
    return this._httpclient
      .post(this.baseUrl + url, data)
      .pipe(
        map(
          (response: any) => {
            return response;
          },
          (error: any) => {}
        )
      )
      .pipe(
        catchError((response) => {
          this.errorHandlerForHttpRequest(response);
          return of(null);
        })
      );
  }
  // Update Method Call Retreive data from server
  putService(url: string, data?: any) {
    return this._httpclient
      .put(this.baseUrl + url, data)
      .pipe(
        map(
          (response: any) => {
            return response;
          },
          (error: any) => {
            console.log(error);
          }
        )
      )
      .pipe(
        catchError((response) => {
          this.errorHandlerForHttpRequest(response);
          return of(null);
        })
      );
  }
  // Delete Method Call Retreive data from server
  deleteService(url: string) {
    return this._httpclient
      .delete(this.baseUrl + url)
      .pipe(
        map(
          (response: any) => {
            return response;
          },
          (error: any) => {
            console.log(error);
          }
        )
      )
      .pipe(
        catchError((response) => {
          this.errorHandlerForHttpRequest(response);
          return of(null);
        })
      );
  }
  errorHandlerForHttpRequest(error: Response | any) {
    if (error.error && error.status.code === 401) {
    } else if (error.status === HttpStatusCode.Forbidden) {
      if (error.message) {
      }
    } else if (
      error.status === HttpStatusCode.BadRequest ||
      error.status === HttpStatusCode.InternalServerError ||
      error.status === 0 ||
      error.status === HttpStatusCode.NotFound
    ) {
      if (error.message) {
      }
    }

    return throwError(error);
  }
}
