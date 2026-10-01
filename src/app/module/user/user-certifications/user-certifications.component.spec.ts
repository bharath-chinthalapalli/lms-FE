import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificationsComponent } from './user-certifications.component';

describe('UserCertificationsComponent', () => {
  let component: UserCertificationsComponent;
  let fixture: ComponentFixture<UserCertificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCertificationsComponent]
    });
    fixture = TestBed.createComponent(UserCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
