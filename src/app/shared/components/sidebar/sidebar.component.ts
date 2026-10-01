import { CommonService } from './../../../core/services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarServiceService } from './sidebar-service.service';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../../directives/appPlaceholder.directive';
import { Subscription } from 'rxjs';
import { ChangePasswordComponent } from '../popupForms/change-password/change-password.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/module/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  private closeSubscription!: Subscription;
  loginUser: any;
  logInResponse:any;
  jsonData: any;
  userName !:string;
  roleName!:string;



  constructor(
    public _commonService: CommonService,
    public sidebarService: SidebarServiceService,
    private router: Router,
    private _service:AuthService,
    private _toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loginUser = this.sidebarService.getLoginUser();

    this.logInResponse = localStorage.getItem('loggedInUser');
    this.jsonData = JSON.parse(this.logInResponse)
    console.log(this.jsonData);
    this.userName = this.jsonData.name;
    this.roleName = this.jsonData.roleName;
  }

  sideArray: any = this.sidebarService.getsidebarLink();

  logout() {
    this._service.logOut().subscribe({
      next:(resposne:any)=>{
        localStorage.clear();
        this.router.navigate(['']);
        this._toastr.success(resposne.data, 'Succes')
      },
      error:(errorObject:any)=>{
        this._toastr.error(errorObject?.error?.message, 'Failed')
      }
    })
  }

  loadChangePasswordForm(){
    const hostViewContainerRef = this.loadPopup.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      ChangePasswordComponent
    );

    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });

    this.closeSubscription = componentRef.instance.isAdded.subscribe(
      (isAdded: any) => {
        if (isAdded) {
          this.closeSubscription.unsubscribe();
          hostViewContainerRef.clear();
        }
      }
    );
  }
}
