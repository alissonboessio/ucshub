import { Component, inject } from '@angular/core';
import { ContainerOverflowComponent } from '../../../../components/containers/containerOverflow/container-overflow.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CancelConfirmComponent } from '../../../../components/buttons/cancel-confirm/cancel-confirm.component';
import { MatInputModule } from '@angular/material/input';
import { OutlineButtonComponent } from '../../../../components/buttons/outline-button/outline-button.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../../models/Project';
import Enum_ProjectStatus from '../../../models/enumerations/Enum_ProjectStatus.json';
import { FormValidations } from '../../../../utils/form-validations';
import { ListDialogInterface } from '../../../../components/dialogs/list-dialog/list-dialogInterface';
import { Person } from '../../../models/Person';
import { ListDialogComponent } from '../../../../components/dialogs/list-dialog/list-dialog.component';
import { Institution } from '../../../models/Institution';
import { Production } from '../../../models/Production';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ContainerOverflowComponent, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule,
    CancelConfirmComponent,
    OutlineButtonComponent,
    MatCardModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  public form!: FormGroup; 
  dialog: MatDialog = inject(MatDialog);
  formBuilder: FormBuilder = new FormBuilder();
  public project : Project = new Project();
  api: ApiService = inject(ApiService);

  enumStatus: any = Enum_ProjectStatus;
  formattedEnumStatus : string[] | null = Object.keys(this.enumStatus);

  authors: Array<Person> | [] = [];
  institutions: Array<Institution> | [] = [];

  selectedAuthors: Person[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.project.id],
      title: [this.project.title, [Validators.required]],
      description: [this.project.description, [Validators.required]],
      status: [this.project.status, [Validators.required]],
      Institution: this.formBuilder.group({
        id: [this.project.Institution.id, [Validators.required]],
        name: [this.project.Institution.name],
      }),
      Authors: this.formBuilder.array(this.project.Authors.map(author => this.createAuthorGroup(author))),
      Productions: this.formBuilder.array(this.project.Productions.map(prod => this.createProductionGroup(prod))),
      TotalRecursos: []
    });

    this.getInstitutions();


  }

  getInstitutions(){
    this.api.ListInstitutionsSimple().subscribe(async resp => {
      if (resp && resp.success) {
        this.institutions = resp.institutions ?? [];
        
      }
    });
  }

  createAuthorGroup(author: Person): FormGroup {
    return this.formBuilder.group({
      id: [author.id, Validators.required],
      name: [author.name, Validators.required]
    });
  }

  createProductionGroup(prod: Production): FormGroup {
    return this.formBuilder.group({
      id: [prod.id, Validators.required],
      name: [prod.title, Validators.required]
    });
  }
  

  onSubmit(): void {       
    if (FormValidations.checkValidity(this.form)){      
      const formValue = this.form.value;
      this.project.Authors = formValue.Authors;
      this.project.Institution.id = formValue.Institution.id;
      this.project.ResourceRequests = formValue.ResourceRequests;
      this.project.title = formValue.title;
      this.project.status = +formValue.status;
      this.project.description = formValue.description;
      
      this.api.UpdateProject(this.project);
      
    }
  }

  cancelar(): void {
      const formValue = this.form.value;
  }

  handleSelectedAuthor(selectedAuthors : Person[] | null){
    if (selectedAuthors) {
      this.selectedAuthors = selectedAuthors


    }
  }
  
  openAuthorSelectionDialog(): void {

    let dialogData: ListDialogInterface = {
      dialogList: this.authors,
      cancelButtonLabel: "Cancelar",
      confirmButtonLabel: "Confimar",
      dialogHeader: "Selecione os Autores",
      callbackConfirm: (selectedAuthors: Person[] | null) => this.handleSelectedAuthor(selectedAuthors),
    };           
    
    const dialogRef = this.dialog.open(ListDialogComponent, {
      width: '400px',
      disableClose: true,
      data: dialogData 
    });

  }


  getErrorMessage(campoName: string, campo: string, small: boolean = false) {
    return FormValidations.getErrorMessage(campoName, campo, this.form, small);
  }



}
