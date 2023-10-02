import { Component, Input } from '@angular/core';
import { Sale } from '../model/sales';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent {

  @Input() sales: Sale[] = [];
  readonly displayedColumns = ['client', 'product', 'actions'];

  formatProductNames(products: any[]): string {
    return products.map(product => product.name).join(', ');
  }



  constructor(
      private router: Router,
      private route: ActivatedRoute
      ) {
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
