import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../model/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @Input() products: Product[] = [];
  readonly displayedColumns = ['name', 'descricao', 'price', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
