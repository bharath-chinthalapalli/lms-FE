import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../main-dashboard/dashboard.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminCoursesComponent } from './super-admin-courses/super-admin-courses.component';
import { SuperAdminOrganisationComponent } from './super-admin-organisation/super-admin-organisation.component';
import { SuperAdminSkillManagementComponent } from './super-admin-skill-management/super-admin-skill-management.component';
import { SuperAdminAddCourseComponent } from './super-admin-add-course/super-admin-add-course.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: SuperAdminDashboardComponent,
      },
      {
        path: 'courses',
        component: SuperAdminCoursesComponent,
      },
      { 
        path:'add-courses',
        component:SuperAdminAddCourseComponent
      },
      {
        path: 'organisation',
        component: SuperAdminOrganisationComponent,
      },
      {
        path: 'skill-management',
        component: SuperAdminSkillManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
