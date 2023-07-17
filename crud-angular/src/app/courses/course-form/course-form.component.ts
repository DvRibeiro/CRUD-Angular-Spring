import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit{

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
    this.router.navigate([''], {relativeTo: this.route});
  }



  onCancel(){
    this.router.navigate([''], {relativeTo: this.route});
  }

}
