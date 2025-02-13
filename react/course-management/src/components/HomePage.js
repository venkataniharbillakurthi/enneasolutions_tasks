import React from 'react';
import Search from './Search';
import CourseList from './CourseList';


const HomePage = () => {
    return (
        <div>
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <Search />
                <h2>Explore Our Courses</h2>
                <p>Find the best courses to enhance your skills and knowledge.</p>
            </div>
            <CourseList /> {/* This component will display courses */}
        </div>
    );
};

export default HomePage;