package com.college.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.persistence.*;
import java.util.Set;


@Data
@Entity
@Table(name = "students")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer studentId;
    
    private String name;
    private Integer age;
    
    @ManyToOne
    @JoinColumn(name = "departmentId")
    private Department department;
    

    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "student_courses",
        joinColumns = @JoinColumn(name = "studentId"),
        inverseJoinColumns = @JoinColumn(name = "courseId")
    )
    private Set<Course> courses;
    
}
