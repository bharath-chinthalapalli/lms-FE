import { UserMyCompaniesComponent } from './user-my-companies/user-my-companies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../main-dashboard/dashboard.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserCertificationsComponent } from './user-certifications/user-certifications.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // {
      //   path:'dashboard',
      //   component:DashboardComponent
      // },
      {
        path: 'courses',
        component: UserCourseComponent,
      },
      {
        path: 'certification',
        component: UserCertificationsComponent,
      },
      {
        path: 'my-companies',
        component: UserMyCompaniesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
