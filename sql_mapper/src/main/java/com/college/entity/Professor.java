package com.college.entity;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "professors")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer professorId;
    
    private String name;
    
    @OneToOne
    @JoinColumn(name = "department_id")
    private Department department;
    
}
