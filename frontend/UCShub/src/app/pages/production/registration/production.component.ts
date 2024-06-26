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
import { TableColumn } from '../../../../components/table/tableColumn';
import Enum_PersonTitulation from '../../../models/enumerations/Enum_PersonTitulation.json';
import { TableModule } from '../../../../components/table/table.module';
import { TableIconColumn } from '../../../../components/table/tableIconColumn';

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
    MatCardModule,
    TableModule],
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
    editing: boolean = false;
    projects: Project[] | any = [];
    private router = inject(Router);
    private storage = inject(StorageService);
    loggedUser : User | null = null;
    api: ApiService = inject(ApiService);
    rowAction3: TableIconColumn = { iconName: 'delete', toolTip: 'Excluir Autor', show: true }

    selectedAuthors: Person[] = [];
    selectedAuthorsProduction: Person[] = [];
    authorsColumns : TableColumn[] = [
      {
        name: 'Nome',
        dataKey: 'name',
        isSortable: false
      },
      {
        name: 'Titulação',
        dataKey: 'titulation',
        isSortable: false,
        enumColumn: true,
        enumValue: Enum_PersonTitulation
      },
      // {
      //   name: 'Instituição',
      //   dataKey: 'institution.name',
      //   isSortable: false,
      // }
    ]
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
    

    openAuthor(row: any){
      //abrir autor
    }
    onProjectSelected(projectId: number): void {
      const selectedProject:any = this.projects.find((project: Project) => project.id === projectId);
      if (selectedProject) {
        this.selectedAuthors = selectedProject.Authors;
  
        this.form.patchValue({
          Project: {
            title: selectedProject.title
          }
        });
  
        const authorsFormArray = this.form.get('Authors') as FormArray;
        authorsFormArray.clear();
        
        
        selectedProject.peoplemodel.forEach((author: Person) => {
          authorsFormArray.push(this.createAuthorGroup(author));
        });
        
      }
    }
    deleteAuthor(row: any){
      this.selectedAuthorsProduction = this.selectedAuthorsProduction.filter(author => author.id != row.id)
    }


    onSubmit(): void {      

      if (this.editing && !this.selectedAuthors.some(author => author.id === this.loggedUser?.person?.id)) {
        this.api.openSnackBar("Apenas os Autores podem editar Produções!.");
        return;
      }
      // selectedAuthorsProduction
      if (FormValidations.checkValidity(this.form)){
        const formValue = this.form.value;
        this.production.Authors = this.selectedAuthorsProduction;
        this.production.Project = formValue.Project;
        this.production.description = formValue.description;
        this.production.title = formValue.title;
        this.production.id = formValue.id;
        this.production.type = +formValue.type;
        this.production.projectid = formValue.Project.id;

        this.api.UpdateProduction(this.production).subscribe(async resp => {
          if (resp){
            this.api.openSnackBar("Sucesso!")
            this.router.navigate(['/list-productions'], { queryParams: { person: this.loggedUser?.person?.id } });        
          }
        });
        
      }
    }

    getLoggedUser(){
      this.storage.GetLoggedUserAsync().then(resp => {
        this.loggedUser = resp;
        this.getProjects();
      })   
      
    }
    getProjects(){
      this.api.ListProjectsSimple("?person_id=" + this.loggedUser?.person?.id).subscribe(async resp => {
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
        dialogList: this.projects.find((project: any) => project.id === this.form.get('Project.id')?.value)?.peoplemodel || [],
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
