# College Management System

## Tables:

### students: Stores information about students.
### courses: Stores information about courses.
### departments: Stores department details.
### professors: Stores professor details.
### enrollments: Tracks student enrollment in courses (many-to-many).

```
CREATE DATABASE CollegeDB;
USE CollegeDB;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);


CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100),
    credits INT
);


CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100)
);


CREATE TABLE professors (
    professor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT UNIQUE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);


CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```
