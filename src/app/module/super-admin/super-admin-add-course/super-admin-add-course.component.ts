import { Component, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-super-admin-add-course',
  templateUrl: './super-admin-add-course.component.html',
  styleUrls: ['./super-admin-add-course.component.scss'],
})
export class SuperAdminAddCourseComponent {
  @Output() goBackToCourseViewSuperAdmin = new EventEmitter();
  constructor(public commonService: CommonService) {}

  goBackToCourseView() {
    this.goBackToCourseViewSuperAdmin.emit();
  }
}
