// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StudentListContainer = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 5px;
`;

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('http://localhost:8080/api/college/students');
            console.log(response.data); // Log the data to inspect it
            setStudents(response.data);
        };
        fetchStudents();
    }, []);

    return (
        <StudentListContainer>
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={`${student.studentId}-${student.departmentId}`}>
                        {student.studentId} - {student.name} - {student.departmentId}
                    </li>
                ))}
            </ul>
        </StudentListContainer>
    );
};

export default StudentList;