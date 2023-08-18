import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from '../services/medico.service';
import { Appuntamento } from '../model/appuntamento';
import {MatTableModule,MatTableDataSource, MatTableDataSourcePaginator, MatTable} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { UtenteService } from '../services/utente.service';


@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})

export class HomeMedicoComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nome', 'data'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  dataSource: MatTableDataSource<Appuntamento>;
  selection = new SelectionModel<Appuntamento>(true, []);
  appuntamentilength: number = 0;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  nessunAppuntamentoMessage: string='Non ci sono appuntamenti in programma';
  nome='';
  constructor(private router: Router, private mservice: MedicoService,  private changeDetectorRefs: ChangeDetectorRef, private uservice : UtenteService) { }

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
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Appuntamento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  delete(): void{
    for (let app of this.selection.selected){
      this.uservice.deleteAppuntamento(app.id).subscribe(
        x => { this.refresh()});
        console.log(app);
      }
      this.selection.clear();
    }
}
