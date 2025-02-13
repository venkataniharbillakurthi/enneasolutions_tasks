package com.college.repository;

import com.college.entity.Student;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s JOIN FETCH s.department")
    Page<Student> findAllWithDepartment(Pageable pageable);
    
    @Query("SELECT s FROM Student s JOIN FETCH s.department d WHERE d.departmentName = :departmentName")
    List<Student> findByDepartmentName(String departmentName);
}
