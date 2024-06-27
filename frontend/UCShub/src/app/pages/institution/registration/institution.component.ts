import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Project } from '../../../models/Project';
import { Institution } from '../../../models/Institution';
import { ApiService } from '../../../api/api.service';
import { User } from '../../../models/User';
import { StorageService } from '../../../db/storage.service';
import { MatSelectModule } from '@angular/material/select';
import { FormValidations } from '../../../../utils/form-validations';
import { CancelConfirmComponent } from '../../../../components/buttons/cancel-confirm/cancel-confirm.component';
import { ResourceRequest } from '../../../models/ResourceRequest';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-institution',
  standalone: true,
  imports: [MatDialogModule, 
    MatButtonModule,
    CurrencyMaskModule, 
    MatFormFieldModule,
    MatIconModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatIconModule, 
    MatListModule,
    MatSelectModule,
    CancelConfirmComponent,
    NgxMaskDirective],
    providers: [provideNgxMask()],
  templateUrl: './institution.component.html',
  styleUrl: './institution.component.scss'
})
export class InstitutionComponent {

  total = new FormControl();

  api: ApiService = inject(ApiService);
  storage: StorageService = inject(StorageService);
  public form!: FormGroup; 
  formBuilder: FormBuilder = new FormBuilder();
  loggedUser : User | null = null;

  constructor(public dialogRef: MatDialogRef<InstitutionComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        id: [null],
        name: ["", [Validators.required]],
        document: ["", [Validators.required]]
    });


    this.getLoggedUser();
   
  }

  getLoggedUser(){
    this.storage.GetLoggedUserAsync().then(resp => {
      this.loggedUser = resp;
    })   
    
  }

  addInstituicao(){

  }

  cancelar(): void {
    this.dialogRef.close();       
  }

  onSubmit(): void {
    if (FormValidations.checkValidity(this.form)){ 
      const formValue = this.form.value;
      console.log(formValue);
      
      let institution: Institution = new Institution();

      institution.id = formValue.id;
      institution.name = formValue.name;
      institution.document = formValue.document;

      this.api.UpdateInstitution(institution).subscribe(resp => {
        if(resp && resp.success){
          this.api.openSnackBar("Sucesso!")
          this.dialogRef.close();       

        }
      })
    }
    
  }


  getErrorMessage(campoName: string, campo: string, small: boolean = false) {
    return FormValidations.getErrorMessage(campoName, campo, this.form, small);
  }

}
