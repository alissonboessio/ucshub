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
import { TableModule } from '../../../../components/table/table.module';
import { TableIconColumn } from '../../../../components/table/tableIconColumn';
import { TableColumn } from '../../../../components/table/tableColumn';
import Enum_PersonTitulation from '../../../models/enumerations/Enum_PersonTitulation.json';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { StorageService } from '../../../db/storage.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ResourceRequest } from '../../../models/ResourceRequest';

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
    MatCardModule,
    TableModule,
    CurrencyMaskModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  public form!: FormGroup; 
  dialog: MatDialog = inject(MatDialog);
  formBuilder: FormBuilder = new FormBuilder();
  public project : Project = new Project();
  api: ApiService = inject(ApiService);
  storage: StorageService = inject(StorageService);
  rowAction3: TableIconColumn = { iconName: 'delete', toolTip: 'Excluir Autor', show: true }
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  enumStatus: any = Enum_ProjectStatus;
  formattedEnumStatus : string[] | null = Object.keys(this.enumStatus);

  loggedUser : User | null = null;

  editing: boolean = false;

  authors: Array<Person> | [] = [];
  institutions: Array<Institution> | [] = [];

  selectedAuthors: Array<Person> = [];

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
    {
      name: 'Instituição',
      dataKey: 'institution.name',
      isSortable: false,
    }
  ]

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
      TotalRecursos: [0]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.api.GetProjectById(+id).subscribe(resp => {
          if (resp && resp.success) {                  
            this.project.id = resp.project.id;
            this.project.title = resp.project.title;
            this.project.description = resp.project.description;
            this.project.status = resp.project.status;
            this.project.Institution = resp.project.institution;
            this.project.Authors = resp.project.authors;
            this.project.Productions = resp.project.productions;
            this.project.ResourceRequests = resp.project.resources;            
            this.editing = true;
            this.updateForm(this.project);
          }else{
            this.router.navigateByUrl("project")
          }
        });
      }
    });

    this.getInstitutions();
    this.getAuthors();
    this.getLoggedUser();
  }

  updateForm(project: any) {
    this.form.patchValue({
      id: project.id,
      title: project.title,
      description: project.description,
      status: project.status + "",
      Institution: {
        id: project.Institution.id,
        name: project.Institution.name,
      },
      Authors: project.Authors,
      Productions: project.Productions,
      TotalRecursos: project.ResourceRequests?.reduce((total: number, resource: ResourceRequest) => {
        return total + resource.quantity;
      }, 0)
    });
    this.selectedAuthors = project.Authors;
  }

  getLoggedUser(){
    this.storage.GetLoggedUserAsync().then(resp => {
      this.loggedUser = resp;
      
    })   
    
  }

  getInstitutions(){
    this.api.ListInstitutionsSimple().subscribe(async resp => {
      if (resp && resp.success) {
        this.institutions = resp.institutions ?? [];
        
      }
    });
  }

  getAuthors(){
    this.api.ListPeopleSimple().subscribe(async resp => {
      if (resp && resp.success) {
        this.authors = resp.people ?? [];
        
      }
    });
  }

  openAuthor(row: any){
    //abrir autor
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

    if (this.editing && !this.selectedAuthors.some(author => author.id === this.loggedUser?.person?.id)) {
      this.api.openSnackBar("Apenas os Autores podem editar Projetos!.");
      return;
    }
  
    if (FormValidations.checkValidity(this.form)){      
      const formValue = this.form.value;
      this.project.Authors = this.selectedAuthors;
      this.project.Institution = formValue.Institution;
      this.project.ResourceRequests = formValue.ResourceRequests;
      this.project.title = formValue.title;
      this.project.status = +formValue.status;
      this.project.description = formValue.description;
      
      this.api.UpdateProject(this.project).subscribe(async resp => {
        if (resp){
          this.api.openSnackBar("Sucesso!")
          this.router.navigate(['/list-projects'], { queryParams: { person_id: this.loggedUser?.person?.id } });        
        }
      });
      
    }
  }

  cancelar(): void {
    this.router.navigate(['/list-projects'], { queryParams: { person_id: this.loggedUser?.person?.id } });       
  }

  deleteAuthor(row: any){
    this.selectedAuthors = this.selectedAuthors.filter(author => author.id != row.id)
  }

  handleSelectedAuthor(selectedAuthors : Person[] | null){    
    if (selectedAuthors) {
      this.selectedAuthors = [...this.selectedAuthors, ...selectedAuthors];

    }
  }
  
  openAuthorSelectionDialog(): void {

    if (this.editing && !this.selectedAuthors.some(author => author.id === this.loggedUser?.person?.id)) {
      this.api.openSnackBar("Apenas os Autores podem editar Projetos!.");
      return;
    }

    const filteredAuthors = this.authors.filter(author => 
      !this.selectedAuthors.some(selectedAuthor => selectedAuthor.id === author.id)
    );

    let dialogData: ListDialogInterface = {
      dialogList: filteredAuthors,
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
