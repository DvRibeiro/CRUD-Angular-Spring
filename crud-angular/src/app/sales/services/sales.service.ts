import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Sale } from '../model/sales';
import { first, tap } from 'rxjs';


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
      tap(sale => console.log(sale))
    )
  }

  save(record: Partial<Sale>) {
    return this.httpClient.post<Sale>(this.API, record).pipe(first());
  }
}
