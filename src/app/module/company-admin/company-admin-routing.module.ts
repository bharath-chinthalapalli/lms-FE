import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyAdminComponent } from './company-admin.component';
import { CompanyAdminDashboardComponent } from './company-admin-dashboard/company-admin-dashboard.component';
import { DashboardComponent } from '../main-dashboard/dashboard.component';
import { CompanyAdminCourseComponent } from './company-admin-course/company-admin-course.component';
import { CompanyAdminUsersComponent } from './company-admin-users/company-admin-users.component';
import { CompanyAdminGroupsComponent } from './company-admin-groups/company-admin-groups.component';
import { CompanyAdminCourseDetailsComponent } from './company-admin-course-details/company-admin-course-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent ,
children:[
  {
    path: 'company-admin-dashboard',
    component:CompanyAdminDashboardComponent
  },
  {
    path: 'company-admin-courses',
    component:CompanyAdminCourseComponent
  },
  {
    path: 'company-admin-users',
    component:CompanyAdminUsersComponent
  },
  {
    path:'company-admin-groups',
    component:CompanyAdminGroupsComponent
  },
  {
    path:'company-admin-course-details',
    component:CompanyAdminCourseDetailsComponent
  },

] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyAdminRoutingModule {}
