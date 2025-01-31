// src/components/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AddStudentContainer = styled.div`
  background-color: #c8e6c9;
  padding: 20px;
  border-radius: 5px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const AddStudent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/college/students', {
                name,
                age,
                departmentId,
            });
            alert('Student added successfully!');
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
        <AddStudentContainer>
            <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <FormContainer>
                    <input style={{ padding: '10px' }} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br/>
                    <input style={{ padding: '10px' }} type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} /><br/>
                    <input style={{ padding: '10px' }} type="number" placeholder="Department ID" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} /><br/>
                    
                    <button style={{ padding: '10px' }} type="submit">Add Student</button>
                </FormContainer>
            </form>
        </AddStudentContainer>
    );
};

export default AddStudent;