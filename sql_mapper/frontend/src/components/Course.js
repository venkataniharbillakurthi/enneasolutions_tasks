
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CourseContainer = styled.div`
    background-color: #e0f7fa;
  padding: 20px;
  border-radius: 5px;
`;

const CourseList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CourseItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const CourseTitle = styled.span`
    font-weight: bold;
    color: #333;
`;

const Course = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/college/courses');
                console.log('Fetched courses:', response.data); // Log the fetched data
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <CourseContainer>
            <h1>Course List</h1>
            <CourseList>
                {courses.length > 0 ? (
                    courses.map(course => (
                        <CourseItem key={course.id}>
                            <CourseTitle>{course.courseId} - {course.courseName} - {course.credits}</CourseTitle>
                        </CourseItem>
                    ))
                ) : (
                    <li>No courses found.</li>
                )}
            </CourseList>
        </CourseContainer>
    );
};

export default Course;