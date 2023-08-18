import { Component, OnInit } from '@angular/core';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-app-utente',
  templateUrl: './app-utente.component.html',
  styleUrls: ['./app-utente.component.css']
})
export class AppUtenteComponent implements OnInit  {
 
  constructor(private uservice: UtenteService) { }

  ngOnInit(): void {
  }

}
