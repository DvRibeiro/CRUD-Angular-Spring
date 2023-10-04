import { ProductsService } from './../services/products.service';
import { Product } from './../model/product';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/clients/model/clients';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products$: Observable<Product[]> | null = null;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
    ) {
      this.refresh();
      }

  refresh(){
    this.products$ = this.productsService.findAll()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os produtos.')
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

  onEdit(product: Product) {
    this.router.navigate(['edit', product._id], {relativeTo: this.route});
  }

  onRemove(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.productsService.remove(product._id).subscribe(
          () => {
            this.refresh();
            this.snackbar.open('Produto removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => {
            this.onError('Erro ao tentar remover Produto.')
            this.snackbar.open('Produto associado com venda', 'X', {
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
    this.router.navigate(['sales'])
  }

  onClickClientes() {
    this.router.navigate(['clients'])
  }

  onClickProdutos() {
    this.router.navigate(['products'])
  }
}
