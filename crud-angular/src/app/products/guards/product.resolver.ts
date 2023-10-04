import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';



export const productResolver: ResolveFn<Observable<Product>> =
  (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  service: ProductsService = inject(ProductsService)
  ) => {

  if (route.params?.['id']){
    return of(service.loadById(route.params['id']));
  }
  return of({_id: '', name: '', description: '', price: 0.00});
};
