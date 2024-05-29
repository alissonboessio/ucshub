import { Component } from '@angular/core';
import { TableModule } from '../../../../components/table/table.module';
import { Sort } from '@angular/material/sort';
import { Production } from '../../../models/Production';
import { TableColumn } from '../../../../components/table/tableColumn';

@Component({
  selector: 'app-list-production',
  standalone: true,
  imports: [TableModule],
  templateUrl: './list-production.component.html',
  styleUrl: './list-production.component.scss'
})
export class ListProductionComponent {

  filteredProductions = new Array<Production>();
  productionsTableColumns! : TableColumn[];

  ngOnInit(){
    this.filteredProductions.push(new Production())
    this.filteredProductions.push(new Production())
    this.filteredProductions.push(new Production())
    this.filteredProductions.push(new Production())

    this.initColumnsTabs()
  }

  sortData(sortParameters: Sort) {
    // const keyName = sortParameters.active;
    // if (sortParameters.direction === 'asc') {
    //   this.filteredProductions = this.filteredProductions.sort((a: Production | string, b: Production| string) => a[keyName] > b[keyName] ? 1 : a[keyName] < b[keyName] ? -1 : 0);
    // } else if (sortParameters.direction === 'desc') {
    //   this.filteredProductions = this.filteredProductions.sort((a: Production| string, b: Production| string) => b[keyName] > a[keyName] ? 1 : b[keyName] < a[keyName] ? -1 : 0);
    // } 
    return this.filteredProductions = this.filteredProductions;
    
  }
  
  openProduction(event: Event){

  }

  initColumnsTabs(): void {
    this.productionsTableColumns = [
      {
        name: 'N°',
        dataKey: 'codigo'
      },
      {
        name: 'Descrição',
        dataKey: 'descricao',
        isSortable: true
      },
      {
        name: 'Unidade',
        dataKey: 'unidade',
      },
      {
        name: 'Estoque',
        dataKey: 'estoque',
        isSortable: true
      },
      {
        name: 'Preço de Venda',
        dataKey: 'preco',
        isSortable: true,
        pipe: 'currency',
        pipeFormat: '.2-2'
      }
    ];

    // this.rowActionIcon2 = { iconName: 'edit_document', toolTip: 'Editar Produto', show: true }


  }


}
