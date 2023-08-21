import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-succes',
  templateUrl: './dialog-succes.component.html',
  styleUrls: ['./dialog-succes.component.css']
})
export class DialogSuccesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
