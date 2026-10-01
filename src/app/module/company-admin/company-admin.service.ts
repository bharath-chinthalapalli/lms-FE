import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CompanyAdminAddUserDto } from 'src/app/shared/model/company-admin/company-admin-add-user-dto';
import { CompanyAdminGroupUSersDto } from 'src/app/shared/model/company-admin/company-admin-group-users-dto';
import { companyAdminUserAssignDto } from 'src/app/shared/model/company-admin/company-admin-user-assign-dto';
import { RequestDto } from 'src/app/shared/model/requesDto';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {

  constructor(
    private _http:HttpClient,
    private apiService:ApiService
  ) { }

  baseUrl = this.apiService.baseUrl;
  apiUrls = {
    getDashboardStatusApi: 'company_admin/dashboard-count',
    getTrendingCoursesApi: 'company_admin/get-trending-course',
    getFavouriteCoursesApi:'company_admin/get-favorite-course',
    getAvailableCoursesApi: 'company_admin/get-available-course',
    getPurchasedCoursesApi:'company_admin/get-all-purchased-course',
    getFavoroiteCoursesApi: 'company_admin/get-favorite-course',
    getActiveInactiveCourseApi: 'company_admin/favorite-course',
    getAllUsersDataApi:'company_admin/get-all-users-data',
    saveUserApi:'company_admin/add-user',
    getAllSkillsApi:'skill/get-all',
    saveAssignUserApi:'company_admin/assign-course',
    getUserListForAssignApi:'company_admin/get-user-for-assign',
    getUserForAssign:'company_admin/get-user-for-assign',
    getImageUrl:'s3-bucket/view-data',
    saveGroupUsersApi:'company_admin/save-group-user',
    getAllSkillsApiGet: 'company_admin/get-all-skill-name',
    getAllGroupDetailsApi:'company_admin/get-all-group',
    getNotPresent:'company_admin/get-not-present-user',
    saveAssignUserGroupApi:'company_admin/add-user-to-group',
  }
  //dashboard:
  getDashboardStatus(){
    return this._http.get(this.baseUrl + this.apiUrls.getDashboardStatusApi)
  }

  getTrendingCourses(){
    return this._http.get(this.baseUrl + this.apiUrls.getTrendingCoursesApi)
  }

  getFavouriteCourses(){
    return this._http.get(this.baseUrl + this.apiUrls.getFavouriteCoursesApi)
  }
  //courses:
  getAvailableCourses(requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getAvailableCoursesApi, requestPayload)
  }
  getPurchasedCourses(requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getPurchasedCoursesApi, requestPayload)
  }
  getFavouriteCoursesTab(requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getFavoroiteCoursesApi, requestPayload )
  }
  getActiveInactiveCourse(id:number, requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getActiveInactiveCourseApi +'/'+ id, requestPayload)
  }
  //users:
  getAllUsersData(requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getAllUsersDataApi, requestPayload);
  }
  saveUser(requestPayload:CompanyAdminAddUserDto){
    return this._http.post(this.baseUrl + this.apiUrls.saveUserApi, requestPayload)
  }
  getAllSkills(id:number|undefined, requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getAllSkillsApi, requestPayload)
  }
  getUserListForAssign( id:any , requestPayload:RequestDto ){
    return this._http.post(this.baseUrl + this.apiUrls.getUserListForAssignApi + '/' + id , requestPayload)
  }
  saveAssignUser(requestPayload:any){
    return this._http.post(this.baseUrl + this.apiUrls.saveAssignUserApi, requestPayload)
  }
  updateAssignUser( requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.saveUserApi , requestPayload)
  }
  getUserForAssign(id:any, requestPayload:RequestDto){
    return this._http.post(this.baseUrl + this.apiUrls.getUserForAssign + '/' + id, requestPayload )
  }
  getImage(id:any){
    return this._http.get(this.baseUrl + this.apiUrls.getImageUrl + '/' + id )
  }
  saveGroupUsers(requestPayload:any){
    return this._http.post(this.baseUrl + this.apiUrls.saveGroupUsersApi ,requestPayload)
  }
  getAllSkillsDetails(){
    return this._http.get(this.baseUrl + this.apiUrls.getAllSkillsApiGet )
  }
  getAllGroupDetails(requestPayload:RequestDto){
    return this._http.post(this.baseUrl+ this.apiUrls.getAllGroupDetailsApi, requestPayload)
  }
  getUserForAssignFromGroups(id:any){
    return this._http.get(this.baseUrl + this.apiUrls.getNotPresent + '/' + id)
  }
  saveAssignUserGroup(requestPayload:any){
    return this._http.post(this.baseUrl + this.apiUrls.saveAssignUserGroupApi , requestPayload)
  }

}
