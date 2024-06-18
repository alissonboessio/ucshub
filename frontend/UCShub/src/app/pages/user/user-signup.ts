import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from '../../models/User';
import { FormValidations } from '../../../utils/form-validations';

@Component({
  selector: 'user-signup',
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  encapsulation: ViewEncapsulation.None
})
export class SignupDialog {

  formSign!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  constructor(
    public dialogRef: MatDialogRef<SignupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    this.formSign = this.formBuilder.group({
      name: [data.name, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required]
    })

  }

  close(): void {
    this.dialogRef.close();
  }

  register(): void {

    if (FormValidations.checkValidity(this.formSign)){
      this.dialogRef.close(this.formSign.value);

    }

  }

  getErrorMessage(campoName: string, campo: string) {
    return FormValidations.getErrorMessage(campoName, campo, this.formSign);
  }


}