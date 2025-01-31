package com.college.controller;

import com.college.dto.StudentDTO;
import com.college.dto.DepartmentDTO;
import com.college.service.CollegeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.college.dto.CourseDTO;
import com.college.dto.CourseEnrollmentDTO;
import com.college.repository.StudentRepository;

@RestController
@RequestMapping("/api/college")
@RequiredArgsConstructor
public class CollegeController {
    private final CollegeService collegeService;
    private final StudentRepository studentRepository;
    
    @GetMapping("/students")
     public ResponseEntity<List<StudentDTO>> getAllStudentsWithDepartments(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    List<StudentDTO> students = collegeService.getAllStudentsWithDepartments(page, size);
    long totalStudents = studentRepository.count(); 
    long totalPages = (totalStudents + size - 1) / size; 

    return ResponseEntity.ok()
            .header("x-total-pages", String.valueOf(totalPages)) 
            .header("x-total-count", String.valueOf(totalStudents))
            .body(students);
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

    @GetMapping("/courses")
    public ResponseEntity<List<CourseDTO>> getCourseDetails() {
        return ResponseEntity.ok(collegeService.getCourseDetails());
    }
    @GetMapping("/courses/enrollment")
    public ResponseEntity<List<CourseEnrollmentDTO>> getCourseEnrollment() {
        return ResponseEntity.ok(collegeService.findCourseEnrollments());
    }
    
    @GetMapping("/enrollment/{courseName}")
    public ResponseEntity<CourseEnrollmentDTO> getCourseEnrollment(@PathVariable String courseName) {
        CourseEnrollmentDTO enrollment = collegeService.findCourseEnrollmentByCourseName(courseName);
        return ResponseEntity.ok(enrollment);
    }

    @DeleteMapping("/courses/{courseName}")
    public ResponseEntity<String> deleteCourseEnrollment(@PathVariable String courseName) {
        collegeService.deleteCourse(courseName);
        return ResponseEntity.ok("Course enrollment deleted successfully");
    }
    
}

    

     
