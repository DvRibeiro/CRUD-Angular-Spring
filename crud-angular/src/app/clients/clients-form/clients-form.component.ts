
import { ClientsService } from 'src/app/clients/services/clients.service';
import { Location, formatDate } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { NonNullableFormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { Client } from '../model/clients';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit{

  form!: FormGroup;

  ClientsService: any;
  client: any;

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
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    ){
  }

  formatDate(){
    const dateBirthValue = this.form.value.birthDate;
    if (dateBirthValue) {
      const birthDate = new Date(dateBirthValue);
      const formattedDate = format(birthDate, 'dd/MM/yyyy');
      this.form.patchValue({ birthDate: formattedDate });
    }
  }

  ngOnInit() {
    const clientId = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      _id: [clientId],
      name: ['', [Validators.required, this.nonEmptyStringValidator]],
      email: ['', [Validators.required, Validators.email, this.nonEmptyStringValidator]],
      birthDate: ['', [Validators.required, this.nonEmptyStringValidator]],
    });

    if (clientId) {
      this.service.loadById(clientId).subscribe((data: any) => {
        this.client = data;
        this.patchFormWithClientData();
      });
    }
  }


  private patchFormWithClientData() {
    if (this.client) {
      const formatado = this.client.birthDate.split('/').reverse().join('-');
      this.form.patchValue({
        name: this.client.name,
        email: this.client.email,
        birthDate: formatado,
      });
    }
  }


  onSubmit() {
    if (!this.form.valid) {
      this.snackBar.open("Por favor, preencha todos os campos obrigatórios.", "Fechar", {duration: 4500});
    } else {
      this.formatDate();
      this.service.save(this.form.value).subscribe({
        next: (result) => this.onSuccess(),
        error: (error) => this.onError(),
      });
    }
    if(this.form.value.email){
      this.snackBar.open("Insira um email válido.", "Fechar", { duration: 4500 });
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
