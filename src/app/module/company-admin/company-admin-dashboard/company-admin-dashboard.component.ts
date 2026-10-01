import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { CompanyAdminService } from '../company-admin.service';
import { HttpStatusCode } from '@angular/common/http';
import { CompanyAdminTrendingCourseDto } from 'src/app/shared/model/company-admin/company-admin-trending-course-dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestDto } from 'src/app/shared/model/requesDto';

@Component({
  selector: 'app-company-admin-dashboard',
  templateUrl: './company-admin-dashboard.component.html',
  styleUrls: ['./company-admin-dashboard.component.scss']
})
export class CompanyAdminDashboardComponent implements OnInit{


  dashboardStatusArray:any='';
  trendingCardsArray:CompanyAdminTrendingCourseDto[]=[];
  isLoading: boolean = false;
  requestDto:RequestDto= new RequestDto();
  imgId:any="";
  getImageUrl: string[] = [];


  constructor(
    public _commonService: CommonService,
    private _service:CompanyAdminService,
    private _router:Router,
    private _toastr:ToastrService) {}

  ngOnInit():void{
    this.getDashboardStatus();
    this.getTrendingCardDetails();
  }

  getDashboardStatus(){
    this.isLoading = true;
    this._service.getDashboardStatus().subscribe({
      next:(response:any)=>{
        if(  response.code == HttpStatusCode.Ok){
          this.dashboardStatusArray = response.data;
          console.log(this.dashboardStatusArray);
        }
        else if(response.code == 401){
          this._router.navigate(['/'])
        }
        this.isLoading = false;
      },
      error:(response:any)=>{
        this._toastr.error(response.error.message, 'Error!')
        this.isLoading = false;

      }
    })
  }
  getTrendingCardDetails(){
    this._service.getTrendingCourses().subscribe({
      next:(response:any)=>{
        if(response.code == HttpStatusCode.Ok){
          this.trendingCardsArray = response.data
          this.imgId = this.trendingCardsArray.map(card => card.coverImage);
          console.log(this.imgId);

        }
        else if(response.code == 401){
          this._router.navigate(['/'])
        }
        this.isLoading = false;
      },
      error:(response:any)=>{
        this._toastr.error(response.error.message, 'Error!')
        this.isLoading = false;

      }
    })
  }

  getImages(imgId:string[]){
    this._service.getImage(imgId).subscribe({
      next:(response:any)=>{
        this.getImageUrl = response.previewUrl
        console.log(this.getImageUrl, 'testt');
      }
    })
  }
  id!:number;
  activeInactiveItme(id:any){
    this.isLoading = true;
    console.log(id);
    this._service.getActiveInactiveCourse(id, this.requestDto).subscribe({
      next:(response:any)=>{
        console.log(response, 'fav');
        // this._location.go(this._location.path())
        this.isLoading = false;
        this.getTrendingCardDetails();
      }
    })
  }



}

export type DashboardCard = {
  name: String;
  totalCourses: String;
  image_url: String;
};

