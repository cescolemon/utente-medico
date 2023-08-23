import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Medico } from 'src/app/model/medico';
import { MedicoService } from 'src/app/services/medico.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { __makeTemplateObject } from 'tslib';

@Component({
  selector: 'app-registrazione-medico',
  templateUrl: './registrazione-medico.component.html',
  styleUrls: ['./registrazione-medico.component.css']
})
export class RegistrazioneMedicoComponent {
  constructor(private mservice: MedicoService, private router: Router, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.regForm.get('nome')!.valueChanges.subscribe(val => {this.ut.nome = val!; } );
    this.regForm.get('password')!.valueChanges.subscribe(val => {this.ut.password = val!; } );
    this.regForm.get('email')!.valueChanges.subscribe(val => {this.ut.email = val!; } );
    this.regForm.get('specializzazione')!.valueChanges.subscribe(val => {this.ut.email = val!; } );
  }
  ut: Medico= new Medico();

  hide = true;

  regForm = new FormGroup({
    nome:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    specializzazione: new FormControl('', [Validators.required])
  });
  register(){
    this.ut.email = this.regForm.value.email!;
    this.ut.password = this.regForm.value.password!;
    this.ut.nome =this.regForm.value.nome!;
    this.ut.specializzazione = this.regForm.value.specializzazione!;
    this.mservice.registerMedico(this.ut).subscribe(
      (response: any) => {
        console.log('Risposta dal server:', response);
        if (response === 'Medico creato correttamente!') {
          this.router.navigate(['/login']);
        } else {
          console.error('Registrazione fallita:', response);
        }
      },
      (error: any) => {
        this.openErrorDialog(error.error);
        console.error('Errore durante la registrazione:', error);
      }
    );
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMessage,
    });
  }
  getErrorMessage() {
    if (this.regForm.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }
}
