import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { productResolver } from './guards/product.resolver';

const routes: Routes = [
  { path: '',
  component:  ProductsComponent
  },
  { path: 'new',
  component: ProductsFormComponent, resolve: { product: productResolver}
  },
  { path: 'edit/:id',
  component: ProductsFormComponent, resolve: { product: productResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
