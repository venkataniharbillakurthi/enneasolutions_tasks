import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";


const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 50px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CourseImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const CourseTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
`;

const CourseDescription = styled.p`
  font-size: 1rem;
  color: #555;
  text-align: justify;
`;

const EnrollButton = styled(Button)`
  background-color: #ff8c00 !important;
  color: white !important;
  font-weight: bold;
  border: none;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e67300 !important;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc !important;
    cursor: not-allowed;
  }
`;

const CourseDetailById = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch course details
  useEffect(() => {
    axios
      .get(`http://localhost:3001/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  // Check if user is enrolled
  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1]))?.sub;

    axios
      .get(`http://localhost:3001/enrollments?userId=${userId}&courseId=${id}`)
      .then((res) => setIsEnrolled(res.data.length > 0))
      .catch((err) => console.error("Error checking enrollment:", err));
  }, [id, isAuthenticated]);

  // Handle enrollment
  const handleEnroll = () => {
    if (!isAuthenticated) {
      message.info("Please login to enroll in this course");
      navigate("/login");
      return;
    }
    navigate(`/enroll/${id}`);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <CardContainer>
      <div>
        <CourseImage src={course.image} alt={course.title} />
      </div>
      <div>
        <CourseTitle>{course.title}</CourseTitle>
        <p>Instructor: {course.instructor}</p>
        <CourseDescription>{course.description}</CourseDescription>
        <EnrollButton onClick={handleEnroll} disabled={isEnrolled}>
          {isEnrolled ? "Already Enrolled" : "Enroll Now"}
        </EnrollButton>
      </div>
    </CardContainer>
  );
};

export default CourseDetailById;
