import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { CompanyAdminUsersDto } from 'src/app/shared/model/company-admin/company-admin-users-dto';
import { CompanyAdminService } from '../company-admin.service';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { RequestDto } from 'src/app/shared/model/requesDto';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyAdminAddUserDto } from 'src/app/shared/model/company-admin/company-admin-add-user-dto';
import { InviteUserComponent } from 'src/app/shared/components/popupForms/invite-user/invite-user.component';
import { TextEnums } from 'src/app/utils/text-enum-utils';
import { Subscription } from 'rxjs';
import { CreateGroupComponent } from 'src/app/shared/components/popupForms/create-group/create-group.component';
import { AddUserComponent } from 'src/app/shared/components/popupForms/add-user/add-user.component';

interface Item {
  id:number;
  selected:boolean;
  name: string;
  phoneNumber: string;
  groups: string;
  skill: string;
  numberOfCourses: string
}

@Component({
  selector: 'app-company-admin-users',
  templateUrl: './company-admin-users.component.html',
  styleUrls: ['./company-admin-users.component.scss']
})
export class CompanyAdminUsersComponent implements OnInit {
  @Output() messageToParent = new EventEmitter<string>();
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  private closeSubscription!: Subscription;
  getUsersArray: CompanyAdminUsersDto[]= [];
  requestDto:RequestDto = new RequestDto();
  companyUsersDto: CompanyAdminUsersDto = new CompanyAdminUsersDto();
  pageSize:number = 6;
  currentPage:number = 0;
  totalPages:any;
  addInviteUserForm!:FormGroup;
  addCreateGroupForm!:FormGroup;
  offset: any;
  numberOfElements: any;
  totalElements: any;
  tableID?:any[]=[];
  selectAllChecked?: boolean;
  isCreateGroupButtonEnabled: boolean = false;
   // Add a new property to track whether any checkbox is checked
   anyCheckboxChecked: boolean = false;

  

  organisationTableHeader: string[] = [
    'NAME',
    'PHONE NUMBER',
    'GROUPS',
    'SKILL',
    'NO. OF COURSES',
    ''
  ];
  selectedUserIds: any;
  selectedUsersData: any;
  constructor(
    public _commonService: CommonService,
    private formBuilder: FormBuilder,
    private _service: CompanyAdminService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
    this.addInviteUserFormInitialised();
    this.addCreateGroupFormInitialised();
    this.getUsersDetails();
    this.selectedUsersData = [];
  }
  getUsersDetails(){
    this._service.getAllUsersData(this.requestDto).subscribe({
      next:(response:any)=>{
        if(response.code == HttpStatusCode.Ok){
          this.getUsersArray = response.data.content;
          console.log(response, ' get users');
          this.totalPages = response.data.totalPages;
          this.offset = response.data?.pageable?.offset;
          this.numberOfElements = response.data.numberOfElements;
          this.totalElements = response.data.totalElements;
          // this.userId = response.data.content.map((user: { id: any; })=> user.id);

          this.selectAllChecked = this.getUsersArray.every(
            (item: CompanyAdminUsersDto) => item.isAssigned
          );
          console.log(this.selectAllChecked);
        }
        else if(response.code == 401){
          this._router.navigate(['/'])
        }
      }
    })
  }

  selectedUser(item:CompanyAdminUsersDto) {
    let selectedUser = this.selectedUsersData.findIndex((user:any) => user.id === item.id);
    console.log(selectedUser);

    item.isAssigned = !item.isAssigned;
    // Update the anyCheckboxChecked property based on whether any checkbox is checked
    this.anyCheckboxChecked = this.selectedUsersData.length > 0;
    
    if (selectedUser== -1) {
      this.selectedUsersData.push(item);
      console.log(this.selectedUsersData);
      this.tableID = this.selectedUsersData.map((user: { id: any; })=> user.id)
      console.log(this.tableID);
      
      
    } else {
      this.selectedUsersData.splice(selectedUser, 1);
      console.log(this.selectedUsersData);

    }
    this.updateTableIds();
  }

  selectAllUsers(event: any) {
    this.selectAllChecked = event.target.checked;
    // Update the anyCheckboxChecked property based on whether any checkbox is checked
    this.anyCheckboxChecked = this.selectedUsersData.length > 0;

    // Update the isSelected property for each user based on selectAllChecked
    this.getUsersArray.forEach((user) => {
      user.isAssigned = this.selectAllChecked;
    });

    this.updateTableIds();
  
    // Update the tableID array with the selected user IDs
    this.tableID = this.getUsersArray
      .filter((user) => user.isAssigned)
      .map((user) => user.id);

     // Check if at least one checkbox is checked to enable/disable the "Create Group" button
    const isAnyCheckboxChecked = this.getUsersArray.some((user) => user.isAssigned);
    this.isCreateGroupButtonEnabled = isAnyCheckboxChecked;

  }


