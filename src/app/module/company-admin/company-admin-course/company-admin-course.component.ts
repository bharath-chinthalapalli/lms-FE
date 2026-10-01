import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { CompanyAdminService } from '../company-admin.service';
import { ToastrService } from 'ngx-toastr';
import { RequestDto } from 'src/app/shared/model/requesDto';
import { CompanyAdminAvailableCourseDto } from 'src/app/shared/model/company-admin/company-admin-available-course-dto';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { Subscription } from 'rxjs';
import { TextEnums } from 'src/app/utils/text-enum-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { companyAdminUserAssignDto } from 'src/app/shared/model/company-admin/company-admin-user-assign-dto';

@Component({
  selector: 'app-company-admin-course',
  templateUrl: './company-admin-course.component.html',
  styleUrls: ['./company-admin-course.component.scss']
})
export class CompanyAdminCourseComponent implements OnInit{
  @Output() messageToParent = new EventEmitter<string>();
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  private closeSubscription!: Subscription;
  currentPage:number =0;
  pageSize:number = 5;
  totalPages:any;
  requestDto:RequestDto= new RequestDto();
  companyAdminUserAssignDto:companyAdminUserAssignDto = new companyAdminUserAssignDto();
  availableCoursesArray:CompanyAdminAvailableCourseDto[]=[];
  purchasedCoursesArray:any[]=[];
  favoriteCoursesArray:any[]=[];
  activeTab!:string;
  addUserForm!: FormGroup;
  getUserListForAssignArray:any[]=[];
  getUserByAssignList:companyAdminUserAssignDto[]=[];

  imgId:any="";
  getImageUrl: string[] = [];

  tags:any

  TableTheadArray:string[]=[
    'Course Name',
    'Category',
    'Available till',
    'Licenses',
    ''
  ]
  isLoading: boolean = false;
  offset: any;
  numberOfElements: any;
  totalElements: any;

 
  actionId: any;
  coverImagesArray: any []= [];




