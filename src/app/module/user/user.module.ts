import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserCertificationsComponent } from './user-certifications/user-certifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserMyCompaniesComponent } from './user-my-companies/user-my-companies.component';

@NgModule({
  declarations: [UserComponent, UserCourseComponent, UserCertificationsComponent, UserMyCompaniesComponent],
  imports: [CommonModule, UserRoutingModule,SharedModule],
})
export class UserModule {}
