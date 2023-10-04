import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {


  private readonly API = 'api/products'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Product[]>(this.API)
    .pipe(
      first(),
      //delay(750),
    )
  }

  loadById(id: string){
    return this.httpClient.get<Product>(`${this.API}/${id}`)
  }

  save(record: Partial<Product>) {
    if(record._id){
      return this.update(record);
    }    return this.create(record);
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
