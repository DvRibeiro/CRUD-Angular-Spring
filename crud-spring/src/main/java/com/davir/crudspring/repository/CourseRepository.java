package com.davir.crudspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
//método findAll() incluso no JpaRepository

import com.davir.crudspring.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long >{

}
