
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
const DepartmentTitle = styled.span`
    font-weight: bold;
    color: #333;
`;

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/college/departments');
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
            <DepartmentTitle >
                {departments.length > 0 ? (
                    departments.map(department => (
                        <DepartmentItem key={department.id}>
                            {department.departmentId} - {department.departmentName} - {department.professorName}
                        </DepartmentItem>
                    ))
                ) : (
                    <DepartmentItem>No departments found.</DepartmentItem>
                )}
            </DepartmentTitle>
        </DepartmentListContainer>
    );
};

export default DepartmentList;