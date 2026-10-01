import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserGroupComponent } from './assign-user-group.component';

describe('AssignUserGroupComponent', () => {
  let component: AssignUserGroupComponent;
  let fixture: ComponentFixture<AssignUserGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignUserGroupComponent]
    });
    fixture = TestBed.createComponent(AssignUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
