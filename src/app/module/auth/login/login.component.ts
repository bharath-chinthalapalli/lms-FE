import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/shared/model/loginDto';
import { AuthService } from '../auth.service';
import { LoggedInUserService } from 'src/app/shared/services/logged-in-user.service';
import { ToastrService } from 'ngx-toastr';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  loadPopUp!: PlaceholderDirective
  submitted: boolean = false;
  isShowEye: boolean = false;
  password: any;
  constructor(
    public _common: CommonService,
    private formBuilder: FormBuilder,
    public _commonService: CommonService,
    private _authService: AuthService,
    private _loggedInUserService: LoggedInUserService,
    private _router: Router,
    private _toastr: ToastrService

  ) { }
  ngOnInit(): void {
    this.loginFormIntialized();
    this.password = "password";

  }

  loginFormIntialized() {
    this.loginform = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }


  login() {
    let loginDto: LoginDto = new LoginDto();
    if (this.loginform.valid) {
      // this.loginform.reset()
      loginDto = JSON.parse(JSON.stringify(this.loginform.value));
      let password: string = loginDto.password;
      loginDto.password = this._commonService.encrypt(password);
    }
    this._authService.login(loginDto).subscribe({
      next: (response: any) => {
        if (response.code == 200) {
          this.loginform.reset()
          this._loggedInUserService.setLoggedInUser(response.data);
          console.log(response.data);
          if (response.data.roleName == 'SUPER_ADMIN') {
            this._router.navigate(['/super-admin/dashboard'])
            const loginUser = {
              id: 'super-admin',
              role: 'super-admin',
            };
            localStorage.setItem('loginUser', JSON.stringify(loginUser));
          } else if (response.data.roleName == 'COMPANY_ADMIN') {
            this._router.navigate(['/company-admin/company-admin-dashboard'])
            const loginUser = {
              id: 'company-admin',
              role: 'company-admin',
            };
            localStorage.setItem('loginUser', JSON.stringify(loginUser));
          } else if (response.data.roleName == 'USER') {
            this._router.navigate(['/user/courses'])
            const loginUser = {
              id: 'user',
              role: 'user',
            };
            localStorage.setItem('loginUser', JSON.stringify(loginUser));
          }

          this._toastr.success(response.message, 'Success')
        } else {
          this._toastr.error(response.message, 'error')
        }
      },
      error: (response: any) => {
        this.loginform.reset()
        this._toastr.error(response.message, 'error')

      },
    })
  }

  loadForgetForm() {
    const hostViewContainerRef = this.loadPopUp.viewContainerRef;

  }


  // login() {
  //   this.submitted = true;
  //   const phoneNumber: string = this.loginform.controls['phoneNumber'].value;

  //   if (phoneNumber === '9603006144') {
  //     this.router.navigateByUrl('super-admin/dashboard');
  //     const loginUser = {
  //       id: 'super-admin',
  //       role: 'super-admin',
  //     };
  //     localStorage.setItem('loginUser', JSON.stringify(loginUser));
  //   } else if (phoneNumber === '96030061444') {
  //     this.router.navigateByUrl('user/courses');
  //     const loginUser = {
  //       id: 'user',
  //       role: 'user',
  //     };
  //     localStorage.setItem('loginUser', JSON.stringify(loginUser));
  //   }
  //   else if( phoneNumber === '9703384222'){
  //     this.router.navigateByUrl('company-admin/company-admin-dashboard');
  //     const loginUser = {
  //       id: 'company-admin',
  //       role: 'company-admin',
  //     };
  //     localStorage.setItem('loginUser', JSON.stringify(loginUser));
  //   }
  // }
  get f() {
    return this.loginform.controls;
  }
  getImageAuthKey() {
    if (this.password === "password") {
      this.password = "text";
      this.isShowEye = true;
    } else {
      this.password = "password";
      this.isShowEye = false;
    }
  }
}
