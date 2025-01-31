package com.college.dto;

import java.util.Set;

import com.college.entity.Course;

import lombok.Data;

@Data
public class StudentDTO {
    
    private Integer studentId;
    private String name;
    private Integer age;
    private Integer departmentId;
    private Set<Course> courses;

    
   
}
