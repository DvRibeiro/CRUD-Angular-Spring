import { SalesService } from './../services/sales.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/clients/model/clients';
import { Product } from 'src/app/products/model/product';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { ProductsService } from 'src/app/products/services/products.service';
import { Sale } from '../model/sales';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit{

  form!: FormGroup;
  clients: Client[] = []; // Altere o tipo para Client[]
  products: Product[] = []; // Altere o tipo para Product[]
  hasClients: boolean = true; // Adicione um atributo para verificar se há clientes cadastrados
  hasProducts: boolean = true; // Adicione um atributo para verificar se há produtos cadastrados
  sale: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: SalesService,
    private snackBar: MatSnackBar,
    private clientsService: ClientsService, // Renomeie para clientService
    private productsService: ProductsService, // Adicione o serviço de produtos
    private location: Location,
    private salesService: SalesService
    )

    {

    }

    ngOnInit() {
      const saleId = this.route.snapshot.params['id'];

      this.form = this.formBuilder.group({
        _id: [saleId],
        client: [],
        product: [[]]
      });

      if (saleId) {
        this.salesService.loadById(saleId).subscribe((data) => {
          this.sale = data;
          this.patchFormWithSaleData();
        });
      } else {
        // Creating a new sale
        this.form = this.formBuilder.group({
          client: [],
          product: [[]]
        });
      }
      this.getClients();
      this.getProducts();
    }

    private patchFormWithSaleData() {
      if (this.sale) {
        this.form.patchValue({
          client:  this.sale.client._id,
          product: this.sale.products.map((product: { _id: any; }) => product._id),
        });
      }
    }


    onSubmit() {
      const selectedClientId = this.form.value.client;
      const selectedProductIds = this.form.value.product;

      if (!selectedClientId) {
        this.snackBar.open("Selecione um cliente antes de criar a venda.", "Fechar", { duration: 4500 });
        return;
      }

      if (selectedProductIds && selectedProductIds.length > 0) {
        const selectedClient = this.clients.find(client => client._id === selectedClientId);
        const selectedProducts = this.products.filter(product => selectedProductIds.includes(product._id));
        const saleId = this.route.snapshot.params['id'];

        const saleData = {
          _id: saleId,
          client: selectedClient,
          products: selectedProducts
        };
            this.service.save(saleData)
            .subscribe({
              next: result => this.onSuccess(),
             error: error => this.onError()
            });
       } else {
        this.snackBar.open("Selecione ao menos um produto antes de criar a venda.", "Fechar", {duration: 4500})
      }
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
