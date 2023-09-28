import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsFormComponent } from './clients-form/clients-form.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsListComponent,
    ClientsFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule
  ]
})
export class ClientsModule { }
