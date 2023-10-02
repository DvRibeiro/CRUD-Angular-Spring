
import { Location } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { NonNullableFormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    name: ['', [Validators.required, this.nonEmptyStringValidator]],
    email: ['', [Validators.required, Validators.email, this.nonEmptyStringValidator]],
    birthDate: ['', [Validators.required, this.nonEmptyStringValidator]],
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
  ngOnInit(): void {
    //nothing atm
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value.birthDate)
      this.formatDate();
      console.log(this.form.value)
      this.service.save(this.form.value).subscribe({
        next: (result) => this.onSuccess(),
        error: (error) => this.onError(),
      });
    } else if (this.form.value.email){
      this.snackBar.open("Por favor, informe um email válido.", "Fechar", {duration: 4500});
    } else {
      this.snackBar.open("Por favor, preencha todos os campos obrigatórios.", "Fechar", {duration: 4500});
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
