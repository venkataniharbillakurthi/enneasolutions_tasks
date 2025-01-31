
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
const CourseEnrollementTitle = styled.span`
    font-weight: bold;
    color: #333;
`;

const CourseEnrollmentList = () => {
    const [courseEnrollments, setCourseEnrollments] = useState([]);

    const fetchCourseEnrollments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/college/courses/enrollment`);
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
            <CourseEnrollementTitle>
                {courseEnrollments.length > 0 ? (
                    courseEnrollments.map(enrollment => (
                        <CourseEnrollementItem key={enrollment.courseName}>
                            {enrollment.courseName} - {enrollment.studentCount} students enrolled
                        </CourseEnrollementItem>
                    ))
                ) : (
                    <CourseEnrollementItem>No enrollments found.</CourseEnrollementItem>
                )}
            </CourseEnrollementTitle>
        </CourseEnrollmentContainer>
    );
};

export default CourseEnrollmentList;