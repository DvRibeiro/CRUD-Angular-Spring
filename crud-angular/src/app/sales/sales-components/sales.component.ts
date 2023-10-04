import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Sale } from '../model/sales';
import { SalesService } from '../services/sales.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})

export class SalesComponent implements OnInit {

  sales$: Observable<Sale[]>;
  displayedColumns = ['client', 'product', 'actions'];

  constructor(
    private salesService: SalesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
    )
    {
    this.sales$ = this.salesService.findAll()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar as vendas.')
        return of([])
      })
    );
  }

  ngOnInit(): void {
    // no need atm

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(sale: Sale) {
    this.router.navigate(['edit', sale._id], {relativeTo: this.route});
  }

  onClickVendas() {
    this.router.navigate([''], {relativeTo: this.route})
  }

  onClickClientes() {
    this.router.navigate(['clients'])
  }

  onClickProdutos() {
    this.router.navigate(['products'])
  }
}
