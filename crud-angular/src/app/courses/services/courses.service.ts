import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { first, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//serviço responsável por fornecer dados relacionados aos cursos.
//chamadas http, comunicação backend.
export class CoursesService {

  private readonly API = 'api/courses'

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      //delay(750),
      tap(courses => console.log(courses))
    )
  }

  save(record: Course) {
    return this.httpClient.post<Course>(this.API, record);
  }
}
