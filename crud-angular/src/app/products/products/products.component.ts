import { ProductsService } from './../services/products.service';
import { Product } from './../model/product';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) {this.products$ = this.productsService.findAll()
      .pipe(

      );  }

  onClickVendas() {
    this.location.back();
  }

  onClickClientes() {
    this.router.navigate(['clients'])
  }

  onClickProdutos() {
    this.router.navigate(['products'])
  }
}
