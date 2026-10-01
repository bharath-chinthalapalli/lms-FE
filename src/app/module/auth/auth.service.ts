import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { LoginDto } from 'src/app/shared/model/loginDto';
import { Observable } from 'rxjs';
import { loggedInUserDto } from 'src/app/shared/model/loggedInUserDto';
import { ChangePasswordDto } from 'src/app/shared/model/forms/changePasswordDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = this.apiService.baseUrl;
  apiUrls = {
    login: 'auth/login',
    changePasswordApi:'auth/change-password',
    logOutApi:'auth/logout'
  }


  constructor(
    private _http: HttpClient,
    private apiService: ApiService
  ) { }

  login(requestPayload: LoginDto): Observable<ApiResponse<loggedInUserDto>>  {
    return this._http.post<ApiResponse<loggedInUserDto>>(this.baseUrl + this.apiUrls.login, requestPayload);
  }

  changePassword(requestPayload:ChangePasswordDto){
    return this._http.post(this.baseUrl + this.apiUrls.changePasswordApi, requestPayload)
  }
  logOut(){
    return this._http.get(this.baseUrl + this.apiUrls.logOutApi)
  }











}

export interface ApiResponse<T> {
  phoneNumber: string;
  password: string;
  data: T;
  statusCode: number;
  value: null;
  msg: null;
}

export interface ApiResponseWithContent<T> {
  status: string;
  message: string;
  data: {
    content: T[];
    totalPages: number;
    count: number;
  };
  statusCode: number;
  value: null;
  msg: null;
}