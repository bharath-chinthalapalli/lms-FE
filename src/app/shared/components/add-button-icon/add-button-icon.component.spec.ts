import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonIconComponent } from './add-button-icon.component';

describe('AddButtonIconComponent', () => {
  let component: AddButtonIconComponent;
  let fixture: ComponentFixture<AddButtonIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddButtonIconComponent]
    });
    fixture = TestBed.createComponent(AddButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
