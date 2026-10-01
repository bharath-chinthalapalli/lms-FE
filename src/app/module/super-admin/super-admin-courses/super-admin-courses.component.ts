import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { ThreedotsMenu } from 'src/app/shared/components/three-dots-menu/three-dots-menu';

import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';

@Component({
  selector: 'app-super-admin-courses',
  templateUrl: './super-admin-courses.component.html',
  styleUrls: ['./super-admin-courses.component.scss'],
})
export class SuperAdminCoursesComponent {
  @ViewChild(PlaceholderDirective, { static: false })
  loadPopup!: PlaceholderDirective;
  addCourseForm!: FormGroup;
  enableAddCourse: string = '';
  showSelectView: string = this.commonService.TextEnums.CARD_VIEW;
  constructor(
    public commonService: CommonService,
    private _router:Router) {}

  super_admin_table_header: any = [
    '',
    'Course Name',
    'Category',
    'Organizations',
    'Employees',
    'Available till',
    'Status',
    '',
  ];

  super_admin_card_data: any = [
    {
      id: 1,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 2,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 3,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 1,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 2,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
    {
      id: 3,
      name: 'Bedok N2C11',
      description: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit',
      available_till: 'Oct 16,2023',
      organisation_count: 50,
    },
  ];

  addCourse() {
    this.commonService.openPopuop(
      this.loadPopup,
      this.commonService.TextEnums.SUPER_ADMIN_COURSE,
      this.commonService.TextEnums.CANCLE_TEXT,
      this.commonService.TextEnums.ASSIGN_TEXT,
      this.addCourseForm,
      'Assign Course'
    );
  }
  getViewChange(type: string) {
    this.showSelectView = type;
  }

  threeDotsMenuOption: ThreedotsMenu[] = [
    {
      text: this.commonService.TextEnums.EDIT_TEXT,
      icon: this.commonService.Images.EDIT_ICON,
      clickHandler: (event: Event) => {
        console.log(event);
      },
    },
    {
      text: this.commonService.TextEnums.MAKE_INACTIVE_TEXT,
      icon: this.commonService.Images.INACTIVE_ICON,
      clickHandler: (event: Event) => {
        this.commonService.openGenericPopup(
          this.loadPopup,
          this.commonService.TextEnums.ACTIVE_INACTIVE_POPUP
        );
      },
    },
  ];
  navToAddCourse(){
    this._router.navigate(['/super-admin/add-courses'])
  }
}
