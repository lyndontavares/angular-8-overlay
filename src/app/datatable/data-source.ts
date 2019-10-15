import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

interface Filters {
  columns: { [field: string]: string; };
  global: string;
}

export class DataSource<T> extends MatTableDataSource<T> {
  selection = new SelectionModel<T>(true, []);
  filters: Filters = { columns: { }, global: '' };

  constructor(data: T[]) {
    super(data);

    this.filterPredicate = (item, filter: string) => {
      const globalMatch = Object.keys(item).some(field => {
        return item[field].toString().toLocaleLowerCase().includes(this.filters.global);
      });
      const colMatch = !Object.keys(this.filters.columns).reduce((remove, field) => {
        return remove || !item[field].toString().toLocaleLowerCase()
          .includes(this.filters.columns[field]);
      }, false);
      return globalMatch && colMatch;
    };
  }

  filterColumn(filterValue: string, col: string): void {
    this.filters.columns[col] = filterValue.trim().toLocaleLowerCase();
    this.filter = JSON.stringify(this.filters);
  }

  filterGlobal(filterValue: string): void {
    this.filters.global = filterValue.trim().toLocaleLowerCase();
    this.filter = JSON.stringify(this.filters);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach(row => this.selection.select(row));
  }
}
