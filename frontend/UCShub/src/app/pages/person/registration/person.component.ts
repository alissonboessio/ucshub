import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CancelConfirmComponent } from '../../../../components/buttons/cancel-confirm/cancel-confirm.component';
import { FormValidations } from '../../../../utils/form-validations';
import { ApiService } from '../../../api/api.service';
import { StorageService } from '../../../db/storage.service';
import { User } from '../../../models/User';
import { Person } from '../../../models/Person';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CancelConfirmComponent,
    NgxMaskDirective],
    providers: [provideNgxMask()],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {

  api: ApiService = inject(ApiService);
  storage: StorageService = inject(StorageService);
  public form!: FormGroup; 
  formBuilder: FormBuilder = new FormBuilder();
  loggedUser : User | null = null;

  mascara_tel: string = "(00) 0000-0000||(00) 00000-0000";

  person: Person = new Person()

  constructor(public dialogRef: MatDialogRef<PersonComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        id: [this.person.id],
        name: [this.person.name, [Validators.required]],
        phone: [this.person.phone, [Validators.required, FormValidations.DDD]],
        birth_date: [this.person.birth_date, [Validators.required]],
        titulation: [this.person.titulation, [Validators.required]],
        type: [this.person.type, [Validators.required]],
        lattes_id: [this.person.lattes_id, [Validators.required]],
        Institution: this.formBuilder.group({
          id: [this.person.Institution.id, [Validators.required]],
          name: [this.person.Institution.name],
        }),
        KnowledgeArea: this.formBuilder.group({
          id: [this.person.KnowledgeArea.id, [Validators.required]],
          name: [this.person.KnowledgeArea.name],
          codCnpq: [this.person.KnowledgeArea.codCnpq],
        }),
    });

    this.getLoggedUser();
   
  }

  getLoggedUser(){
    this.storage.GetLoggedUserAsync().then(resp => {
      this.loggedUser = resp;
    })   
    
  }

  cancelar(): void {
    this.dialogRef.close();       
  }

  onSubmit(): void {
    if (FormValidations.checkValidity(this.form)){ 
      const formValue = this.form.value;
      console.log(formValue);
      
      // let institution: Institution = new Institution();

      // institution.id = formValue.id;
      // institution.name = formValue.name;
      // institution.document = formValue.document;

      // this.api.UpdateInstitution(institution).subscribe(resp => {
      //   if(resp && resp.success){
      //     this.api.openSnackBar("Sucesso!")
      //     this.dialogRef.close();       

      //   }
      // })
    }
    
  }


  getErrorMessage(campoName: string, campo: string, small: boolean = false) {
    return FormValidations.getErrorMessage(campoName, campo, this.form, small);
  }

}
