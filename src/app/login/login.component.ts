import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide = true;
  username = '';
  password = '';
  role='';
  tooltip = 'Email deve comprendere utente_/medico_ ex: utente_nome@nanosoft.com';
  


  regForm = new FormGroup({
    username:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.regForm.get('username')!.valueChanges.subscribe(val => {this.username = val!; } );
    this.regForm.get('password')!.valueChanges.subscribe(val => {this.password = val!; } );
    this.regForm.get('role')!.valueChanges.subscribe(val => {this.role = val!; } );
  }

  login() {
    const body = {
      username: this.username,
      password: this.password
    };
    this.authService.login(body).pipe(
      tap((response) => {
        const token = response.token;
        const nome = response.nome;
        const userRole = response.authorities[0].authority; 
        const id = response.id;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('nome', nome); 
        localStorage.setItem('authorities', userRole); 
        localStorage.setItem('id', id);
        if(this.role=='two' && userRole=='ROLE_MEDICO'){
          const specializzazione = response.specializzazione;
          localStorage.setItem('specializzazione', specializzazione);
          this.router.navigate(['/doctor']);
        }
        else if(this.role='one'){
          this.router.navigate(['/user']);
        }
       
      }),
      catchError((err: any) => {
        this.openErrorDialog('Credenziali errate');
        throw err; 
      })
    ).subscribe();
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMessage,
    });
  }


}
