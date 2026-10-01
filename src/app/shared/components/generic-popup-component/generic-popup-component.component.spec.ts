import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericPopupComponentComponent } from './generic-popup-component.component';

describe('GenericPopupComponentComponent', () => {
  let component: GenericPopupComponentComponent;
  let fixture: ComponentFixture<GenericPopupComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericPopupComponentComponent]
    });
    fixture = TestBed.createComponent(GenericPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
