import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAppCardComponent } from './dashboard-app-card.component';

describe('DashboardAppCardComponent', () => {
  let component: DashboardAppCardComponent;
  let fixture: ComponentFixture<DashboardAppCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAppCardComponent]
    });
    fixture = TestBed.createComponent(DashboardAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
