import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCourseComponent } from './card-course.component';

describe('CardCourseComponent', () => {
  let component: CardCourseComponent;
  let fixture: ComponentFixture<CardCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCourseComponent]
    });
    fixture = TestBed.createComponent(CardCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
