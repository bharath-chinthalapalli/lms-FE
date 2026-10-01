import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/common.service';
import { AuthService } from 'src/app/module/auth/auth.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit{

  @Input() addInviteUserForm!:FormGroup;
  @Output() isClose = new EventEmitter();
  @Output() isAdded = new EventEmitter();
  @Input() btntext: string = "Update";
  @Input() type: any;
  @Input() form!: FormGroup;
  @Input() icon: any;
  @Input() title: any;




  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    public _commonService: CommonService
  ) {}


  ngOnInit(): void {
      
  }

  close() {
    this.isClose.emit();
  }
  add() {
    this.isAdded.emit(true);
  }

  submit() {
    
    
  }


}
