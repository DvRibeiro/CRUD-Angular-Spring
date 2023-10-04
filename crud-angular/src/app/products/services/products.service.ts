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

  loadById(id: string){
    return this.httpClient.get<Product>(`${this.API}/${id}`)
  }

  save(record: Partial<Product>) {
    console.log('id: ',record._id)
    if(record._id){
      console.log('update')

      return this.update(record);
    }
    console.log('create')
    return this.create(record);
  }

  private create(record: Partial<Product>){
    return this.httpClient.post<Product>(this.API, record).pipe(first());
  }

  private update(record: Partial<Product>){
    return this.httpClient.put<Product>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete<Product>(`${this.API}/${id}`).pipe(first());
  }
}
