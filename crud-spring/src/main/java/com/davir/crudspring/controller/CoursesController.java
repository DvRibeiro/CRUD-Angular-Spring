package com.davir.crudspring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.davir.crudspring.model.Course;
import com.davir.crudspring.repository.CourseRepository;

@RestController
@RequestMapping("/api/courses")
public class CoursesController {

    private final CourseRepository courseRepository;

    

    public CoursesController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }



    //primeiro método 'GET'
    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }

    
}
