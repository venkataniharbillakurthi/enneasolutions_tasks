import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CourseEnrollmentContainer = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 5px;
`;
const CourseEnrollmentItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const CourseEnrollmentList = () => {
    const [courseEnrollments, setCourseEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourseEnrollments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/api/college/courses/enrollment`);
            console.log('Fetched course enrollments:', response.data);
            setCourseEnrollments(response.data);
        } catch (error) {
            console.error('Error fetching course enrollments:', error);
            setError('Failed to fetch course enrollments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseEnrollments();
    }, []);

    return (
        <CourseEnrollmentContainer>
            <h2>Course Enrollment List</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && (
                <ul>
                {courseEnrollments.length > 0 ? (
                    courseEnrollments.map(enrollment => (
                        <CourseEnrollmentItem key={enrollment.courseId}>
                            {enrollment.courseName} - {enrollment.studentCount} students enrolled
                        </CourseEnrollmentItem>
                    ))
                ) : (
                    <CourseEnrollmentItem>No enrollments found.</CourseEnrollmentItem>
                )}
            </ul>
             )}
        </CourseEnrollmentContainer>
    );
};

export default CourseEnrollmentList;