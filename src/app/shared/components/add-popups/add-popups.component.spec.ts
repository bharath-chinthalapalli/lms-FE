import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopupsComponent } from './add-popups.component';

describe('AddPopupsComponent', () => {
  let component: AddPopupsComponent;
  let fixture: ComponentFixture<AddPopupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPopupsComponent]
    });
    fixture = TestBed.createComponent(AddPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
