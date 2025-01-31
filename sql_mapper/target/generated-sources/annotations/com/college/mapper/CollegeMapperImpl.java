package com.college.mapper;

import com.college.dto.CourseDTO;
import com.college.dto.DepartmentDTO;
import com.college.dto.StudentDTO;
import com.college.entity.Course;
import com.college.entity.Department;
import com.college.entity.Professor;
import com.college.entity.Student;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-01-31T14:50:34+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.14 (Oracle Corporation)"
)
@Component
public class CollegeMapperImpl implements CollegeMapper {

    @Override
    public StudentDTO studentToStudentDTO(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentDTO studentDTO = new StudentDTO();

        studentDTO.setDepartmentId( studentDepartmentDepartmentId( student ) );
        studentDTO.setStudentId( student.getStudentId() );
        studentDTO.setName( student.getName() );
        studentDTO.setAge( student.getAge() );

        return studentDTO;
    }

    @Override
    public DepartmentDTO departmentToDepartmentDTO(Department department) {
        if ( department == null ) {
            return null;
        }

        DepartmentDTO departmentDTO = new DepartmentDTO();

        departmentDTO.setProfessorName( departmentProfessorName( department ) );
        departmentDTO.setDepartmentId( department.getDepartmentId() );
        departmentDTO.setDepartmentName( department.getDepartmentName() );

        return departmentDTO;
    }

    @Override
    public Student studentDTOToStudent(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        Student student = new Student();

        student.setDepartment( studentDTOToDepartment( studentDTO ) );
        student.setName( studentDTO.getName() );
        student.setAge( studentDTO.getAge() );

        return student;
    }

    @Override
    public Department departmentDTOToDepartment(Integer departmentId) {
        if ( departmentId == null ) {
            return null;
        }

        Department department = new Department();

        department.setDepartmentId( departmentId );

        return department;
    }

    @Override
    public CourseDTO courseToCourseDTO(Course course) {
        if ( course == null ) {
            return null;
        }

        CourseDTO courseDTO = new CourseDTO();

        if ( course.getCourseId() != null ) {
            courseDTO.setCourseId( course.getCourseId().longValue() );
        }
        courseDTO.setCourseName( course.getCourseName() );
        if ( course.getCredits() != null ) {
            courseDTO.setCredits( String.valueOf( course.getCredits() ) );
        }

        return courseDTO;
    }

    private Integer studentDepartmentDepartmentId(Student student) {
        if ( student == null ) {
            return null;
        }
        Department department = student.getDepartment();
        if ( department == null ) {
            return null;
        }
        Integer departmentId = department.getDepartmentId();
        if ( departmentId == null ) {
            return null;
        }
        return departmentId;
    }

    private String departmentProfessorName(Department department) {
        if ( department == null ) {
            return null;
        }
        Professor professor = department.getProfessor();
        if ( professor == null ) {
            return null;
        }
        String name = professor.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    protected Department studentDTOToDepartment(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        Department department = new Department();

        department.setDepartmentId( studentDTO.getDepartmentId() );

        return department;
    }
}
