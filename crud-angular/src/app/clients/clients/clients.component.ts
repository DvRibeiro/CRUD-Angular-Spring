
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../model/clients';
import { Observable, catchError, of } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {

  clients$: Observable<Client[]> | null = null;
  displayedColumns: string[] = ['name', 'email', 'date', 'actions'];

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
    ) {
        this.refresh();
      }

  refresh(){
    this.clients$ = this.clientsService.findAll()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os clientes.')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(client: Client) {
    this.router.navigate(['edit', client._id], {relativeTo: this.route});
  }


  onRemove(client: Client) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.clientsService.remove(client._id).subscribe(
          () => {
            this.refresh();
            this.snackbar.open('Cliente removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => {
            this.onError('Erro ao tentar remover Cliente.')
            this.snackbar.open('Cliente associado com venda', 'X', {
              duration: 5000,
              horizontalPosition: 'center',
              panelClass: ['red-snackbar'],
            });
          }
        );
      }
    });
  }

  onClickVendas() {
    this.router.navigate(['sales']);
  }

  onClickClientes() {
    this.router.navigate(['clients'])
  }

  onClickProdutos() {
    this.router.navigate(['products'])
  }

}
