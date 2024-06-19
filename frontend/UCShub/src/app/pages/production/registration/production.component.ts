import { Component, inject, Inject } from '@angular/core';
import { ContainerOverflowComponent } from '../../../../components/containers/containerOverflow/container-overflow.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Production } from '../../../models/Production';
import { Titulation } from '../../../models/enumerations/Enum_Titulation';
import { PersonType } from '../../../models/enumerations/Enum_PersonType';
import { Person } from '../../../models/Person';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/Project';
import { Instituiton } from '../../../models/Instituition';
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

    projects: Project[] = [
      {
        id: 1, title: 'Projeto 2 teste 122343',
        description: null,
        status: null,
        type: null,
        created_at: null,
        ended_at: null,
        Instituiton: new Instituiton,
        Productions: [],
        ResourceRequest: [],
        Authors: [{
          id: 1,
          name: "Alisson",
          birth_date:  null,
          phone:  '',
          lattes_id:  '',
          type: PersonType.Aluno,
          titulation: Titulation.Graduação
        },
        {
          id: 2,
          name: "Gustavo",
          birth_date:  null,
          phone:  '',
          lattes_id:  '',
          type: PersonType.Aluno,
          titulation: Titulation.Graduação
        }
      ]
      },
      {
        id: 2, title: 'Projeto 1 teste 123',
        description: null,
        status: null,
        type: null,
        created_at: null,
        ended_at: null,
        Instituiton: new Instituiton,
        Productions: [],
        ResourceRequest: [],
        Authors: [
          {
            id: 2,
            name: "Gustavo",
            birth_date:  null,
            phone:  '',
            lattes_id:  '',
            type: PersonType.Aluno,
            titulation: Titulation.Graduação
          }
        ]
      }
    ];

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

    cancelar(): void {
        const formValue = this.form.value;
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