  constructor(
    public _commonService:CommonService,
    private _service:CompanyAdminService,
    private _toastr:ToastrService,
    private _router:Router,
    private _location:Location,
    private _fb: FormBuilder,
  ){}
  ngOnInit(): void {
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
    this.getAvailableCourses();
    this.activeTab = this._commonService.TextEnums.AVAILABLE_COURSES;   
    this.validateForm();   
  }
  goToCourses(courseType:any){
    if(courseType == this._commonService.TextEnums.AVAILABLE_COURSES){
      // this.availableCoursesArray = [];
      this.activeTab = courseType;
      this.getAvailableCourses()
    }else if(courseType == this._commonService.TextEnums.PURCHASED_COURSES){
      this.purchasedCoursesArray =[];
      this.activeTab = courseType;
      this.getPurchasedCourse()
    }else if(courseType == this._commonService.TextEnums.FAVORITE_COURSES){
      this.purchasedCoursesArray =[];
      this.activeTab = courseType;
      this.getFavoriteCourse()
    }
  }
  getAvailableCourses(){
    this.isLoading = true;
    this._service.getAvailableCourses(this.requestDto).subscribe({
      next:(response:any)=>{
        if(response.code == HttpStatusCode.Ok){
          this.availableCoursesArray = response.data.content;
          this.imgId = this.availableCoursesArray.map(card => card.coverImage);
          
          
          // this.coverImagesArray = this.availableCoursesArray.map(image => image.fileData);
          // console.log(this.coverImagesArray);
        }
        else if(response.code == 401){
          this._router.navigate(['/'])
        }
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
  getPurchasedCourse(){
    this.isLoading = true;
    this._service.getPurchasedCourses(this.requestDto).subscribe({
      next:(response:any)=>{
        this.purchasedCoursesArray = response.data.content;
        this.isLoading = false;
        this.totalPages = response.data.totalPages;
        this.offset = response.data?.pageable?.offset;
        this.numberOfElements = response.data.numberOfElements;
        this.totalElements = response.data.totalElements;
        this.pageRecord(response.pageable);
      }
    })
  }
  initialPagelog:number=0;
  endingPagelog:number=0;
  pageRecord(data:any){
   this.initialPagelog = (10*data.offset + 1);
   this.endingPagelog = (10*data.offset) + this.purchasedCoursesArray.length;
  }
  getFavoriteCourse(){
    this.isLoading = true;
    this._service.getFavouriteCoursesTab(this.requestDto).subscribe({
      next:(response:any)=>{
        this.favoriteCoursesArray = response.data.content;
        this.isLoading = false;
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
        this.getAvailableCourses();
        this.getFavoriteCourse();
      }
    })
  }

  getSearchData(event: any) {
    let value = event.target.value;
    if(value.length >= 3){
      this.requestDto.key = value;
      this.currentPage = 0
      this.requestDto.pageNumber = 0;
    }else{
      delete this.requestDto.key;
      this.currentPage = 0
      this.requestDto.pageNumber = 0;
    }
    this.getAvailableCourses();
    this.getPurchasedCourse();
    this.getFavoriteCourse();
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.requestDto.pageNumber = this.currentPage;
    this.getPurchasedCourse();
    // this.getFollowUpDetails(this.activeTab)
  }

  // openActions(id: any) {
  //   this.actionId = id;
  // }

  validateForm() {
    this.addUserForm = this._fb.group({
      courseId: [],
      appUserId: ["", Validators.required],
    });
  }
  get appUserId() {
    return this.addUserForm.get("appUserId");
  }
  actionEditId: any;
  openEditActions(id: any) {
    this.actionEditId = id;
  }

  tableID?:number;
  user(id:any){
    console.log(id);
    this.actionEditId = '';
    this.tableID=id;
    this.addCustomerPopup();
    // this._router.navigate(
    //   [],{
    //     queryParams: { Id: id}
    //   }
    // )


  }

  addCustomerPopup() {
    // console.log(id);
    this.validateForm();
    this._commonService.openPopuop(
      this.loadPopup,
      this._commonService.TextEnums.COMPANY_ADMIN_ASSIGN_USERS,
      this._commonService.TextEnums.CLOSE_TEXT,
      this._commonService.TextEnums.ADD_TEXT,
      this.addUserForm,'Assign Users',
      this.saveAdmin.bind(this),
      this.tableID
    )
  }

  saveAdmin(hostViewContainerRef: ViewContainerRef) {
    this.isLoading = true;
    this._service.saveAssignUser(this.getUserByAssignList).subscribe({
      next: (response:any) => {
        if (response.code == HttpStatusCode.Ok) {
          // this.getUsers();
          // this._toastService.initiate(response.message, Toast_Types.success);
          // this._customToastrService.success(response.message, "Success");
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        } else {
          // this._customToastrService.error(response.message, "Info");
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }


  groupUser(id:any){
    console.log(id);
    this.actionEditId = '';
  }

  navToCourseDetails(){
    this._router.navigate(['/company-admin/company-admin-course-details'])
  }
  
  
}

 // (
      //   {
      //     queryParams: { Id: id}
      //   }
      // )
   
      // this._service.getUserListForAssign(id , this.requestDto).subscribe({
      //   next:(response:any)=>{
      //     console.log(response);
      //     this.getUserListForAssignArray = response.data;
      //   }
      // })



       // this.addUserForm.reset();
    // try {   
    //   const hostViewContainerRef = this.loadPopup.viewContainerRef;
    //   hostViewContainerRef.clear();
    //   const componentRef =
    //     hostViewContainerRef.createComponent(AssignUserComponent);
    //     componentRef.instance.addUserForm = this.addUserForm;
    //   componentRef.instance.title = TextEnums.ASSIGN_USER;
    //   componentRef.instance.type = TextEnums.COMPANY_ADMIN_USERS;
    //   componentRef.instance.btntext = "Assign";
      
    
    //   this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
    //     this.closeSubscription.unsubscribe();
    //     hostViewContainerRef.clear();
    //   });

    //   this.closeSubscription = componentRef.instance.isAdded.subscribe(
    //     (isAdded) => {
    //       if (isAdded) {
    //         this.saveAdmin(hostViewContainerRef);
    //       }
    //     }
    //   );
    // } catch (error) {
    // }
