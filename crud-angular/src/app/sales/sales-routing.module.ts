import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaleFormComponent } from './sale-form/sale-form.component';
import { SalesComponent } from './sales-components/sales.component';
import { saleResolver } from './guards/sale.resolver';

const routes: Routes = [
  { path: '',
  component: SalesComponent
  },
  { path: 'new',
  component: SaleFormComponent, resolve: { sale: saleResolver}
  },
  { path: 'edit/:id',
  component: SaleFormComponent, resolve: { sale: saleResolver}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
