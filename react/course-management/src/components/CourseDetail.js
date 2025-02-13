import { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 80px 20px 40px;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
`;

const StyledCard = styled(Card)`
    width: 320px; 
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        border: 1px solid #ff8c00;
    }
`;

const CourseImage = styled.img`
    width: 100%;
    height: 180px; 
    object-fit: cover; 
    border-radius: 5px;
`;

const EnrollButton = styled(Button)`
    width: 100%;
    background-color: #ff8c00; 
    color: white;
    border: none;
    font-weight: bold;
    transition: background 0.3s ease, transform 0.2s;
    margin-top: 10px;

    &:hover {
        background-color: #e67300; 
        transform: scale(1.05);
    }
`;

const CourseTitle = styled.span`
    font-weight: bold;
    color: #333;
    font-size: 1.2rem;
`;

const CourseDescription = styled.p`
    color: #555;
    font-size: 0.95rem;
    text-align: justify;
    margin: 10px 0;
`;

const CourseInstructor = styled.p`
    font-size: 0.9rem;
    font-weight: bold;
    color: #444;
`;

const CourseDetail = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/course/${id}`);
    };

    return (
        <CardContainer>
            {courses.map(course => (
                <StyledCard
                    key={course.id}
                    title={<CourseTitle>{course.title}</CourseTitle>}
                    onClick={() => handleCardClick(course.id)}
                >
                    <CourseImage src={course.image} alt={course.title} />
                    <CourseInstructor>Instructor: {course.instructor}</CourseInstructor>
                    <CourseDescription>{course.description}</CourseDescription>
                    <EnrollButton type="orange">Enroll Now</EnrollButton>
                </StyledCard>
            ))}
        </CardContainer>
    );
};

export default CourseDetail;
