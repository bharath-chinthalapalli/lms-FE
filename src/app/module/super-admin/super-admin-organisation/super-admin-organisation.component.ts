import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { SuperAdminService } from '../super-admin.service';
import { RequestDto } from 'src/app/shared/model/requesDto';
import { ThreedotsMenu } from 'src/app/shared/components/three-dots-menu/three-dots-menu';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-super-admin-organisation',
  templateUrl: './super-admin-organisation.component.html',
  styleUrls: ['./super-admin-organisation.component.scss'],
})
export class SuperAdminOrganisationComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  organisationArray: Organisation[] = [];
  currentPage: number = 0;
  pageSize: number = 2;
  totalPages: any;
  totalElements!:number;
  addOrganisationForm!: FormGroup;
  requestDto:RequestDto = new RequestDto();
  RequestPayload: any;
  orgId:any;
  numberOfElements: any;
  number:any;
  offset: any;
  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private _service: SuperAdminService,
  ) {}

  organisationTableHeader: string[] = [
    'Organization Name',
    'Admin Name',
    'Email Id',
    'Phone Number',
    'Assigned Courses',
    'No. of Employees',
  ];

 

  ngOnInit(): void {
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
    this.getAllOrganisationData();
    this.addOrganisationFormInitailzed();
  }
  ngOnDestroy(): void {
    this.commonService.triggerTheAddFormData.next('');
  }

  addOrganisationFormInitailzed() {
    this.addOrganisationForm = this.formBuilder.group({
      id:[],
      name: ['',Validators.required],
      adminName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  // getAllOrganisationData() {
  //   this.apiService
  //     .getService(this.apiService.LMS_API_URL.orgainsation_process_url + 'all')
  //     .subscribe({
  //       next: (res: any) => {
  //         this.organisationArray = res?.data;
  //       },
  //     });
  // }


  //getAllData
  getAllOrganisationData() {
    this._service.getOrganisationDetails(this.requestDto).subscribe({
      next:(response:any)=>{
        if(response.code == HttpStatusCode.Ok){
          this.organisationArray = response.data.content;
          
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          this.numberOfElements = response.data.numberOfElements;
          this.number = response.data.number;
          this.orgId = response.data.content.id;
          this.offset = response.data.pageable.offset;
          console.log(response.data.content.id);
          this.pageRecord(response.pageable);
          
        }
        else {
        }
      }
    })
  }

  initialPagelog:number=0;
  endingPagelog:number=0;
  pageRecord(data:any){
   this.initialPagelog = (10*data.offset + 1);
   this.endingPagelog = (10*data.offset) + this.organisationArray.length;
  }

  //add from modal
  openAddorganisationPopup() {
    this.addOrganisationFormInitailzed();
    this.commonService.openPopuop(
      this.loadPopup,
      this.commonService.TextEnums.SUPER_ADMIN_ADD_ORGANISATION,
      this.commonService.TextEnums.CANCLE_TEXT,
      this.commonService.TextEnums.SUBMIT_TEXT,
      this.addOrganisationForm,
      'Add Organisation',
      this.addOrganisation.bind(this)
    );
  }

  //save 
  addOrganisation(){
    if(this.orgId){
      this._service.updateOrganisation(this.addOrganisationForm.value, this.orgId).subscribe({
        next:(response:any)=>{
          this.getAllOrganisationData();
        }
      })
    }else{
      this._service.saveOrganisation(this.addOrganisationForm.value).subscribe({
        next:(response:any)=>{
          this.getAllOrganisationData();
        }
      })

    }
  }
  //pagination
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.requestDto.pageNumber = this.currentPage;
    this.getAllOrganisationData();
  }



  threeDotsMenuOption: ThreedotsMenu[] = [
    {
      text: this.commonService.TextEnums.EDIT_TEXT,
      icon: this.commonService.Images.EDIT_ICON,
      clickHandler: (event: Event, orgId:any) => {
        console.log(event, ' clicl h');
        // this.openAddorganisationPopup()
        
        this.editUser(orgId)
      },
    },
    {
      text: this.commonService.TextEnums.MAKE_INACTIVE_TEXT,
      icon: this.commonService.Images.INACTIVE_ICON,
      clickHandler: (event: Event) => {
        this.commonService.openGenericPopup(
          this.loadPopup,
          this.commonService.TextEnums.ACTIVE_INACTIVE_POPUP
        );
      },
    },
  ];

  editUser(orgId:any){
    this.orgId = orgId;
    console.log(this.orgId);
    
    // this.addOrganisationForm.reset();
    this.addOrganisationForm.patchValue;
    this.editOpenAddOrganisationPopup()
  }

  editOpenAddOrganisationPopup(){
    this.addOrganisationFormInitailzed();
        this.commonService.openPopuop(
      this.loadPopup,
      this.commonService.TextEnums.SUPER_ADMIN_ADD_ORGANISATION,
      this.commonService.TextEnums.CANCLE_TEXT,
      this.commonService.TextEnums.SUBMIT_TEXT,
      this.addOrganisationForm,
      'Edit Organisation',
      this.addOrganisation.bind(this)
    );

  }


  // addOrganisation() {
  //   const url = `${
  //     this.apiService.LMS_API_URL.orgainsation_process_url + 'add'
  //   }`;

  //   this.apiService.postService(url, this.addOrganisationForm.value).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //       this.getAllOrganisationData();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}

export type Organisation = {
  id: number;
  isDeleted: boolean;
  isActive: boolean;
  searchKey: string;
  name: string;
  adminName: string;
  email: string;
  phoneNumber: string;
  userCount:string;
  courseCount:string;
  
};

export interface AddOrganisation {
  id:number;
  name: string;
  adminName: string;
  email: string;
  phoneNumber: string;
  
}

// private Long id;
// private String name;
// private String adminName;
// private String email;
// private String phoneNumber;
// private Role role;
// private Boolean isActive;
// private String password;
