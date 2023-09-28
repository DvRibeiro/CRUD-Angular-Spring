import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

//serviço responsável por fornecer dados relacionados aos cursos.
//chamadas http, comunicação backend.
export class ProductsService {


  private readonly API = 'api/products'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Product[]>(this.API)
    .pipe(
      first(),
      //delay(750),
      tap(product => console.log(product))
    )
  }

  save(record: Partial<Product>) {
    return this.httpClient.post<Product>(this.API, record).pipe(first());
  }
}
