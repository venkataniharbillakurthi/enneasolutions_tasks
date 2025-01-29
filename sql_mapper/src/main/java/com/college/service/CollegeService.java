package com.college.service;

import com.college.dto.StudentDTO;
import com.college.dto.DepartmentDTO;
import com.college.mapper.CollegeMapper;
import com.college.repository.StudentRepository;
import com.college.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CollegeService {
    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;
    private final CollegeMapper collegeMapper;
    
    public List<StudentDTO> getAllStudentsWithDepartments() {
        log.debug("Fetching all students with their departments");
        return studentRepository.findAllWithDepartment()
                .stream()
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

   
}
