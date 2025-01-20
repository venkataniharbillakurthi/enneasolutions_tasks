package com.sjprogramming.restapi.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sjprogramming.restapi.entity.Student;

public interface StudentRespository extends JpaRepository<Student, Integer>{

}
