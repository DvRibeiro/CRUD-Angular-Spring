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

  loadById(id: string){
    return this.httpClient.get<Client>(`${this.API}/${id}`)
  }

  save(record: Partial<Client>) {
    console.log('id: ',record._id)
    if(record._id){
      console.log('update')

      return this.update(record);
    }
    console.log('create')
    return this.create(record);
  }

  private create(record: Partial<Client>){
    return this.httpClient.post<Client>(this.API, record).pipe(first());
  }

  private update(record: Partial<Client>){
    return this.httpClient.put<Client>(`${this.API}/${record._id}`, record).pipe(first());
  }
}
