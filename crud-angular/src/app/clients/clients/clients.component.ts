
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../model/clients';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {

  clients$: Observable<Client[]>;
  displayedColumns: string[] = ['name', 'email', 'date', 'actions'];

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    ) {this.clients$ = this.clientsService.findAll()
      .pipe(

      ); }

  onClickVendas() {
    this.router.navigate(['sales']);
  }

  onClickClientes() {
    this.router.navigate(['clients'])
  }

  onClickProdutos() {
    this.router.navigate(['products'])
  }

}
