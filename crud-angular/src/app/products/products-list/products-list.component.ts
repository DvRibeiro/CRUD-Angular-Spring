import { Product } from './../model/product';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @Input() products: Product[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'description', 'price', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true)
  }

  onEdit(product: Product) {
    this.edit.emit(product)
  }

}
