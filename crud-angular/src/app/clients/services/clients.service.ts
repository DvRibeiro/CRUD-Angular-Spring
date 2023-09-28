import { Client } from '../model/clients';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//serviço responsável por fornecer dados relacionados aos cursos.
//chamadas http, comunicação backend.
export class ClientsService {


  private readonly API = 'api/clients'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Client[]>(this.API)
    .pipe(
      first(),
      //delay(750),
      tap(client => console.log(client))
    )
  }

  save(record: Partial<Client>) {
    return this.httpClient.post<Client>(this.API, record).pipe(first());
  }
}
