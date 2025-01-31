// src/App.js
import React, { useState } from 'react';
import StudentList from './components/StudentList';
import DepartmentList from './components/DepartmentList';
import AddStudent from './components/AddStudent'; 
import UpdateStudent from './components/UpdateStudent'; 
import styled from 'styled-components';
import Course from './components/Course';
import CourseEnrollment from './components/CourseEnrollement';

const AppHeader = styled.h1`
  color: #0d47a1; 
  text-align: center;

`;
const ContentContainer = styled.div`
  flex: 6; 
  width: 100%;
  height: 50vh; 
  padding: 20px; 
  margin: 20px;
  margin-top: 50px; 
`;

const AppContainer = styled.div`
  display: flex;
  background-color: #f0f4f8; 
  height: 100vh; 
`;




const ButtonContainer = styled.div`
  flex: 4; 
  padding: 20px;
  display: flex;
  flex-direction: column; 
  gap: 10px; 
  align-items: center; 
`;
const StyledButton = styled.button`
  width: ${(props) => (props.level === 1 ? '200px' : props.level === 2 ? '150px' :props.level === 3 ? '100px' : props.level === 4 ? '80px' : '50px')}; 
  height: 40px; 
  margin: 5px 0; 
  background-color: #0d47a1; 
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s;

  &:hover {
    background-color: #1565c0; 
  }
`;





const App = () => {
    const [view, setView] = useState(''); 

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <AppContainer>
            <ButtonContainer>
                <AppHeader>Ennea College</AppHeader>
                <StyledButton level={4} onClick={() => handleViewChange('students')}>Students</StyledButton>
                <StyledButton level={3} onClick={() => handleViewChange('departments')}>Departments</StyledButton>
                <StyledButton level={2} onClick={() => handleViewChange('addStudent')}>Add Student</StyledButton>
                <StyledButton level={1} onClick={() => handleViewChange('updateStudent')}>Update Student</StyledButton>
                <StyledButton level={1} onClick={() => handleViewChange('courses')}>Courses</StyledButton>
                <StyledButton level={1} onClick={() => handleViewChange('courseEnrollment')}>Course Enrollment</StyledButton>
            </ButtonContainer>
            <ContentContainer>
                {view === 'students' && <StudentList />}
                {view === 'departments' && <DepartmentList />}
                {view === 'addStudent' && <AddStudent />}
                {view === 'updateStudent' && <UpdateStudent />}
                {view === 'courses' && <Course />}
                {view === 'courseEnrollment' && <CourseEnrollment />}

            </ContentContainer>
        </AppContainer>
    );
};

export default App;