import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { loggedInUserDto } from 'src/app/shared/model/loggedInUserDto';
import { RequestDto } from 'src/app/shared/model/requesDto';
import { ApiResponse } from '../auth/auth.service';
import { AddOrganisation } from './super-admin-organisation/super-admin-organisation.component';
import { SuperAdminSkillsDto } from 'src/app/shared/model/super-admin/super-admin-skills-Dto';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  constructor(
    private _http: HttpClient,
    private apiService: ApiService
  ) { }

  baseUrl = this.apiService.baseUrl;
  apiUrls = {
    getOrganisationDetails: 'organisation/get-all',
    saveOrganisation:'organisation/save',
    getStatusCardDetailsApiUrl: 'super_admin_dashboard/get-all-count',
    getSkillsDataApiUrl:'skill/get-all',
    saveSkillsApiUrl:'skill/add'
  }

  //ORGANISATION
  getOrganisationDetails(requestPayload: RequestDto):Observable<ApiResponse<loggedInUserDto>>{
    return this._http.post<ApiResponse<loggedInUserDto>>(this.baseUrl + this.apiUrls.getOrganisationDetails, requestPayload)
  }
  saveOrganisation(requestPayload:AddOrganisation){
    return this._http.post(this.baseUrl + this.apiUrls.saveOrganisation, requestPayload)
  }
  updateOrganisation(requestPayload:AddOrganisation, id:any){
    return this._http.post(this.baseUrl + this.apiUrls.saveOrganisation, requestPayload + '/'+ id)
  }
  //DASHBOARD
  getStatusCardDetailsApi(){
    return this._http.get(this.baseUrl + this.apiUrls.getStatusCardDetailsApiUrl)
  }
  //SKILLS
  getSkilsDetails(requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getSkillsDataApiUrl, requestPayload)
  }
  saveSkills(requestPayload:SuperAdminSkillsDto){
    return this._http.post(this.baseUrl + this.apiUrls.saveSkillsApiUrl, requestPayload)
  }
}
