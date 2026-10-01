import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminCourseComponent } from './company-admin-course.component';

describe('CompanyAdminCourseComponent', () => {
  let component: CompanyAdminCourseComponent;
  let fixture: ComponentFixture<CompanyAdminCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminCourseComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
