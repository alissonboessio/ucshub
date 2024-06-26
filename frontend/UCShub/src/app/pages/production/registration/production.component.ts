import { Component, inject, Inject } from '@angular/core';
import { ContainerOverflowComponent } from '../../../../components/containers/containerOverflow/container-overflow.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Production } from '../../../models/Production';
import { Titulation } from '../../../models/enumerations/Enum_Titulation';
import { PersonType } from '../../../models/enumerations/Enum_PersonType';
import { Person } from '../../../models/Person';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/Project';
import { Institution } from '../../../models/Institution';
import { FormValidations } from '../../../../utils/form-validations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Enum_ProductionType from '../../../models/enumerations/Enum_ProductionType.json';
import {MatSelectModule} from '@angular/material/select';
import { CancelConfirmComponent } from '../../../../components/buttons/cancel-confirm/cancel-confirm.component';
import { OutlineButtonComponent } from '../../../../components/buttons/outline-button/outline-button.component';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ListDialogComponent } from '../../../../components/dialogs/list-dialog/list-dialog.component';
import { ListDialogInterface } from '../../../../components/dialogs/list-dialog/list-dialogInterface';
import { Router } from '@angular/router';
import { StorageService } from '../../../db/storage.service';
import { User } from '../../../models/User';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-production',
  standalone: true,
  imports: [ContainerOverflowComponent, 
    ReactiveFormsModule,
    MatSelectModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule,
    CancelConfirmComponent,
    OutlineButtonComponent,
    MatCardModule ],
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent {

    public form!: FormGroup; 
    dialog: MatDialog = inject(MatDialog);
    formBuilder: FormBuilder = new FormBuilder();
    public production : Production = new Production();
    enumTypes: any = Enum_ProductionType;
    formattedEnumTypes! : string[] | null;

    projects: Project[] = [];
    private router = inject(Router);
    private storage = inject(StorageService);
    loggedUser : User | null = null;
    api: ApiService = inject(ApiService);

    selectedAuthors: Person[] = [];
    selectedAuthorsProduction: Person[] = [];

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [this.production.id],
        title: [this.production.title, [Validators.required]],
        description: [this.production.description, [Validators.required]],
        type: [this.production.type, [Validators.required]],
        created_at: [this.production.created_at],
        Project: this.formBuilder.group({
          id: [this.production.Project.id, [Validators.required]],
          title: [this.production.Project.title],
        }),
        Authors: this.formBuilder.array(this.production.Authors.map(author => this.createAuthorGroup(author)))
      });

      this.formattedEnumTypes = Object.keys(this.enumTypes);

      this.form.get('Project.id')?.valueChanges.subscribe((selectedProjectId) => {
        this.onProjectSelected(selectedProjectId);
      });

      
    this.getLoggedUser();
    

    }

    createAuthorGroup(author: Person): FormGroup {
      return this.formBuilder.group({
        id: [author.id, Validators.required],
        name: [author.name, Validators.required]
      });
    }
    
    onProjectSelected(projectId: number): void {
      const selectedProject = this.projects.find(project => project.id === projectId);
      if (selectedProject) {
        this.selectedAuthors = selectedProject.Authors;
  
        this.form.patchValue({
          Project: {
            title: selectedProject.title
          }
        });
  
        const authorsFormArray = this.form.get('Authors') as FormArray;
        authorsFormArray.clear();
        selectedProject.Authors.forEach(author => {
          authorsFormArray.push(this.createAuthorGroup(author));
        });
      }
    }

    onSubmit(): void {      
      if (FormValidations.checkValidity(this.form)){
        const formValue = this.form.value;
      }
    }
    getLoggedUser(){
      this.storage.GetLoggedUserAsync().then(resp => {
        this.loggedUser = resp;
        this.getProjects();
      })   
      
    }
    getProjects(){
      this.api.ListProjectsSimple("person_id:" + this.loggedUser?.person?.id).subscribe(async resp => {
        if (resp && resp.success) {
          this.projects = resp.projects ?? [];
          
        }
      });
    }
    cancelar(): void {
      this.router.navigate(['/list-productions'], { queryParams: { person: this.loggedUser?.person?.id } });       
    }

    openAuthorSelectionDialog(): void {

      let dialogData: ListDialogInterface = {
        dialogList: this.projects.find(project => project.id === this.form.get('Project.id')?.value)?.Authors || [],
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

    handleSelectedAuthor(selectedAuthors : Person[] | null){
      if (selectedAuthors) {
        this.selectedAuthorsProduction = selectedAuthors


      }
    }

    getErrorMessage(campoName: string, campo: string, small: boolean = false) {
      return FormValidations.getErrorMessage(campoName, campo, this.form, small);
    }

}
