import React from 'react';
import { Link } from 'react-router-dom';
import './Enter.css'

const Entry = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-center bg-cover entry-page" style={{ backgroundImage: `url('https://i0.wp.com/picjumbo.com/wp-content/uploads/free-autumn-background-with-orange-leaves-and-space-for-text-free-image.jpeg?w=600&quality=80')` }}>
      <div className="px-6 text-center text-white entry-content">
        <h1 className="mb-6 text-5xl font-bold">Welcome to Weather Updates</h1>
        <p className="mb-8 text-xl">Gateway to real-time weather updates and forecasts.</p>
        <Link to="/weather">
          <button className="px-8 py-4 text-lg font-semibold transition-all bg-blue-500 rounded-full hover:bg-blue-600">
            Enter into Weather World
          </button>
        </Link><br /><br />
        <Link to="/dashboard">
          <button className="px-8 py-4 text-lg font-semibold transition-all bg-blue-500 rounded-full hover:bg-blue-600">
            Enter into Dashboard 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Entry;