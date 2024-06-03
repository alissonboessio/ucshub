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

@Component({
  selector: 'app-list-production',
  standalone: true,
  imports: [TableModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './list-production.component.html',
  styleUrl: './list-production.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListProductionComponent {

  api: ApiService = inject(ApiService);

  productions = new Array<ProductionListObj>();
  filteredProductions = new Array<ProductionListObj>();
  productionsTableColumns! : TableColumn[];

  searchField = new FormControl();

  ngOnInit(){

    this.api.ListProductionsSimple().subscribe(async resp => {
      if(resp.success){
        this.productions = resp.productions ?? [];
        this.filterProductions();
      }
            
    })

    // this.filteredProductions.push(new Production())
    // this.filteredProductions.push(new Production())
    // this.filteredProductions.push(new Production())
    // this.filteredProductions.push(new Production())

    this.initColumnsTabs()
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
  
  openProduction(event: Event){

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
    console.log(this.productions);
    
    this.filteredProductions = this.productions.filter(p => {
      p.title.includes(this.searchField.value)
      // p.people.some(a => a.includes(this.searchField.value))
    });


    this.filteredProductions = this.productions

    console.log(this.filteredProductions);
    

    // this.router.navigateByUrl("/list-production")
  }

}
