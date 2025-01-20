package com.sjprogramming.restapi.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sjprogramming.restapi.entity.Student;
import com.sjprogramming.restapi.respository.StudentRespository;

@RestController
public class StudentControler {

    @Autowired
    private StudentRespository repo;


    // GET: localhost:8080/students
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

 
    // GET: localhost:8080/students/{id}
    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {
        Optional<Student> student = repo.findById(id);
        
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get()); // Return 200 OK with the student data
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if student not found
        }
    }


    // POST: localhost:8080/students/add
    @PostMapping("/students/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createStudent(@RequestBody Student student) {
        repo.save(student);
    }

 
    // PUT: localhost:8080/students/update/{id}
    @PutMapping("/students/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
        Optional<Student> existingStudent = repo.findById(id);

        if (existingStudent.isPresent()) {
            Student student = existingStudent.get();
            // Update the student's details
            student.setName(updatedStudent.getName());
            student.setPercentage(updatedStudent.getPercentage());
            student.setBranch(updatedStudent.getBranch());

            // Save the updated student back to the repository
            repo.save(student);
            return ResponseEntity.ok(student); // Return 200 OK with the updated student
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if student not found
        }
    }

    
    @DeleteMapping("/student/delete/{id}")
	public void removeStudent(@PathVariable int id) {
		Student student = repo.findById(id).get();
		repo.delete(student);
	}
    
}
