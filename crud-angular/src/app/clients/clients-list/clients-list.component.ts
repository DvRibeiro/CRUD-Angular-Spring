import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../model/clients';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {

  @Input() clients: Client[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);


  readonly displayedColumns = ['name', 'email', 'date', 'actions'];

  constructor() { }

  onAdd() {
    this.add.emit(true)
  }

  onEdit(client: Client) {
    this.edit.emit(client)
  }
}
