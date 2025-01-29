package com.college.entity;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer departmentId;
    
    private String departmentName;
    
    @OneToOne(mappedBy = "department")
    private Professor professor;
}
