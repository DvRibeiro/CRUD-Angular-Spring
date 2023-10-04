import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sale } from '../model/sales';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent {

  @Input() sales: Sale[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);


  readonly displayedColumns = ['client', 'product', 'actions'];

  formatProductNames(products: any[]): string {
    return products.map(product => product.name).join(', ');
  }

  constructor() { }

  onAdd() {
    this.add.emit(true)
  }

  onEdit(sale: Sale) {
    this.edit.emit(sale)
  }

}
