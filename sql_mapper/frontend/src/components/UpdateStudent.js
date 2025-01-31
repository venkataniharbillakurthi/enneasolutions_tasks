// src/components/UpdateStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UpdateStudentContainer = styled.div`
  background-color: #fff9c4;
  padding: 20px;
  border-radius: 5px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const UpdateStudent = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/college/students/${id}`, {
                name,
                age,
                departmentId,
            });
            alert('Student updated successfully!');
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <UpdateStudentContainer>
            <form onSubmit={handleSubmit}>
                <h2>Update Student</h2>
                <FormContainer>
                    <input style={{ padding: '10px' }} type="text" placeholder="Student ID" value={id} onChange={(e) => setId(e.target.value)} required /><br/>
                    <input style={{ padding: '10px' }} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br/>
                    <input style={{ padding: '10px' }} type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} /><br/>
                    <input style={{ padding: '10px' }} type="number" placeholder="Department ID" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} /><br/>
                    <button style={{ padding: '10px' }} type="submit">Update Student</button>
                </FormContainer>
               
            </form>
        </UpdateStudentContainer>
    );
};

export default UpdateStudent;