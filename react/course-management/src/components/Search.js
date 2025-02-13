import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    height: auto;
    margin-bottom: 80px;
`;

const SearchInput = styled(Input)`
    width: 300px;
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #f57c00; 

`;

const StyledButton = styled(Button)`
    background-color: #f57c00; 
    border-color: #f57c00;
    color: #fff;
    font-weight: bold;
    transition: all 0.3s;

    &:hover {
        background-color: #bf360c; 
        border-color: #bf360c;
        color: #fff;
    }
`;

const CourseListContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    align-items: center;
    width: 100%;
`;

const CourseCard = styled.div`
    border: 1px solid #ccc;
    padding: 15px;
    width: 80%;
    max-width: 500px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: #fffbe6; 
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;
    height: 400px;

    &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }
`;

const CourseImage = styled.img`
    width: 300px;
    height: 200px;
    border-radius: 5px;
    margin-top: 10px;
`;

const Search = () => {
    const [query, setQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    // Function to search courses (case-insensitive & partial match)
    const handleSearch = async () => {
        if (!query.trim()) {
            setCourses([]); // No results if the input is empty
            setNoResults(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/courses`);
            const filteredCourses = response.data.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase()) // Case-insensitive, partial match
            );

            setCourses(filteredCourses);
            setNoResults(filteredCourses.length === 0);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setCourses([]);
            setNoResults(true);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/course/${id}`); 
    };

    return (
        <SearchContainer>
            <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Empower your future with courses designed to fit your choice
            </h2>
            <p style={{ textAlign: 'center', maxWidth: '600px' }}>
                Explore a variety of courses tailored to your needs and interests.
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SearchInput
                    placeholder="Search by Course Title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onPressEnter={handleSearch}
                />
                <StyledButton type="orange" onClick={handleSearch}>Search</StyledButton>
            </div>
            <CourseListContainer>
                {noResults ? (
                    <p>No courses found.</p>
                ) : (
                    courses.map(course => (
                        <CourseCard key={course.id} onClick={() => handleCardClick(course.id)}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            {course.image && <CourseImage src={course.image} alt={course.title} />}
                        </CourseCard>
                    ))
                )}
            </CourseListContainer>
        </SearchContainer>
    );
};

export default Search;
