package com.college.service;

import com.college.dto.StudentDTO;
import com.college.entity.Course;
import com.college.entity.Student;
import com.college.dto.DepartmentDTO;
import com.college.dto.CourseDTO;
import com.college.dto.CourseEnrollmentDTO;
import com.college.mapper.CollegeMapper;
import com.college.repository.StudentRepository;
import com.college.repository.DepartmentRepository;
import com.college.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Slf4j
@Service
@RequiredArgsConstructor
public class CollegeService {
    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;
    private final CollegeMapper collegeMapper;
    private static final Logger logger = LoggerFactory.getLogger(CollegeService.class);
    
    
    
    
    public List<StudentDTO> getAllStudentsWithDepartments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findAll(pageable);
        return studentPage.getContent().stream()
                .map(collegeMapper::studentToStudentDTO)
                .collect(Collectors.toList());
    }
    
    public List<StudentDTO> getStudentsByDepartment(String departmentName) {
        log.debug("Fetching students for department: {}", departmentName);
        return studentRepository.findByDepartmentName(departmentName)
                .stream()
                .map(collegeMapper::studentToStudentDTO)
                .collect(Collectors.toList());
    }
    
    public List<DepartmentDTO> getAllDepartmentsWithProfessors() {
        log.debug("Fetching all departments with their professors");
        return departmentRepository.findAllWithProfessors()
                .stream()
                .map(collegeMapper::departmentToDepartmentDTO)
                .collect(Collectors.toList());
    }

    public Object addStudent(StudentDTO studentDTO) {
        return studentRepository.save(collegeMapper.studentDTOToStudent(studentDTO));
    }
    
    public void updateStudent(Integer studentId, StudentDTO studentDTO) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setName(studentDTO.getName());
        student.setAge(studentDTO.getAge());
        student.setDepartment(collegeMapper.departmentDTOToDepartment(studentDTO.getDepartmentId()));
        studentRepository.save(student);
    }
    
    public List<CourseDTO> getCourseDetails() {
        log.debug("Fetching all course details");
        return courseRepository.findAll().stream()
                .map(collegeMapper::courseToCourseDTO)
                .collect(Collectors.toList());
    }
    
    public List<CourseEnrollmentDTO> findCourseEnrollments() {
        logger.info("Fetching course enrollments");
        List<CourseEnrollmentDTO> enrollments = courseRepository.findCourseEnrollments();
        logger.info("Fetched {} enrollments", enrollments.size());
        return enrollments;
    }
    
    public CourseEnrollmentDTO findCourseEnrollmentByCourseName(String courseName) {
        return courseRepository.findCourseEnrollmentByCourseName(courseName);
    }
    
    public void enrollStudentInCourse(String courseName) {
        Course course = courseRepository.findCourseByCourseName(courseName);
        if (course == null) {
            throw new RuntimeException("Course not found: " + courseName);
        }
        course.setStudentCount(course.getStudentCount() + 1);
        courseRepository.save(course);
    }
    
    public void deleteCourse(String courseName) {
        Course course = courseRepository.findCourseByCourseName(courseName);
        if (course == null) {
            throw new RuntimeException("Course not found: " + courseName);
        }
    
        Set<Student> students = course.getStudents();
        for (Student student : students) {
            student.getCourses().remove(course);
            studentRepository.save(student); 
        }
    

        course.getStudents().clear();
        course.setStudentCount(0L); 
        courseRepository.save(course);
    
        log.info("All students removed from the course: {}", courseName);
    }
    
   
    
}