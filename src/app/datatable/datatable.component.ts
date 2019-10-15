import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatPaginator, MatSort } from '@angular/material';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataSource } from './data-source';
import { listaEntidades, Entidade } from '../model/Entidade';

interface ColumnDescritpion {
  key: string;
  name: string;
  visible: boolean;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  allColumns: ColumnDescritpion[] = [
    { key: 'codigo', name: 'Código', visible: true },
    { key: 'nome', name: 'Nome', visible: true },
    { key: 'email', name: 'Email', visible: true },
  ];

  displayedColumns = this.allColumns.map(c => c.key);
  dataSource = new DataSource(listaEntidades) ;

  @ViewChild(MatTable, {static: true}) table: MatTable<Entidade>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  changeColOrder(): void {
    const indices = this.allColumns.map((_, i) => i).slice(1);
    const shuffledIndices = [0, ...indices.sort(() => Math.random() - 0.5)];
    this.allColumns = this.allColumns.map((_, i, arr) => arr[shuffledIndices[i]]);
    this.updateColumns();
  }

  drop(event: CdkDragDrop<Element[]>): void {
    const prevIndex = this.dataSource.data.findIndex(d => d === event.item.data);
    moveItemInArray(listaEntidades, prevIndex, event.currentIndex);
    this.dataSource.data = listaEntidades.slice();
    this.table.renderRows();
  }

  reorderCols(event: CdkDragDrop<ColumnDescritpion[]>): void {
    moveItemInArray(this.allColumns, event.previousIndex, event.currentIndex);
    this.updateColumns();
  }

  updateColumns(): void {
    this.displayedColumns = this.allColumns.filter(c => c.visible).map(c => c.key);
  }

}
