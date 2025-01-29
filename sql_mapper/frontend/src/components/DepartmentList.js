// src/components/DepartmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DepartmentListContainer = styled.div`
  background-color: #ffccbc;
  padding: 20px;
  border-radius: 5px;
`;

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/college/departments');
                console.log(response.data); // Log the data to inspect it
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching department data:", error);
            }
        };
        fetchDepartments();
    }, []);

    return (
        <DepartmentListContainer>
            <h2>Department List</h2>
            <ul>
                {departments.length > 0 ? (
                    departments.map(department => (
                        <li key={department.id}>{department.departmentId} - {department.departmentName}</li> // Ensure department.id is unique
                    ))
                ) : (
                    <li>No departments found.</li>
                )}
            </ul>
        </DepartmentListContainer>
    );
};

export default DepartmentList;