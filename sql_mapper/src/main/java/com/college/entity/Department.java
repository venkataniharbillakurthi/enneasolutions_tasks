package com.college.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "departments")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer departmentId;
    
    private String departmentName;
    
    @OneToOne(mappedBy = "department" )
    private Professor professor;
    
}
