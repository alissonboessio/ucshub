import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ListDialogInterface } from './list-dialogInterface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'list-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './list-dialog.component.html',
  styleUrl: './list-dialog.component.scss'
})
export class ListDialogComponent {

  constructor(public dialogRef: MatDialogRef<ListDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: ListDialogInterface) { 
    
  }
  handleDialogSubmit(selectedOptions: any) {
    if (this.dialogData.callbackConfirm instanceof Function){
      const selectedAuthors = selectedOptions.map((option: { value: any; }) => option.value);
      this.dialogData.callbackConfirm(selectedAuthors);
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
