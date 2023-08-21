import { Component, OnInit, ViewChild } from '@angular/core';
import { UtenteService } from '../services/utente.service';
import { Medico } from '../model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { DialogSuccesComponent } from '../dialog-succes/dialog-succes.component';

declare var require: any
const moment = require('moment');
@Component({
  selector: 'app-app-utente',
  templateUrl: './app-utente.component.html',
  styleUrls: ['./app-utente.component.css']
})
export class AppUtenteComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'nome', 'specializzazione'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: MatTableDataSource<Medico>;
 data: string='';
 id_medico: string='';
 id_utente: string=localStorage.getItem('id')!;

  constructor(private uservice: UtenteService, private router: Router, private dialog: MatDialog) { }

  appForm = new FormGroup({
    id_medico:  new FormControl('', [Validators.required]),
    data: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.uservice.getAllMedici().subscribe(
      medici => {
        this.dataSource = new MatTableDataSource<Medico>(medici);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.error(error);
      });
      this.appForm.get('id_medico')!.valueChanges.subscribe(val => {this.id_medico = val!; } );
      this.appForm.get('data')!.valueChanges.subscribe(val => {this.data = val!; } );
      this.id_utente = localStorage.getItem('id')!;
  }

 
  changeDatePicker(): any {
    this.appForm.value.data = moment(this.appForm.value.data).format('MM/DD/YYYY');
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: errorMessage,
    });
  }

  openSuccesDialog(message: string): void {
    this.dialog.open(DialogSuccesComponent, {
      width: '250px',
      data: message,
    });
  }

  prenota() {
    const data=  moment(this.data).format('MM/DD/YYYY');
    this.uservice.registerAppuntamento(this.id_utente,this.id_medico,data).subscribe(
      (response: any) => {
        console.log(response);
        this.openSuccesDialog("Appuntamento prenotato in data: "+response?.data+" con il medico: "+response.medico?.nome);
      },
      (err: any) => {
        console.error(err);
        this.openErrorDialog(err.error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('nome');
    localStorage.removeItem('authorities');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  goToHome($myParam: string = ''): void {
    const navigationDetails: string[] = ['user'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

}
