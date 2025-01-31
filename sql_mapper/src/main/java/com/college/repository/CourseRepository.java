package com.college.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.college.dto.CourseEnrollmentDTO;
import com.college.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>{
    
    
   @Query("SELECT new com.college.dto.CourseEnrollmentDTO(c.courseName, COUNT(s.studentId)) " +
          "FROM Student s JOIN s.courses c " +
          "GROUP BY c.courseName")
   List<CourseEnrollmentDTO> findCourseEnrollments(); 

    @Query("SELECT new com.college.dto.CourseEnrollmentDTO(c.courseName, COUNT(s.studentId)) " +
           "FROM Student s JOIN s.courses c " +
           "WHERE c.courseName = :courseName GROUP BY c.courseName")
    CourseEnrollmentDTO findCourseEnrollmentByCourseName(@Param("courseName") String courseName);

    boolean existsByCourseName(String courseName);
    Course findCourseByCourseName(String courseName);
}