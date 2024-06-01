import { Component, ViewEncapsulation } from '@angular/core';
import { TableModule } from '../../../../components/table/table.module';
import { Sort } from '@angular/material/sort';
import { Production } from '../../../models/Production';
import { TableColumn } from '../../../../components/table/tableColumn';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-production',
  standalone: true,
  imports: [TableModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './list-production.component.html',
  styleUrl: './list-production.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ListProductionComponent {


  productions = new Array<Production>();
  filteredProductions = new Array<Production>();
  productionsTableColumns! : TableColumn[];

  searchField = new FormControl();

  ngOnInit(){
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
        dataKey: 'codigo',
        isSortable: true
      },
      {
        name: 'Pesquisadores',
        dataKey: 'descricao',
        isSortable: true
      },
      {
        name: 'Data',
        dataKey: 'unidade',
        isSortable: true
      },
      {
        name: 'Tipo',
        dataKey: 'estoque',
        isSortable: true
      },
      {
        name: 'Instituições',
        dataKey: 'preco'
      }
    ];

    // this.rowActionIcon2 = { iconName: 'edit_document', toolTip: 'Editar Produto', show: true }


  }

  filterProductions(){   
    
    this.filteredProductions = this.productions.filter(p => {
      p.title.includes(this.searchField.value()) ||
      p.Authors.some(a => a.name.includes(this.searchField.value())) ||
      p.Project.Instituiton.name.includes(this.searchField.value())
    });

    // this.router.navigateByUrl("/list-production")
  }

}
