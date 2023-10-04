import { Client } from '../model/clients';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ClientsService {


  private readonly API = 'api/clients'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Client[]>(this.API)
    .pipe(
      first(),
      //delay(750),
    )
  }

  loadById(id: string){
    return this.httpClient.get<Client>(`${this.API}/${id}`)
  }

  save(record: Partial<Client>) {
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Client>){
    return this.httpClient.post<Client>(this.API, record).pipe(first());
  }

  private update(record: Partial<Client>){
    return this.httpClient.put<Client>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete<Client>(`${this.API}/${id}`).pipe(first());
  }
}
