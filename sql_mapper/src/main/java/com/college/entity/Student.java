package com.college.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;
    
    private String name;
    private Integer age;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    

    
    @ManyToMany
    @JoinTable(
        name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses;
    
}
