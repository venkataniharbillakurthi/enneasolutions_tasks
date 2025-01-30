package com.college.controller;

import com.college.dto.StudentDTO;
import com.college.dto.DepartmentDTO;
import com.college.service.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/college")
@RequiredArgsConstructor
public class CollegeController {
    private final CollegeService collegeService;
    
    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> getAllStudentsWithDepartments() {
        return ResponseEntity.ok(collegeService.getAllStudentsWithDepartments());
    }
    
    @GetMapping("/students/department/{departmentName}")
    public ResponseEntity<List<StudentDTO>> getStudentsByDepartment(@PathVariable String departmentName) {
        return ResponseEntity.ok(collegeService.getStudentsByDepartment(departmentName));
    }
    
    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentDTO>> getAllDepartmentsWithProfessors() {
        return ResponseEntity.ok(collegeService.getAllDepartmentsWithProfessors());
    }

    @PostMapping("/students")
    public ResponseEntity<Object> addStudent(@RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(collegeService.addStudent(studentDTO));
    }
    
    @PutMapping("/students/{studentId}")
    public ResponseEntity<String> updateStudent(@PathVariable Integer studentId, @RequestBody StudentDTO studentDTO) {
        collegeService.updateStudent(studentId, studentDTO);
        return ResponseEntity.ok("Student updated successfully");
    }
}

    

     

