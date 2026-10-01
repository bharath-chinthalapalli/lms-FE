import { Injectable, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { SideBarRoutes } from 'src/app/utils/text-enum-utils';
export type Sidedata = {
  title: String;
  svgIcon: String;
  visibleFor: any[];
};

@Injectable({
  providedIn: 'root',
})
export class SidebarServiceService implements OnInit{
  constructor(public _commonServic: CommonService) {}

  public get SideBarRoutes(): typeof SideBarRoutes {
    return SideBarRoutes;
  }

  ngOnInit(): void {}


  getsidebarLink(): Sidedata[] {
    return [
      {
        title: 'Dashboard',
        svgIcon: this._commonServic.Images.DASHBOARD_ICON,
        visibleFor: [
          {
            role: 'super-admin',
            routerLink: this.SideBarRoutes.DASHBOARD_ROUTES,
          },
          {
            role: 'company-admin',
            routerLink: this.SideBarRoutes.COMPANY_ADMIN_DASHBOARD,
          },
        ],
      },
      {
        title: 'Courses',
        svgIcon: this._commonServic.Images.SIDEBAR_COURSE_COURSE,
        visibleFor: [
          {
            role: 'user',
            routerLink: this.SideBarRoutes.COURSES_ROUTES,
          },
          {
            role: 'super-admin',
            routerLink: this.SideBarRoutes.COURSES_ROUTES,
          },
          {
            role: 'company-admin',
            routerLink: this.SideBarRoutes.COMPANY_ADMIN_COURSES,
          },
        ],
      },
      {
        title: 'Certifications ',
        svgIcon: this._commonServic.Images.SIDEBAR_CERTIFICATE_ICON,
        visibleFor: [
          {
            role: 'user',
            routerLink: this.SideBarRoutes.CERTIFICATION_ROUTES,
          },
        ],
      },
      {
        title: 'My Companies ',
        svgIcon: this._commonServic.Images.SIDEBAR_MY_COMPANY_ICON,
        visibleFor: [
          {
            role: 'user',
            routerLink: this.SideBarRoutes.MY_COMPONIERS_ROUTES,
          },
        ],
      },
      {
        title: 'Organizations',
        svgIcon: this._commonServic.Images.SIDEBAR_MY_COMPANY_ICON,
        visibleFor: [
          {
            role: 'super-admin',
            routerLink: this.SideBarRoutes.ORGANISATIONS_ROUTES,
          },
        ],
      },
      {
        title: 'Skill Management',
        svgIcon: this._commonServic.Images.SKILL_MANGEMENT_ICON,
        visibleFor: [
          {
            role: 'super-admin',
            routerLink: this.SideBarRoutes.SKILL_MANAGEMENT,
          },
        ],
      },
  
      {
        title: 'Users',
        svgIcon: this._commonServic.Images.USER_INACTIVE,
        visibleFor: [
          {
            role: 'company-admin',
            routerLink: this.SideBarRoutes.COMPANY_ADMIN_USERS,
          },
        ],
      },
      {
        title: 'Groups',
        svgIcon: this._commonServic.Images.USER_GROUP_INACTIVE,
        visibleFor: [
          {
            role: 'company-admin',
            routerLink: this.SideBarRoutes.COMPANY_ADMIN_GROUPS,
          },
        ],
      },
    
    ];
  }

  getLoginUser() {
    const loginUser: any = localStorage.getItem('loginUser');
    return JSON.parse(loginUser);
  }

  

}
