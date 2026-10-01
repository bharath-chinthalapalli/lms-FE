import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminCoursesComponent } from './super-admin-courses/super-admin-courses.component';
import { SuperAdminOrganisationComponent } from './super-admin-organisation/super-admin-organisation.component';
import { SuperAdminSkillManagementComponent } from './super-admin-skill-management/super-admin-skill-management.component';
import { SuperAdminCardComponent } from './super-admin-card/super-admin-card.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SuperAdminAddCourseComponent } from './super-admin-add-course/super-admin-add-course.component';

@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    SuperAdminCoursesComponent,
    SuperAdminOrganisationComponent,
    SuperAdminSkillManagementComponent,
    SuperAdminCardComponent,
    SuperAdminAddCourseComponent,
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    AngularSvgIconModule.forRoot(),
  ],
})
export class SuperAdminModule {}
