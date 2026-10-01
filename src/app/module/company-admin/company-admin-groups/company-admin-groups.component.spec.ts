import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminGroupsComponent } from './company-admin-groups.component';

describe('CompanyAdminGroupsComponent', () => {
  let component: CompanyAdminGroupsComponent;
  let fixture: ComponentFixture<CompanyAdminGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminGroupsComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
