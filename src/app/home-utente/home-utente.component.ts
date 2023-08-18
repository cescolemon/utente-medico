import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { Appuntamento } from '../model/appuntamento';

@Component({
  selector: 'app-home-utente',
  templateUrl: './home-utente.component.html',
  styleUrls: ['./home-utente.component.css']
})
export class HomeUtenteComponent implements OnInit {

  nome: string='';
  ultimoAppuntamento: Appuntamento = new Appuntamento();
  appuntamentiLength: number = 0;
  constructor( private router: Router, private uservice: UtenteService) { }

  ngOnInit(): void {
    localStorage.getItem('nome') ? this.nome = localStorage.getItem('nome')! : this.nome = '';
  this.uservice.getAllAppuntamentiUtente(localStorage.getItem('id')!).subscribe(
    appuntamenti => {
      this.ultimoAppuntamento = appuntamenti[appuntamenti.length - 1];
      this.appuntamentiLength = appuntamenti.length;
    });
  }


  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('nome');
    localStorage.removeItem('authorities');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  goToApp($myParam: string = ''): void {
    const navigationDetails: string[] = ['user/appuntamenti'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

} 


