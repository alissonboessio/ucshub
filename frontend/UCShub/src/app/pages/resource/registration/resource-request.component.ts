import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { InstitutionComponent } from '../../institution/registration/institution.component';

@Component({
  selector: 'app-resource-request',
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
  templateUrl: './resource-request.component.html',
  styleUrl: './resource-request.component.scss'
})
export class ResourceRequestComponent {

  total = new FormControl();

  api: ApiService = inject(ApiService);
  storage: StorageService = inject(StorageService);
  public form!: FormGroup; 
  formBuilder: FormBuilder = new FormBuilder();
  projects: Array<Project> = [];
  intitutions: Array<Institution> = [];
  loggedUser : User | null = null;

  dialog: MatDialog = inject(MatDialog)


  constructor(public dialogRef: MatDialogRef<ResourceRequestComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

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
    const dialogRef = this.dialog.open(InstitutionComponent, {
      width: '600px',
      disableClose: true,
      data: null 
  });

  }

  cancelar(): void {
    this.dialogRef.close();       
  }

  onSubmit(): void {
    if (FormValidations.checkValidity(this.form)){ 
      const formValue = this.form.value;
      
      let resource: ResourceRequest = new ResourceRequest();

      resource.Institution = formValue.Institution;
      resource.Person = this.loggedUser?.person;
      resource.Project = formValue.Project;
      resource.projectid = formValue.Project?.id;
      resource.institutionid = formValue.Institution?.id;
      resource.personid = this.loggedUser?.person?.id;
      resource.quantity = +formValue.quantity;
      resource.id = !formValue.id ? null : formValue.id ;

      this.api.UpdateResourceRequest(resource).subscribe(resp => {
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
