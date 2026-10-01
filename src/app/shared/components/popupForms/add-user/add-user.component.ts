import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/common.service';
import { AuthService } from 'src/app/module/auth/auth.service';
import { CompanyAdminService } from 'src/app/module/company-admin/company-admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  @Input() addInviteUserForm!:FormGroup;
  @Output() isClose = new EventEmitter();
  @Output() isAdded = new EventEmitter();
  @Input() btntext: string = "Update";
  @Input() type: any;
  @Input() form!: FormGroup;
  @Input() icon: any;
  @Input() title: any;
  @Input() id?:any;

  getAllSkillsArray:any[]=[]

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    public _commonService: CommonService,
    private _serviceCompany: CompanyAdminService
  ){}
  ngOnInit(): void {
      console.log(this.id);
      this.getAllSkills();
      
  }
  getAllSkills(){
    this._serviceCompany.getAllSkillsDetails().subscribe({
      next:(response:any)=>{
        console.log(response);
        this.getAllSkillsArray = response.data;
      }
    })
  }

  close() {
    this.isClose.emit();
  }
  add() {
    this.isAdded.emit(true);
  }


}
