import { Location } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { format } from 'date-fns';



@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit{

  form = this.formBuilder.group({
    name: [''],
    email: [''],
    dateBirth: ['']
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    ){
    //this.form
  }

  ngOnInit(): void {
    //nothing atm
  }

  onSubmit() {
    const dateBirthValue = this.form.value.dateBirth;
    // Verifica se o campo dateBirth tem um valor válido
    if (dateBirthValue) {
      // Converte o valor do campo dateBirth para um objeto do tipo Date
      const dateBirth = new Date(dateBirthValue);

      // Formata a data antes de enviar para o serviço
      const formattedDate = format(dateBirth, 'MM/dd/yyyy');

      console.log(formattedDate); // Exibe a data formatada no console

      // Atualiza o valor do campo dateBirth com a data formatada
      this.form.patchValue({ dateBirth: formattedDate });

      console.log(dateBirth); // Exibe a data formatada no console
    }

    // Envia os dados para o serviço
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: (error) => this.onError(),
    });
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
