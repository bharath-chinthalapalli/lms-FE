import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCardComponent } from './super-admin-card.component';

describe('SuperAdminCardComponent', () => {
  let component: SuperAdminCardComponent;
  let fixture: ComponentFixture<SuperAdminCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminCardComponent]
    });
    fixture = TestBed.createComponent(SuperAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
