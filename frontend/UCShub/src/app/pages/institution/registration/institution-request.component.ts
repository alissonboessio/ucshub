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

@Component({
  selector: 'app-institution-request',
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
  CancelConfirmComponent],
  templateUrl: './institution-request.component.html',
  styleUrl: './institution-request.component.scss'
})
export class InstitutionComponent {

  total = new FormControl();

  api: ApiService = inject(ApiService);
  storage: StorageService = inject(StorageService);
  public form!: FormGroup; 
  formBuilder: FormBuilder = new FormBuilder();
  projects: Array<Project> = [];
  intitutions: Array<Institution> = [];
  loggedUser : User | null = null;

  constructor(public dialogRef: MatDialogRef<InstitutionComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Institution: this.formBuilder.group({
        id: [null, [Validators.required]],
        name: [""],
      }),
      quantity: [0.0, Validators.required],
      Project: this.formBuilder.group({
        id: [null, [Validators.required]],
        title: [null],
      }),
    });


    this.getLoggedUser();
    this.getInstitutions();
   
  }

  getLoggedUser(){
    this.storage.GetLoggedUserAsync().then(resp => {
      this.loggedUser = resp;
      this.getProjects();
    })   
    
  }

  getInstitutions(){
      this.api.ListInstitutionsSimple().subscribe(resp => {
        if (resp && resp.success){
          this.intitutions = resp.institutions;
        }
      })
  }

  getProjects(){
    this.api.ListProjectsSimple("?person_id=" + this.loggedUser?.person?.id).subscribe(resp => {
      if (resp && resp.success){
        this.projects = resp.projects;
      }
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
      
      let institution: ResourceRequest = new ResourceRequest();

      institution.Institution = formValue.Institution;
      institution.Person = this.loggedUser?.person;
      institution.Project = formValue.Project;
      institution.projectid = formValue.Project?.id;
      institution.institutionid = formValue.Institution?.id;
      institution.personid = this.loggedUser?.person?.id;
      institution.quantity = +formValue.quantity;
      institution.id = !formValue.id ? null : formValue.id ;

      this.api.UpdateResourceRequest(institution).subscribe(resp => {
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
