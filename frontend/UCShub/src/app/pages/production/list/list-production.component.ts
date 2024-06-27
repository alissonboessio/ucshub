import { Component, ViewEncapsulation, inject } from '@angular/core';
import { TableModule } from '../../../../components/table/table.module';
import { Sort } from '@angular/material/sort';
import { Production } from '../../../models/Production';
import { TableColumn } from '../../../../components/table/tableColumn';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../api/api.service';
import { ProductionListObj } from '../../../models/HelperObjects/ProductionListObj';
import Enum_ProductionType from '../../../models/enumerations/Enum_ProductionType.json';
import { ActivatedRoute, Router } from '@angular/router';
import { OutlineButtonComponent } from '../../../../components/buttons/outline-button/outline-button.component';
import { TableIconColumn } from '../../../../components/table/tableIconColumn';

@Component({
  selector: 'app-list-production',
  standalone: true,
  imports: [TableModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, OutlineButtonComponent],
  templateUrl: './list-production.component.html',
  styleUrl: './list-production.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListProductionComponent {
  title = 'Produções';
  editing: boolean = false;
  filter : string | null = "";

  api: ApiService = inject(ApiService);

  productions = new Array<ProductionListObj>();
  filteredProductions = new Array<ProductionListObj>();
  productionsTableColumns! : TableColumn[];

  searchField = new FormControl();
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  rowAction3: TableIconColumn = { iconName: 'delete', toolTip: 'Excluir Produção', show: true }
  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      
      this.buildFilter(params['person'], 'person');
      
      if(params['title']){
        this.searchField.patchValue(params['title']);
      }

      this.api.ListProductionsSimple(this.filter).subscribe(async resp => {
        if (resp && resp.success) {
          this.productions = resp.productions ?? [];
          this.filteredProductions = this.productions;
          this.title = "Minhas Produções"
          this.editing = true
        this.filterProductions()

        }
      });
    });


    this.initColumnsTabs()
  }

  buildFilter(filter: string, queryParam: string){
    if (!filter){
      return;
    }
    this.filter += `?${queryParam}=${filter}`;
  }

  openProduction(row: any){
    this.router.navigateByUrl(`production/${row.id}`)
  }
   
  deleteProduction(row: any){

    this.api.DeleteProduction(row.id).subscribe(async resp => {
      if (resp && resp.success) {
        this.api.openSnackBar("Excluído!")
        this.api.ListProductionsSimple(this.filter).subscribe(async resp => {
          if (resp && resp.success) {
            this.productions = resp.productions ?? [];
            this.filteredProductions = this.productions;
          }
        });
      }
    });
  }
  addProduction(){
    this.router.navigateByUrl(`production`)
  }
   

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      this.filteredProductions = this.filteredProductions.sort((a: any, b: any) => a[keyName] > b[keyName] ? 1 : a[keyName] < b[keyName] ? -1 : 0);
    } else if (sortParameters.direction === 'desc') {
      this.filteredProductions = this.filteredProductions.sort((a: any, b: any) => b[keyName] > a[keyName] ? 1 : b[keyName] < a[keyName] ? -1 : 0);
    } 
    return this.filteredProductions = this.filteredProductions;
    
  }
  
  initColumnsTabs(): void {
    this.productionsTableColumns = [
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
      {
        name: 'Tipo',
        dataKey: 'type',
        isSortable: true,
        enumColumn: true,
        enumValue: Enum_ProductionType
      },
      // {
      //   name: 'Instituições',
      //   dataKey: 'preco'
      // }
    ];

    // this.rowActionIcon2 = { iconName: 'edit_document', toolTip: 'Editar Produto', show: true }


  }

  filterProductions(){   
console.log("entrou");

    this.filteredProductions = []

    this.productions.map(p => {
        if (
            this.StringContains(p.title, this.searchField.value)
        ) {
            this.filteredProductions.push(p);
            
console.log(p.title, this.searchField.value);
        }
    })

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
