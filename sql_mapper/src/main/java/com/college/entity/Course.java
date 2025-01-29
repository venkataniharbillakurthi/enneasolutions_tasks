package com.college.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;
    
    private String courseName;
    private Integer credits;
    
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students;
    
}
