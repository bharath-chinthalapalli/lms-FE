import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminUsersComponent } from './company-admin-users.component';

describe('CompanyAdminUsersComponent', () => {
  let component: CompanyAdminUsersComponent;
  let fixture: ComponentFixture<CompanyAdminUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminUsersComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
