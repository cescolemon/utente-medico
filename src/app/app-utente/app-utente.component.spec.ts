import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUtenteComponent } from './app-utente.component';

describe('AppUtenteComponent', () => {
  let component: AppUtenteComponent;
  let fixture: ComponentFixture<AppUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppUtenteComponent]
    });
    fixture = TestBed.createComponent(AppUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
