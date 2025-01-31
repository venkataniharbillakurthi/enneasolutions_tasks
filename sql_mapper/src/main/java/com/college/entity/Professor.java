package com.college.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "professors")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer professorId;
    
    private String name;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "departmentId" )
    private Department department;
    
}
