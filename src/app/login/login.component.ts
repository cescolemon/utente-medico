import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  


  regForm = new FormGroup({
    username:  new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}
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
      
        // Salva il token nel local storage o in un cookie
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
      catchError(() => throwError(new Error('Errore durante il login')))
    ).subscribe();
  }


}
