package com.college.dto;


public class CourseEnrollmentDTO {
    private String courseName;
    private long studentCount; 
  
   

    
    public CourseEnrollmentDTO(String courseName, long studentCount) {
        this.courseName = courseName;
        this.studentCount = studentCount;
       
    }

   

    
    public long getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(long studentCount) {
        this.studentCount = studentCount;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }


   

    
}