import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SimpleDialogInterface } from './simpleDialogInterface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.scss'
})
export class SimpleDialogComponent {

  constructor(public dialogRef: MatDialogRef<SimpleDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: SimpleDialogInterface) { }
  handleDialogSubmit() {
    if (this.dialogData.callbackConfirm instanceof Function){
      this.dialogData.callbackConfirm();
    }
    this.dialogRef.close();
  }
  closeDialog(): void {
    if (this.dialogData.callbackCancel instanceof Function){
      this.dialogData.callbackCancel();

    }
    this.dialogRef.close();
  }
}
