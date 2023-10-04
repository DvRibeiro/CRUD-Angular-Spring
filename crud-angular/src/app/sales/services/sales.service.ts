import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Sale } from '../model/sales';
import { Observable, first, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


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
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Sale>){
    return this.httpClient.post<Sale>(this.API, record).pipe(first());
  }

  private update(record: Partial<Sale>){
    return this.httpClient.put<Sale>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete<Sale>(`${this.API}/${id}`).pipe(first());
  }
}
