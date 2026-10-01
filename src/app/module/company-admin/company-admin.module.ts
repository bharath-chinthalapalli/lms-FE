import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyAdminRoutingModule } from './company-admin-routing.module';
import { CompanyAdminComponent } from './company-admin.component';
import { CompanyAdminDashboardComponent } from './company-admin-dashboard/company-admin-dashboard.component';
import { CompanyAdminCourseComponent } from './company-admin-course/company-admin-course.component';
import { CompanyAdminUsersComponent } from './company-admin-users/company-admin-users.component';
import { CompanyAdminGroupsComponent } from './company-admin-groups/company-admin-groups.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TrendingCoursesComponent } from './trending-courses/trending-courses.component';
import { CompanyAdminCourseDetailsComponent } from './company-admin-course-details/company-admin-course-details.component';

@NgModule({
  declarations: [
    CompanyAdminComponent, 
    CompanyAdminDashboardComponent, 
    CompanyAdminCourseComponent, 
    CompanyAdminUsersComponent, 
    CompanyAdminGroupsComponent, TrendingCoursesComponent, CompanyAdminCourseDetailsComponent,
  ],
  imports: [
    CommonModule,
    CompanyAdminRoutingModule,
    SharedModule,
    AngularSvgIconModule.forRoot()
  ],
})
export class CompanyAdminModule {}
