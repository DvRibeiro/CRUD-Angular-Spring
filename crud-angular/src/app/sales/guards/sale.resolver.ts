import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sale } from '../model/sales';
import { SalesService } from '../services/sales.service';
import { Client } from 'src/app/clients/model/clients';
import { Product } from 'src/app/products/model/product';


export const saleResolver: ResolveFn<Observable<Sale>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,  service: SalesService = inject(SalesService)) => {

  if (route.params?.['id']){
    return of(service.loadById(route.params['id']));
  }
  return of({_id: '', client: {} as Client, product: {} as Product});
};
