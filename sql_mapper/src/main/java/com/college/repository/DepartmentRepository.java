package com.college.repository;

import com.college.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    @Query("SELECT d FROM Department d LEFT JOIN FETCH d.professor")
    List<Department> findAllWithProfessors();
}
