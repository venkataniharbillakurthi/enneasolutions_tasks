import React from 'react';
import { Link } from 'react-router-dom';
import './Enter.css'

const Entry = () => {
  return (
    <div className="entry-page w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://i0.wp.com/picjumbo.com/wp-content/uploads/free-autumn-background-with-orange-leaves-and-space-for-text-free-image.jpeg?w=600&quality=80')` }}>
      <div className="entry-content text-center text-white px-6">
        <h1 className="text-5xl font-bold mb-6">Welcome to Weather Updates</h1>
        <p className="text-xl mb-8">Gateway to real-time weather updates and forecasts.</p>
        <Link to="/weather">
          <button className="bg-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all">
            Enter into Weather World
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Entry;
