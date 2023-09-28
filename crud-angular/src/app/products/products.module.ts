import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsFormComponent } from './products-form/products-form.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AppMaterialModule
  ]
})
export class ProductsModule { }
