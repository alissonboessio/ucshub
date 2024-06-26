import { Component, inject } from '@angular/core';
import { TableModule } from '../../../../components/table/table.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../api/api.service';
import { ProjectListObj } from '../../../models/HelperObjects/ProjectListObj';
import { TableColumn } from '../../../../components/table/tableColumn';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { TableIconColumn } from '../../../../components/table/tableIconColumn';
import { OutlineButtonComponent } from '../../../../components/buttons/outline-button/outline-button.component';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [TableModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, OutlineButtonComponent],
  templateUrl: './list-projects.component.html',
  styleUrl: './list-projects.component.scss'
})
export class ListProjectsComponent {
  title = 'Meus Projetos'
  filter : string | null = "";

  api: ApiService = inject(ApiService);

  projects = new Array<ProjectListObj>();
  filteredProjects = new Array<ProjectListObj>();
  projectsTableColumns! : TableColumn[];
  rowAction3: TableIconColumn = { iconName: 'delete', toolTip: 'Excluir Projeto', show: true }

  searchField = new FormControl();
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.buildFilter(params['person_id'], 'person_id');

      this.api.ListProjectsSimple(this.filter).subscribe(async resp => {
        if (resp && resp.success) {
          this.projects = resp.projects ?? [];
          this.filteredProjects = this.projects;
        }
      });
    });


    this.initColumnsTabs()
  }

  buildFilter(filter: string, queryParam: string){
    this.filter += `?${queryParam}=${filter}`;
  }
   
  openProject(row: any){
    this.router.navigateByUrl(`project/${row.id}`)
  }
   
   
  addProject(){
    this.router.navigateByUrl(`project`)
  }
   
  deleteProject(row: any){

    this.api.DeleteProject(row.id).subscribe(async resp => {
      if (resp && resp.success) {
        this.api.openSnackBar("Excluído!")
        this.api.ListProjectsSimple(this.filter).subscribe(async resp => {
          if (resp && resp.success) {
            this.projects = resp.projects ?? [];
            this.filteredProjects = this.projects;
          }
        });
      }
    });
  }

  initColumnsTabs(): void {
    this.projectsTableColumns = [
      {
        name: 'Título',
        dataKey: 'title',
        isSortable: true
      },
      {
        name: 'Pesquisadores',
        dataKey: 'people',
        isSortable: true
      },
      {
        name: 'Data',
        dataKey: 'dateCreated',
        isSortable: true,
        pipe: 'date'
      },
      // {
      //   name: 'Tipo',
      //   dataKey: 'type',
      //   isSortable: true,
      //   enumColumn: true,
      //   enumValue: Enum_ProductionType
      // },
      // {
      //   name: 'Instituição',
      //   dataKey: 'institution.name',
      //   isSortable: true
      // }
    ];

    // this.rowActionIcon2 = { iconName: 'edit_document', toolTip: 'Editar Produto', show: true }


  }

  filterProjects(){   

    this.filteredProjects = []

    this.projects.map(p => {
        if (
            this.StringContains(p.title, this.searchField.value)
        ) {
            this.filteredProjects.push(p);
        }
    })

  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.filteredProjects = this.filteredProjects.sort((a: any, b: any) => a[keyName] > b[keyName] ? 1 : a[keyName] < b[keyName] ? -1 : 0);
    } else if (sortParameters.direction === 'desc') {
      this.filteredProjects = this.filteredProjects.sort((a: any, b: any) => b[keyName] > a[keyName] ? 1 : b[keyName] < a[keyName] ? -1 : 0);
    } 
    return this.filteredProjects = this.filteredProjects;
    
  }

  public StringContains(str1: any , str2 : any, ignoreCase = true) {
    if ((str1 === null && str2 === null) || (str1 === "" && str2 === "")) {
      return true;
    }
    if (str1 != null && str2 != null) {
      if (ignoreCase) {
        return (str1.toLowerCase().indexOf(str2.toLowerCase())) !== -1;
      } else {
        return (str1.indexOf(str2.toLowerCase())) !== -1;
      }
    }

    return false;
  }
}
