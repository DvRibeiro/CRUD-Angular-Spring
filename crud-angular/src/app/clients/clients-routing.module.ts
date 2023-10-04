
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { clientResolver } from './guards/client.resolver';

const routes: Routes = [
  { path: '',
  component: ClientsComponent
  },
  { path: 'new',
  component: ClientsFormComponent, resolve: { client: clientResolver}
  },
  { path: 'edit/:id',
  component: ClientsFormComponent, resolve: { client: clientResolver}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
