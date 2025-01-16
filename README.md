# College Management System

## Create DataBase and Tables:

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

## Insert data into tables

```
INSERT INTO departments (department_name) VALUES ('Computer Science'), ('Information Technology'), ('Mechanical');


INSERT INTO professors (name, department_id) VALUES ('Dr. Ramesh', 1), ('Dr. Suresh', 2), ('Dr. Ram', 3);


INSERT INTO students (name, age, department_id) VALUES 
('Venkata', 20, 1),
('Nihar', 22, 1),
('Teja', 21, 2),
('Pavan', 23, 3);


INSERT INTO courses (course_name, credits) VALUES ('Data Structures', 3), ('Sql', 4), ('Thermodynamics', 3);


INSERT INTO enrollments (student_id, course_id) VALUES 
(1, 1), (1, 2),
(2, 1), (3, 2),
(4, 3);
```
## Aggregate Functions

```
-- Count the number of students in each department
SELECT d.department_name, COUNT(s.student_id) AS total_students
FROM departments d
LEFT JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_name;

-- Find the maximum and minimum credits in courses
SELECT MAX(credits) AS max_credits, MIN(credits) AS min_credits FROM courses;

-- Calculate the total credits for each student
SELECT s.name, SUM(c.credits) AS total_credits
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
GROUP BY s.name;

-- Calculate the average age of students in each department
SELECT d.department_name, AVG(s.age) AS avg_age
FROM departments d
JOIN students s ON d.department_id = s.department_id
GROUP BY d.department_name;

-- Count the number of students enrolled in each course
SELECT c.course_name, COUNT(e.student_id) AS total_enrollments
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name;
```

## Relationships:

### One-to-One: Each professor belongs to one department.
### One-to-Many: Each department can have many students.
### Many-to-One: Each student belongs to one department.
### Many-to-Many: Students can enroll in multiple courses.

```
	-- one to one 
SELECT 
    p.name AS professor_name,
    d.department_name
FROM 
    professors p
Join 
    departments d ON p.department_id = d.department_id;

	-- one to many
SELECT 
    d.department_name,
    s.name AS student_name
FROM 
    departments d
LEFT JOIN 
    students s ON d.department_id = s.department_id
ORDER BY 
    d.department_name;

	-- many to one
SELECT 
    s.name AS student_name,
    d.department_name
FROM 
    students s
JOIN 
    departments d ON s.department_id = d.department_id
ORDER BY 
    s.name;

	-- many to many
SELECT 
    s.name AS student_name,
    c.course_name
FROM 
    enrollments e
JOIN 
    students s ON e.student_id = s.student_id
JOIN 
    courses c ON e.course_id = c.course_id
ORDER BY 
    s.name, c.course_name;
```

