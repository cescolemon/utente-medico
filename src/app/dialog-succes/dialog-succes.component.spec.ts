import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccesComponent } from './dialog-succes.component';

describe('DialogSuccesComponent', () => {
  let component: DialogSuccesComponent;
  let fixture: ComponentFixture<DialogSuccesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSuccesComponent]
    });
    fixture = TestBed.createComponent(DialogSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
