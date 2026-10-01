import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSkillManagementComponent } from './super-admin-skill-management.component';

describe('SuperAdminSkillManagementComponent', () => {
  let component: SuperAdminSkillManagementComponent;
  let fixture: ComponentFixture<SuperAdminSkillManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminSkillManagementComponent]
    });
    fixture = TestBed.createComponent(SuperAdminSkillManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
