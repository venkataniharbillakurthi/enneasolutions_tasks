import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CourseListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
`;


const ExploreButton = styled(Button)`
  margin-top: 20px;
  background-color: #f57c00;
  color: white;
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #f57c00;
    border: 1px solid #f57c00;
  }
`;

// Styling for individual course cards
const StyledCard = styled(Card)`
  width: 300px;
  margin: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

// Styling for the course image
const CourseImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CourseList = () => {
  const [courses, setCourses] = useState([]); // Stores course data
  const navigate = useNavigate(); // For navigation

  // Fetch courses from the API when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:3001/courses")
      .then((res) => setCourses(res.data.slice(0, 4))) // Show only the first 4 courses
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Function to navigate to the course details page
  const handleCardClick = (id) => navigate(`/course/${id}`);

  // Function to navigate to the full course list
  const handleExploreMore = () => navigate(`/course-detail`);

  return (
    <>
      <CourseListContainer>
        {courses.map((course) => (
          <StyledCard
            key={course.id}
            title={<span style={{ fontWeight: "bold", fontSize: "16px" }}>{course.title}</span>}
            onClick={() => handleCardClick(course.id)}
          >
            <CourseImage src={course.image} alt={course.title} />
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p>{course.description}</p>
          </StyledCard>
        ))}
      </CourseListContainer>

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <ExploreButton onClick={handleExploreMore}>Explore More</ExploreButton>
      </div>
    </>
  );
};

export default CourseList;
