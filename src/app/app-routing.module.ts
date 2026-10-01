import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './module/auth/login/login.component';
// import { DashboardComponent } from './module/main-dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/module/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'super-admin',
    loadChildren: () =>
      import('src/app/module/super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
  },
  {
    path: 'company-admin',
    loadChildren: () =>
      import('src/app/module/company-admin/company-admin.module').then(
        (m) => m.CompanyAdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
