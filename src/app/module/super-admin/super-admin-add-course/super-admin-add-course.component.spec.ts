import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAddCourseComponent } from './super-admin-add-course.component';

describe('SuperAdminAddCourseComponent', () => {
  let component: SuperAdminAddCourseComponent;
  let fixture: ComponentFixture<SuperAdminAddCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminAddCourseComponent]
    });
    fixture = TestBed.createComponent(SuperAdminAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
