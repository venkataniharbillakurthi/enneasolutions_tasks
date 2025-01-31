package com.college.mapper;

import com.college.dto.DepartmentDTO;
import com.college.dto.StudentDTO;
import com.college.entity.Department;
import com.college.entity.Professor;
import com.college.entity.Student;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
<<<<<<< HEAD
    date = "2025-01-31T12:55:06+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.14 (Oracle Corporation)"
=======
    date = "2025-01-29T23:11:18+0530",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Eclipse Adoptium)"
>>>>>>> 3e3d6e3 (Updates on Sql_Mapper_Project)
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
<<<<<<< HEAD
        studentDTO.setStudentId( student.getStudentId() );
        studentDTO.setName( student.getName() );
        studentDTO.setAge( student.getAge() );
=======
        studentDTO.setAge( student.getAge() );
        studentDTO.setName( student.getName() );
        studentDTO.setStudentId( student.getStudentId() );
>>>>>>> 3e3d6e3 (Updates on Sql_Mapper_Project)

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
<<<<<<< HEAD
        student.setName( studentDTO.getName() );
        student.setAge( studentDTO.getAge() );
=======
        student.setAge( studentDTO.getAge() );
        student.setName( studentDTO.getName() );
>>>>>>> 3e3d6e3 (Updates on Sql_Mapper_Project)

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
