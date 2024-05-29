import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableColumn } from './tableColumn';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableIconColumn } from './tableIconColumn';

@Component({
  selector: 'material-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  public tableDataSource = new MatTableDataSource<any,MatPaginator>([]);
  public displayedColumns!: string[];
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() showStatus!: 'true' | 'false';
  @Input() statusEnum: any;
  @Input() rowActionIcon1!: TableIconColumn;
  @Input() rowActionIcon2!: TableIconColumn;
  @Input() rowActionIcon3!: TableIconColumn;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction1: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction2: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction3: EventEmitter<any> = new EventEmitter<any>();
  @Output() hybridAction: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  constructor() {
  }

  ngOnInit(): void {



    this.displayedColumns = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);

    if (this.showStatus === 'true') {
      this.displayedColumns.unshift("status")
    }

    if (this.rowActionIcon1) {
      this.displayedColumns.push(this.rowActionIcon1.iconName);
    }
    if (this.rowActionIcon2) {
      this.displayedColumns.push(this.rowActionIcon2.iconName);
    }
    if (this.rowActionIcon3) {
      this.displayedColumns.push(this.rowActionIcon3.iconName);
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }


  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name

    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active)?.dataKey ?? sortParameters.active;
    
    this.sort.emit(sortParameters);
  }

  emitRowClick(row: any) {
    this.rowClick.emit(row);
  }

  emitRowAction1(row: any) {
    this.rowAction1.emit(row);
  }

  emitRowAction2(row: any) {
    this.rowAction2.emit(row);
  }

  emitRowAction3(row: any) {
    this.rowAction3.emit(row);
  }
  emitHybridRowClick(row: any) {
    this.hybridAction.emit(row);
  }

}