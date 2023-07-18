import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


//imports services
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form = this.formBuilder.group({
    name: [''],
    category: [''],
    price: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location ){
    //this.form
  }

  ngOnInit(): void {
      //nothing atm
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

  private onSuccess(){
    this.snackBar.open("Curso salvo com sucesso.", "Fechar", {duration: 4500});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open("Erro ao salvar Curso.", "Fechar", {duration: 4500})
  }
}
