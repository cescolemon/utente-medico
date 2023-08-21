import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from '../services/medico.service';
import { Appuntamento } from '../model/appuntamento';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { UtenteService } from '../services/utente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccesComponent } from '../dialog-succes/dialog-succes.component';


@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})

export class HomeMedicoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'nome', 'data'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: MatTableDataSource<Appuntamento>;
  selection = new SelectionModel<Appuntamento>(true, []);
  appuntamentilength: number = 0;
  isButtonEnable:boolean =true;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  nessunAppuntamentoMessage: string='Non ci sono appuntamenti in programma';
  nome='';
  constructor(private router: Router, private mservice: MedicoService,
      private changeDetectorRefs: ChangeDetectorRef, private uservice : UtenteService, private dialog: MatDialog) {
        this.selection.changed.subscribe( () =>{​​​​​​​​
          this.isButtonEnable = this.selection.selected.length == 0;
              }​​​​​​​​)
       }

  ngOnInit(): void {
    localStorage.getItem('nome') ? this.nome = localStorage.getItem('nome')! : this.nome = '';
  this.mservice.getAllAppuntamentiMedico(localStorage.getItem('id')!).subscribe(
    appuntamenti => {
     this.dataSource =new MatTableDataSource<Appuntamento>(appuntamenti);
     this.appuntamentilength = appuntamenti.length;
    }, error => {
      console.error(error);
    });
    this.refresh();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('nome');
    localStorage.removeItem('authorities');
    localStorage.removeItem('id');
    localStorage.removeItem('specializzazione');
    this.router.navigate(['/login']);
  }

  refresh(): void {
    this.mservice.getAllAppuntamentiMedico(localStorage.getItem('id')!).subscribe(uts => {
      this.dataSource = new MatTableDataSource(uts);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isButtonEnable = true;
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.isButtonEnable = false;

  }

  checkboxLabel(row?: Appuntamento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  openSuccesDialog(message: string): void {
    this.dialog.open(DialogSuccesComponent, {
      width: '250px',
      data: message,
    });
  }

  delete(): void{
    for (let app of this.selection.selected){
      this.uservice.deleteAppuntamento(app.id).subscribe(
        x => { this.refresh()});
        console.log(app);
      }
      this.selection.clear();
      this.refresh();
    }
}
