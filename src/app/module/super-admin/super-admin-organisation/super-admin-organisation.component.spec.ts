import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminOrganisationComponent } from './super-admin-organisation.component';

describe('SuperAdminOrganisationComponent', () => {
  let component: SuperAdminOrganisationComponent;
  let fixture: ComponentFixture<SuperAdminOrganisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminOrganisationComponent]
    });
    fixture = TestBed.createComponent(SuperAdminOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
