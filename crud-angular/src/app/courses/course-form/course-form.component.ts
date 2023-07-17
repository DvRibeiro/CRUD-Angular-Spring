import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: CoursesService,
    private snackBar: MatSnackBar
    ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
      price: [null]
    });
  }

  ngOnInit(): void {
      //nothing atm
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => console.log(result), error => this.onError());
  }

  onCancel(){
    this.router.navigate([''], {relativeTo: this.route});
  }

  onError(){
    this.snackBar.open("Erro ao salvar Curso.", "Fechar", {duration: 4500})
  }
}
