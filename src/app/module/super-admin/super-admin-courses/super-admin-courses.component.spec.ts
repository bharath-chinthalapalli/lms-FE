import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCoursesComponent } from './super-admin-courses.component';

describe('SuperAdminCoursesComponent', () => {
  let component: SuperAdminCoursesComponent;
  let fixture: ComponentFixture<SuperAdminCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminCoursesComponent]
    });
    fixture = TestBed.createComponent(SuperAdminCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
