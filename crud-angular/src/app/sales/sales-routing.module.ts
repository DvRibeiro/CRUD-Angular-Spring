import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaleFormComponent } from './sale-form/sale-form.component';
import { SalesComponent } from './sales-components/sales.component';

const routes: Routes = [
  { path: '', component: SalesComponent },
  { path: 'new', component: SaleFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
