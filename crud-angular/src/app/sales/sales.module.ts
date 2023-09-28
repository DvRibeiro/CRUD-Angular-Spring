import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { SalesComponent } from './sales-components/sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';

@NgModule({
  declarations: [
    SalesComponent,
    SaleFormComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SalesModule { }
