import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { CompanyAdminService } from 'src/app/module/company-admin/company-admin.service';
import { RequestDto } from '../../model/requesDto';
import { ActivatedRoute } from '@angular/router';
import { IdService } from '../../services/id-service';
import { companyAdminUserAssignDto } from '../../model/company-admin/company-admin-user-assign-dto';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-add-popups',
  templateUrl: './add-popups.component.html',
  styleUrls: ['./add-popups.component.scss'],
})
export class AddPopupsComponent implements OnInit{
 
  @Output() close = new EventEmitter();
  @Output() isAdded = new EventEmitter();
  @Output() toggleFormEvent = new EventEmitter();
  @Input() type: string = '';
  @Input() cancleBtn: string = '';
  @Input() submitBtn: string = '';
  @Input() form!: FormGroup;
  @Input() popupHeading: string = '';
  @Input() id?:any;
  requestDto:RequestDto = new RequestDto();
  pageSize:number = 20;
  currentPage:number = 0;
  totalPages:any;  

  
  skillList:any[]=[];
  getUserByAssignList:companyAdminUserAssignDto[]=[];
  selectAllChecked?: boolean;



  constructor(
    private _service:CompanyAdminService,
    public commonService: CommonService,
    private _activatedRouter:ActivatedRoute,
    private idService: IdService, // Inject the IdService

  ){}

  ngOnInit():void{
   
    this.requestDto.pageNumber = this.currentPage;
    this.requestDto.pageSize = this.pageSize;
    console.log(this.id,"table id");
    // this.getSkills(event);
    if(this.commonService.TextEnums.COMPANY_ADMIN_ASSIGN_USERS){
      this.getAssignUsersList(this.id);
    }
    else if(this.commonService.TextEnums.COMPANY_ADMIN_ASSIGN_USERS_FROM_GROUP_USER_CARD){
      this.getAssignUsersListGroupCard(this.id);
    }


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
  getAssignUsersListGroupCard(id:any){

  }

  onCheckboxChange(e:any, index: number) {
    const checked = e.target.checked;
    this.getUserByAssignList[index].isAssigned = checked;
    this.selectAllChecked = this.getUserByAssignList.every(
      (item: companyAdminUserAssignDto) => item.isAssigned
    );
  }


  getSkills(event:any){
    this._service.getAllSkills(event.target.value, this.requestDto).subscribe({
      next:(response:any)=>{
        this.skillList = response.data.content;
      }
    })
  }


  closePopUp() {
    this.close.emit();
  }

  add() {
    this.isAdded.emit(this.form.value);
  }

  toggleForm(){
    this.toggleFormEvent.emit();
  }

  saveAdmin() {

    const selectedUsers = this.getUserByAssignList.filter(user => user.isAssigned);
    
    const payload = {
        courseId: this.id,
        appUserId: selectedUsers.map(user => user.id)
    };

    this._service.saveAssignUser(payload).subscribe({
      next: (response:any) => {
        if (response.code == HttpStatusCode.Ok) {
          // this.getUsers();
          // this._toastService.initiate(response.message, Toast_Types.success);
          // this._customToastrService.success(response.message, "Success");
          this.getAssignUsersList(this.id);
        } else {
          // this._customToastrService.error(response.message, "Info");
        }
      },
      error: () => {
      },
    });
  }

  
}
