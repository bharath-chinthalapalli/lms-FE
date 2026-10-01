import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { CompanyAdminService } from '../company-admin.service';
import { RequestDto } from 'src/app/shared/model/requesDto';
import { CompanyAdminGroupUSersDto } from 'src/app/shared/model/company-admin/company-admin-group-users-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { Subscription } from 'rxjs';
import { TextEnums } from 'src/app/utils/text-enum-utils';
import { AssignUserGroupComponent } from 'src/app/shared/components/popupForms/assign-user-group/assign-user-group.component';

@Component({
  selector: 'app-company-admin-groups',
  templateUrl: './company-admin-groups.component.html',
  styleUrls: ['./company-admin-groups.component.scss']
})
export class CompanyAdminGroupsComponent implements OnInit{
  @Output() messageToParent = new EventEmitter<string>();
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  private closeSubscription!: Subscription;
  getGroupsDetailsArray:CompanyAdminGroupUSersDto[]=[];
  groupID?:number;
  requestDto:RequestDto = new RequestDto();
  addAssignUserGroupForm!:FormGroup;
  currentPage:number = 0
  pageSize:number = 9;
  totalPages:any;
  offset: any;
  numberOfElements: any;
  totalElements: any;


  constructor(
    public _commonService:CommonService,
    private _service:CompanyAdminService,
    private _fb:FormBuilder
  ){}
  ngOnInit(): void {
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
      this.validateForm();
      this.getGroupsDetails();
  }
  validateForm() {
    this.addAssignUserGroupForm = this._fb.group({
      groupId: [],
      groupMemberIds:['',Validators.required]
    })
  }
  getGroupsDetails(){
    this._service.getAllGroupDetails(this.requestDto).subscribe({
      next: (response:any)=>{
        this.getGroupsDetailsArray = response.data.content;
        console.log(response);
        this.totalPages = response.data.totalPages;
        this.offset = response.data?.pageable?.offset;
        this.numberOfElements = response.data.numberOfElements;
        this.totalElements = response.data.totalElements;
       
      }
    })
  }
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.requestDto.pageNumber = this.currentPage;
    this.getGroupsDetails();
    // this.getFollowUpDetails(this.activeTab)
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
    this.getGroupsDetails();
  }


  openPopupAssignUser(id:any){
    this.groupID=id;
    console.log(this.groupID);
    
    this.openPopupAssignUserGroup();
  }

  openPopupAssignUserGroup(){
    this.addAssignUserGroupForm.reset();
    try{
      const hostViewContainerRef = this.loadPopup.viewContainerRef;
      hostViewContainerRef.clear()
      const componentRef = 
        hostViewContainerRef.createComponent(AssignUserGroupComponent);
        componentRef.instance.addAssignUserGroupForm = this.addAssignUserGroupForm;
        componentRef.instance.title = TextEnums.ADD_TEXT;
        componentRef.instance.type = TextEnums.COMPANY_ADMIN_ASSIGN_USERS_FROM_GROUP_USER_CARD;
        componentRef.instance.btntext = "Add";
        componentRef.instance.id = this.groupID;
        this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        });
        this.closeSubscription = componentRef.instance.isAdded.subscribe(
          (isAdded) => {
            if (isAdded) {
              // this.saveCreateGroup(hostViewContainerRef);
            }
          }
        );
    }
    catch (error) {
      console.log(error);
      
    }
  }

  

}
