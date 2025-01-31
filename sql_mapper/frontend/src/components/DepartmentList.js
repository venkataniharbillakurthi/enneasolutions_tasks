
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DepartmentListContainer = styled.div`
  background-color: #ffccbc;
  padding: 20px;
  border-radius: 5px;
`;
const DepartmentItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid black;
`;

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/college/departments');
                console.log(response.data); 
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
                        <DepartmentItem key={department.id}>
                            {department.departmentId} - {department.departmentName} - {department.professorName}
                        </DepartmentItem>
                    ))
                ) : (
                    <DepartmentItem>No departments found.</DepartmentItem>
                )}
            </ul>
        </DepartmentListContainer>
    );
};

export default DepartmentList;