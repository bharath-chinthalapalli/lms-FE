import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyCompaniesComponent } from './user-my-companies.component';

describe('UserMyCompaniesComponent', () => {
  let component: UserMyCompaniesComponent;
  let fixture: ComponentFixture<UserMyCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMyCompaniesComponent]
    });
    fixture = TestBed.createComponent(UserMyCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
