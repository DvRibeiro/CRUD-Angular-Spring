import { Component, Input } from '@angular/core';
import { Client } from '../model/clients';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {

  @Input() clients: Client[] = [];
  readonly displayedColumns = ['name', 'email', 'date', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
