package com.college.mapper;

import com.college.dto.StudentDTO;
import com.college.dto.DepartmentDTO;
import com.college.entity.Student;
import com.college.entity.Department;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.college.dto.CourseDTO;
import com.college.entity.Course;

@Mapper(componentModel = "spring")
public interface CollegeMapper {
    CollegeMapper INSTANCE = Mappers.getMapper(CollegeMapper.class);
    
    @Mapping(source = "department.departmentId", target = "departmentId")
    StudentDTO studentToStudentDTO(Student student);
    
    @Mapping(source = "professor.name", target = "professorName")
    DepartmentDTO departmentToDepartmentDTO(Department department);
    
    @Mapping(target = "studentId", ignore = true)
    @Mapping(target = "courses", ignore = true)
    @Mapping(source = "departmentId", target = "department.departmentId")
    Student studentDTOToStudent(StudentDTO studentDTO);

    Department departmentDTOToDepartment(Integer departmentId);
    
    CourseDTO courseToCourseDTO(Course course);
        
    

    
    
    
    

}
