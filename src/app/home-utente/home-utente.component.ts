import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';
import { Appuntamento } from '../model/appuntamento';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogSuccesComponent } from '../dialog-succes/dialog-succes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-utente',
  templateUrl: './home-utente.component.html',
  styleUrls: ['./home-utente.component.css']
})
export class HomeUtenteComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['select', 'nome', 'data'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, {static:false}) table: MatTable<any>;
  
  nome: string='';
  appuntamenti:any;
  ultimoAppuntamento: Appuntamento = new Appuntamento();
  appuntamentiLength: number = 0;
  dataSource: MatTableDataSource<Appuntamento>;
  selection = new SelectionModel<Appuntamento>(true, []);
  isButtonEnable:boolean =true;
  isPopupOpen:boolean = false;

  constructor( private router: Router, private uservice: UtenteService,
     private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog) { 
      this.dataSource = new MatTableDataSource();
      this.selection.changed.subscribe( () =>{​​​​​​​​
      this.isButtonEnable = this.selection.selected.length == 0;
          }​​​​​​​​)
  }

  ngOnInit(): void {
    localStorage.getItem('nome') ? this.nome = localStorage.getItem('nome')! : this.nome = '';
  this.uservice.getAllAppuntamentiUtente(localStorage.getItem('id')!).subscribe(
    appuntamenti => {
      this.ultimoAppuntamento = appuntamenti[appuntamenti.length - 1];
      this.appuntamentiLength = appuntamenti.length;
      this.appuntamenti = appuntamenti;
    }, error => {
      console.error(error);
      this.appuntamenti=null!;
    });
    this.refresh();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  refresh(): void {
    this.uservice.getAllAppuntamentiUtente(localStorage.getItem('id')!).subscribe(uts => {
      this.dataSource = new MatTableDataSource(uts);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    },error => {
      console.error(error);
      this.dataSource = new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
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

  openSuccesDialog(message: string): void {
    if (!this.isPopupOpen) {
      this.isPopupOpen = true;
    const dialogRef=this.dialog.open(DialogSuccesComponent, {
      width: '250px',
      data: message,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.isPopupOpen = false;
    });
  }
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
        this.openSuccesDialog("Appuntamento cancellato con successo");
        console.log(app);
      }
      this.selection.clear();
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