  private updateTableIds() {
    this.tableID = this.getUsersArray
      .filter((user) => user.isAssigned)
      .map((user) => user.id);
  
    // Update selectAllChecked based on the state of individual checkboxes
    this.selectAllChecked = this.getUsersArray.every(
      (user: CompanyAdminUsersDto) => user.isAssigned
    );
    
    // Check if at least one checkbox is checked to enable/disable the "Create Group" button
    const isAnyCheckboxChecked = this.getUsersArray.some((user) => user.isAssigned);
    this.isCreateGroupButtonEnabled = isAnyCheckboxChecked;

      // Add a method to update the anyCheckboxChecked property
  
    this.anyCheckboxChecked = this.selectAllChecked || this.selectedUsersData.length > 0;
    
    
  }


  addInviteUserFormInitialised() {
    this.addInviteUserForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      skill: ['', Validators.required],
    });
  }
  addCreateGroupFormInitialised(){
    this.addCreateGroupForm = this.formBuilder.group({
      id:[],
      groupName:['', Validators.required]
    })
  }

  openPopupInviteUsers(){
    this.addInviteUserForm.reset();
    try{
      const hostViewContainerRef = this.loadPopup.viewContainerRef;
      hostViewContainerRef.clear()
      const componentRef = 
        hostViewContainerRef.createComponent(AddUserComponent);
        componentRef.instance.addInviteUserForm = this.addInviteUserForm;
        componentRef.instance.title = TextEnums.ADD_TEXT;
        componentRef.instance.type = TextEnums.COMPANY_ADMIN_USERS;
        componentRef.instance.btntext = "Save";
        this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        });
        this.closeSubscription = componentRef.instance.isAdded.subscribe(
          (isAdded) => {
            if (isAdded) {
              this.saveInviteUser(hostViewContainerRef);
            }
          }
        );
    }
    catch (error) {
      /* empty */
    }
  }

  saveInviteUser(hostViewContainerRef: ViewContainerRef) {
    this._service.saveUser(this.addInviteUserForm.value).subscribe({
      next: (response:any) => {
        if (response.code === HttpStatusCode.Ok) {
          this.getUsersDetails();
          // this._toastService.initiate(response.message, Toast_Types.success);
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        } else {
        }
      },
      error: () => {
      },
    });
  }
  editUser(item:CompanyAdminUsersDto){
    this.addInviteUserForm.reset();
    this.addInviteUserForm.patchValue(item);
    this.openEditModalPopup();
  }
  openEditModalPopup(){
    try {
      const hostViewContainerRef = this.loadPopup.viewContainerRef;
      hostViewContainerRef.clear();
      const componentRef =
        hostViewContainerRef.createComponent(AddUserComponent);
      componentRef.instance.title = TextEnums.EDIT_USER;
      componentRef.instance.addInviteUserForm = this.addInviteUserForm;
      componentRef.instance.type = TextEnums.COMPANY_ADMIN_USERS;
      componentRef.instance.btntext = "Update";
      componentRef.instance.id = this.addInviteUserForm.value.id;
      this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
        this.closeSubscription.unsubscribe();
        hostViewContainerRef.clear();
      });

      this.closeSubscription = componentRef.instance.isAdded.subscribe(
        (isAdded) => {
          if (isAdded) {
            this.updateAdminById(hostViewContainerRef);
          }
        }
      );
    } catch (error) {
      /* empty */
    }
  }
  updateAdminById(hostViewContainerRef: ViewContainerRef) {
    this._service.updateAssignUser(this.addInviteUserForm.value).subscribe({
      next: (response:any) => {
        if (response.code == HttpStatusCode.Ok) {
          // this._toastService.initiate(response.message, Toast_Types.success);
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
          this.getUsersDetails();
          console.log(this.companyUsersDto.userId);
    
        } else {
          // this._toastService.initiate(response.message, Toast_Types.error);
        }
      },
      error: () => {
      },
    });
  }



  //------------------------------------create group--------------------------------------//

  openPopupCreateGroup(){
    this.addCreateGroupForm.reset();
    try{
      const hostViewContainerRef = this.loadPopup.viewContainerRef;
      hostViewContainerRef.clear()
      const componentRef = 
        hostViewContainerRef.createComponent(CreateGroupComponent);
        componentRef.instance.addCreateGroupForm = this.addCreateGroupForm;
        componentRef.instance.title = TextEnums.ADD_TEXT;
        componentRef.instance.type = TextEnums.COMPANY_ADMIN_USERS;
        componentRef.instance.btntext = "Add";
        componentRef.instance.id = this.tableID;
        this.closeSubscription = componentRef.instance.isClose.subscribe(() => {
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        });
        this.closeSubscription = componentRef.instance.isAdded.subscribe(
          (isAdded) => {
            if (isAdded) {
              this.saveCreateGroup(hostViewContainerRef);
            }
          }
        );
    }
    catch (error) {
    }

  }

  saveCreateGroup(hostViewContainerRef: ViewContainerRef){
    const payLoad = {
      "userId": this.tableID,
      "groupName":this.addCreateGroupForm.value.groupName
    }

    this._service.saveGroupUsers(payLoad).subscribe({
      next: (response:any) => {
        if (response.code === HttpStatusCode.Ok) {
          this.getUsersDetails();
          // this._toastService.initiate(response.message, Toast_Types.success);
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        } else {
        }
      },
      error: () => {
      },
    });
  }



  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.requestDto.pageNumber = this.currentPage;
    this.getUsersDetails();
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
    this.getUsersDetails();
  }





}
export type users = {
  id: number;
  name: string;
  phoneNumber: string;
  groups: string;
  skill: string;
  numberOfCourses: string;
};

  // userType: [''],
  // bulkFile: [''],

  // toggleForm(event: any) {
  //   const userType = event.target.value;
  //   if (userType === 'bulk') {
  //     this.addInviteUserForm.get('bulkFile')?.setValidators(Validators.required);
  //     this.addInviteUserForm.get('phoneNumber')?.clearValidators();
  //     this.addInviteUserForm.get('phoneNumber')?.clearValidators();
  //   } else {
  //     this.addInviteUserForm.get('bulkFile')?.clearValidators();
  //     this.addInviteUserForm.get('phoneNumber')?.setValidators(Validators.required);
  //     this.addInviteUserForm.get('phoneNumber')?.setValidators(Validators.required);
  //   }
  //   this.addInviteUserForm.get('bulkFile')?.updateValueAndValidity();
  //   this.addInviteUserForm.get('phoneNumber')?.updateValueAndValidity();
  //   this.addInviteUserForm.get('phoneNumber')?.updateValueAndValidity();
  // }

  // isSelected(userId: any): boolean {
  //   return this.selectedUserIds.includes(userId);
  // }

  // toggleSelection(userId: any): void {
  //   if (this.isSelected(userId)) {
  //     // User is already selected, remove from the list
  //     this.selectedUserIds = this.selectedUserIds.filter((id: number) => id !== userId);
  //   } else {
  //     // User is not selected, add to the list
  //     this.selectedUserIds.push(userId);
  //   }
  //   console.log(this.selectedUserIds);
  // }

  // onCheckboxChange(e:any, index: number) {
  //   const checked = e.target.checked;
    
  //   this.getUsersArray[index].isAssigned = checked;
  //   this.selectAllChecked = this.getUsersArray.every(
  //     (item: CompanyAdminUsersDto) => item.isAssigned
  //     );
      
  //     console.log(this.tableID);
  //   }

  // onCheckboxChange(user: CompanyAdminUsersDto) {
  //   user.isAssigned = !user.isAssigned;

  //   this.updateTableID();
  //   console.log(this.tableID);


  // }
  // updateTableID() {
  //   this.tableID = this.getUsersArray
  //   .filter((user) => user.isAssigned && user.userId !== undefined)
  //   .map((user) => user.userId as number);
    
  //   console.log(this.tableID);
  // }
  
  // if (user.isAssigned && user.userId !== undefined) {
  //   if(!this.tableID?.includes(user.userId)){
  //     this.tableID?.push(user.userId);
  //   }
  // } else {
  //   this.tableID = this.tableID?.filter((id:any) => id !== user.userId);
  // }
  // console.log(this.tableID, 'selected id ');
  



  // selectedUserSplice: boolean | undefined;
  // selectedUser(item:any) {
  //   let selectedUser = this.getUsersArray.findIndex((user:any) => user.id === item.id);
  //   if (selectedUser === -1) {
  //     this.selectedUsersData.push(item);
  //   } else {
  //     this.selectedUsersData.splice(selectedUser, 1);
  //     this.selectedUserSplice = true;
  //   }
  //   // this.commonservice.sendDataToParent(this.selectedUsersData);
  // }
  // selectedItems: any;
  // selectAllChecked: boolean | undefined;
  // selectAllCheckBox() {
  //   setTimeout(() => {
  //     if (this.selectedUserSplice) {
  //       this.selectAllChecked = true;
  //       this.selectedUsersData = this.selectAllChecked ? [...this.getUsersArray] : [];
  //       this.selectedUserSplice = false;
  //     }
  //   }, 50);
 
  //   this.selectAllChecked = !this.selectAllChecked;
  //   this.selectedUsersData = this.selectAllChecked ? [...this.getUsersArray] : [];
  // }
 
  



  // openPopupInviteUsers(){
  //   this.addInviteUserFormInitialised();
  //   this._commonService.openPopuop(
  //     this.loadPopup,
  //     this._commonService.TextEnums.COMPANY_ADMIN_USERS,
  //     this._commonService.TextEnums.CLOSE_TEXT,
  //     this._commonService.TextEnums.ADD_TEXT,
  //     this.addInviteUserForm,
  //     'Upload User',
  //     this.addInviteUser.bind(this)
  //   );
  // }