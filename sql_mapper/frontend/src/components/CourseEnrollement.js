
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CourseEnrollmentContainer = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 5px;
`;
const CourseEnrollementItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const CourseEnrollmentList = () => {
    const [courseEnrollments, setCourseEnrollments] = useState([]);

    const fetchCourseEnrollments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/college/courses/enrollment`);
            console.log('Fetched course enrollments:', response.data);
            setCourseEnrollments(response.data);
        } catch (error) {
            console.error('Error fetching course enrollments:', error);
        }
    };

    useEffect(() => {
        fetchCourseEnrollments();
    }, []);

    return (
        <CourseEnrollmentContainer>
            <h2>Course Enrollment List</h2>
            <ul>
                {courseEnrollments.length > 0 ? (
                    courseEnrollments.map(enrollment => (
                        <CourseEnrollementItem key={enrollment.courseName}>
                            {enrollment.courseName} - {enrollment.studentCount} students enrolled
                        </CourseEnrollementItem>
                    ))
                ) : (
                    <CourseEnrollementItem>No enrollments found.</CourseEnrollementItem>
                )}
            </ul>
        </CourseEnrollmentContainer>
    );
};

export default CourseEnrollmentList;