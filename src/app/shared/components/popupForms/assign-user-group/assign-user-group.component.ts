import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/common.service';
import { AuthService } from 'src/app/module/auth/auth.service';
import { CompanyAdminService } from 'src/app/module/company-admin/company-admin.service';
import { companyAdminUserAssignDto } from 'src/app/shared/model/company-admin/company-admin-user-assign-dto';
import { RequestDto } from 'src/app/shared/model/requesDto';
@Component({
  selector: 'app-assign-user-group',
  templateUrl: './assign-user-group.component.html',
  styleUrls: ['./assign-user-group.component.scss']
})
export class AssignUserGroupComponent {
  @Input() addAssignUserGroupForm!:FormGroup;
  @Output() isClose = new EventEmitter();
  @Output() isAdded = new EventEmitter();
  @Input() btntext: string = "Add";
  @Input() type: any;
  @Input() form!: FormGroup;
  @Input() icon: any;
  @Input() title: any;
  @Input() id?:any;
  requestDto:RequestDto = new RequestDto();
  pageSize:number = 20;
  currentPage:number = 0;
  totalPages:any;  

  
  skillList:any[]=[];
  getUserByAssignList:companyAdminUserAssignDto[]=[];
  selectAllChecked?: boolean;


  constructor(
    private _formBuilder: FormBuilder,
    private _service: CompanyAdminService,
    private _router: Router,
    private _toastr: ToastrService,
    public _commonService: CommonService
  ){}
  ngOnInit(): void {
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
      console.log(this.id, 'groupId');
    if(this._commonService.TextEnums.COMPANY_ADMIN_ASSIGN_USERS_FROM_GROUP_USER_CARD){
        this.getAssignUsersListGroupCard(this.id);
    }  
  }
  getAssignUsersListGroupCard(id:any){
    this._service.getUserForAssignFromGroups(this.id).subscribe({
      next:(response:any)=>{
        this.getUserByAssignList = response.data as companyAdminUserAssignDto[];
        console.log(this.getUserByAssignList, 'list for modal');
        this.selectAllChecked = this.getUserByAssignList.every(
         (item: companyAdminUserAssignDto) => item.isAssigned
       );
      }
    })
  }

  onCheckboxChange(e:any, index: number) {
    const checked = e.target.checked;
    this.getUserByAssignList[index].isAssigned = checked;
    this.selectAllChecked = this.getUserByAssignList.every(
      (item: companyAdminUserAssignDto) => item.isAssigned
    );
  }



  close() {
    this.isClose.emit();
  }
  add() {
    this.isAdded.emit(true);
  }
  getAssignUsersList(id:any){
    this._service.getUserForAssign(this.id,this.requestDto).subscribe({
     next:(response:any)=>{
       this.getUserByAssignList = response.data.content as companyAdminUserAssignDto[];
       console.log(this.getUserByAssignList, 'list for modal');
       this.selectAllChecked = this.getUserByAssignList.every(
        (item: companyAdminUserAssignDto) => item.isAssigned
      );
     }
   })
  }


  save() {

    const selectedUsers = this.getUserByAssignList.filter(user => user.isAssigned);
    
    const payload = {
      groupId: this.id,
      groupMemberIds: selectedUsers.map(user => user.id)
    };

    this._service.saveAssignUserGroup(payload).subscribe({
      next: (response:any) => {
        if (response.code == HttpStatusCode.Ok) {
          // this.getUsers();
          // this._toastService.initiate(response.message, Toast_Types.success);
          // this._customToastrService.success(response.message, "Success");
          this.getAssignUsersListGroupCard(this.id);
        } else {
          // this._customToastrService.error(response.message, "Info");
        }
      },
      error: () => {
      },
    });
  }

}
