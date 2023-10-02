
import { Location } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { NonNullableFormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit{

  form = this.formBuilder.group({
    name: ['', [Validators.required, this.nonEmptyStringValidator]],
    description: ['', [Validators.required, this.nonEmptyStringValidator]],
    price: [undefined,[Validators.required, this.nonEmptyStringValidator, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
  });

  nonEmptyStringValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.trim() === '') {
      return { nonEmptyString: true };
    }
    return null;
  }

  constructor(private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProductsService,
    private snackBar: MatSnackBar,
    private location: Location,
    //private currencyPipe: CurrencyPipe,
    ){
  }

  ngOnInit(): void {
    //nothing atm
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: (result) => this.onSuccess(),
        error: (error) => this.onError(),
      });
    }   /*
        TODO else if(this.form.value.price){
        this.snackBar.open("Por favor, preencha o campo preço somente com números.", "Fechar", {duration: 4500});
        */
      else {
      this.snackBar.open("Por favor, preencha todos os campos obrigatórios corretamente.", "Fechar", {duration: 4500});
    }
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open("Cliente cadastrado com sucesso.", "Fechar", {duration: 4500});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open("Erro ao cadastrar Cliente.", "Fechar", {duration: 4500})
  }
}
