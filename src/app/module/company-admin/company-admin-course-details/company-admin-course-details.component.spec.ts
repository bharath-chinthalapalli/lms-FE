import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminCourseDetailsComponent } from './company-admin-course-details.component';

describe('CompanyAdminCourseDetailsComponent', () => {
  let component: CompanyAdminCourseDetailsComponent;
  let fixture: ComponentFixture<CompanyAdminCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
