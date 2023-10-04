import { Client } from './../model/clients';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsService } from '../services/clients.service';



export const clientResolver: ResolveFn<Observable<Client>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,  service: ClientsService = inject(ClientsService)) => {

  if (route.params?.['id']){
    return of(service.loadById(route.params['id']));
  }
  return of({_id: '', name: '', email: '', birthDate: ''});
};
