import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Sale } from '../model/sales';
import { Observable, first, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//serviço responsável por fornecer dados relacionados aos cursos.
//chamadas http, comunicação backend.
export class SalesService {

  private readonly API = 'api/sales'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Sale[]>(this.API)
    .pipe(
      first(),
    )
  }

  loadById(id: string): Observable<Sale>{
    return this.httpClient.get<Sale>(`${this.API}/${id}`);
  }

  save(record: Partial<Sale>) {
    console.log(record)
    if(record._id){
      console.log('update')

      return this.update(record);
    }
    console.log('create')
    return this.create(record);
  }

  private create(record: Partial<Sale>){
    return this.httpClient.post<Sale>(this.API, record).pipe(first());
  }

  private update(record: Partial<Sale>){
    return this.httpClient.put<Sale>(`${this.API}/${record._id}`, record).pipe(first());
  }
}
