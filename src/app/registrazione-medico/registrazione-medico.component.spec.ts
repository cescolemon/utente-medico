import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneMedicoComponent } from './registrazione-medico.component';

describe('RegistrazioneMedicoComponent', () => {
  let component: RegistrazioneMedicoComponent;
  let fixture: ComponentFixture<RegistrazioneMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrazioneMedicoComponent]
    });
    fixture = TestBed.createComponent(RegistrazioneMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
