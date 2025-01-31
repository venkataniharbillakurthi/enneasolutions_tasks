
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StudentListContainer = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 5px;
`;

const PaginationButton = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #b2dfdb;
  }
`;
const StudentItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10); 

    const fetchStudents = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/college/students?page=${page}&size=${pageSize}`);
            console.log('Fetched students:', response.data);
            setStudents(response.data);
            setTotalPages(parseInt(response.headers['x-total-pages'], 10)); 
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        console.log('Current Page Updated:', currentPage);
        fetchStudents(currentPage); 
    }, [currentPage]);

    const handleNextPage = () => {
        console.log('Next Page Clicked, Current Page:', currentPage);
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <StudentListContainer>
            <h2>Student List</h2>
            <ul>
                {students.length > 0 ? (
                    students.map(student => (
                        <StudentItem key={`${student.studentId}-${student.departmentId}`}>
                            {student.studentId} - {student.name} - {student.departmentId}
                        </StudentItem>
                    ))
                ) : (
                    <StudentItem>No students found.</StudentItem>
                )}
            </ul>
            <div>
                <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</PaginationButton>
                <PaginationButton onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next</PaginationButton>
            </div>
        </StudentListContainer>
    );
};

export default StudentList;