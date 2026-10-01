import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/core/services/common.service';
import { AuthService } from 'src/app/module/auth/auth.service';
import { ChangePasswordDto } from 'src/app/shared/model/forms/changePasswordDto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Output() close = new EventEmitter();
  @Output() isAdded = new EventEmitter();
  chnagepasswordForm!:FormGroup;
  isPasswordVisible = false;


  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    public _commonService: CommonService
  ) {}

  ngOnInit():void{
    this.formInitialize();
  }
  closePopUp() {
    this.close.emit();
  }
  formInitialize(){
    this.chnagepasswordForm = this._formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, this.passwordValidator]],
        reEnterPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    )
  };

  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;

  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordPattern =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$/;
    if (!passwordPattern.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const reEnterPassword = control.get('reEnterPassword')?.value;

    if (newPassword !== reEnterPassword) {
      control.get('reEnterPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  isNewPasswordVisible = false;
  isRePasswordVisible = false;
  toggleNewPasswordVisibility() {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  }
  toggleRePasswordVisibility() {
    this.isRePasswordVisible = !this.isRePasswordVisible;
  }

  submit() {
    let changePasswordDto:ChangePasswordDto = new ChangePasswordDto();

    if (this.chnagepasswordForm.valid) {
      changePasswordDto = JSON.parse(JSON.stringify(this.chnagepasswordForm.value));
      changePasswordDto.oldPassword = this._commonService.encrypt(changePasswordDto.oldPassword);
      changePasswordDto.newPassword = this._commonService.encrypt(changePasswordDto.newPassword);
      changePasswordDto.reEnterPassword = this._commonService.encrypt(changePasswordDto.reEnterPassword);
  }
  this._service.changePassword(changePasswordDto).subscribe({
    next: (res: any) => {

      this._toastr.success(res.message, 'Saved!');
      setTimeout(() => {
        this.isAdded.emit(true);
      }, 1000);
      this.chnagepasswordForm.reset()
    },
    error: (res: any) => {
      this._toastr.error(res.error.message, 'Failed' );
      this.chnagepasswordForm.reset()
    },
  }) ;

  }
}
