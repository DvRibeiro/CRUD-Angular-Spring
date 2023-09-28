import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from '../services/sales.service';
import { Client } from 'src/app/clients/model/clients';
import { Product } from 'src/app/products/model/product';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit{

  form: FormGroup;
  clients: Client[] = []; // Altere o tipo para Client[]
  products: Product[] = []; // Altere o tipo para Product[]
  hasClients: boolean = true; // Adicione um atributo para verificar se há clientes cadastrados
  hasProducts: boolean = true; // Adicione um atributo para verificar se há produtos cadastrados

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: SalesService,
    private snackBar: MatSnackBar,
    private clientsService: ClientsService, // Renomeie para clientService
    private productsService: ProductsService, // Adicione o serviço de produtos
    private location: Location ){
      this.form = this.formBuilder.group({
        client: [''],
        product: ['']
      });
  }

  ngOnInit(): void {
    this.getClients();
    this.getProducts();
    }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe({
      next: result => this.onSuccess(),
      error: error => this.onError()
    });
  }

  onCancel(){
    this.location.back();
  }

  private getClients() {
    this.clientsService.findAll() // Corrija para findAll()
      .subscribe((clients: Client[]) => {
        this.clients = clients;
        this.hasClients = clients.length > 0; // Define se há clientes cadastrados
      });
  }

  private getProducts() {
    this.productsService.findAll() // Chame o método findAll para obter produtos
      .subscribe((products: Product[]) => {
        this.products = products;
        this.hasProducts = products.length > 0; // Define se há produtos cadastrados

      });
  }

  private onSuccess(){
    this.snackBar.open("Venda criada com sucesso.", "Fechar", {duration: 4500});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open("Erro ao criar Venda.", "Fechar", {duration: 4500})
  }
}
