import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../services/utente.service';
import { Utente } from '../model/utente';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
})
export class RegistrazioneComponent implements OnInit{

  constructor(private uservice: UtenteService, private router: Router) {}
  ngOnInit(): void {
    this.regForm.get('nome')!.valueChanges.subscribe(val => {this.ut.nome = val!; } );
    this.regForm.get('password')!.valueChanges.subscribe(val => {this.ut.password = val!; } );
    this.regForm.get('email')!.valueChanges.subscribe(val => {this.ut.email = val!; } );
  }
  ut: Utente = new Utente();

  hide = true;

  regForm = new FormGroup({
    nome:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  });
  register(){
    this.ut.email = this.regForm.value.email!;
    this.ut.password = this.regForm.value.password!;
    this.ut.nome =this.regForm.value.nome!;
    this.uservice.registerUtente(this.ut).subscribe(
      (response: any) => {
        // Gestisci la risposta testo qui
        console.log('Risposta dal server:', response);
    
        // Esegui ulteriori azioni a seconda della risposta
        if (response === 'Utente creato correttamente!') {
          // La registrazione è avvenuta con successo
          this.router.navigate(['/login']);
        } else {
          // La registrazione ha restituito un messaggio diverso
          console.error('Registrazione fallita:', response);
        }
      },
      (error: any) => {
        console.error('Errore durante la registrazione:', error);
      }
    );
  }
  getErrorMessage() {
    if (this.regForm.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.regForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

}
