import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${BASE_URL}/user/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setDashboardData(response.data);
      } catch (err) {
        console.error('Dashboard error:', err.response || err);
        
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 mx-auto border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-center text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="mb-4 text-center text-red-500">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-center text-gray-900">Error</h3>
          <p className="text-center text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl p-6 mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transform transition-all hover:scale-[1.02]">
        
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome back, {dashboardData?.userName}!</h1>
          <p className="text-gray-600">Here's your personalized weather dashboard</p>
          <br /><br />
          <Link to="/weather">
          <button className="px-8 py-4 text-lg font-semibold transition-all bg-blue-500 rounded-full hover:bg-blue-600">
            Enter into Weather World
          </button>
        </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* User Information Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-500 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">User Information</h2>
            </div>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <p className="mb-1 text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-800">{dashboardData?.userName}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="mb-1 text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{dashboardData?.email}</p>
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-500 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">Account Details</h2>
            </div>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <p className="mb-1 text-sm text-gray-600">Last Login</p>
                <p className="font-medium text-gray-800">
                  {new Date(dashboardData?.lastLogin).toLocaleString()}
                </p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="mb-1 text-sm text-gray-600">Weather Preference</p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">
                    {dashboardData?.weatherPreference || 'Not set'}
                  </span>
                  {!dashboardData?.weatherPreference && (
                    <span className="ml-2 text-xs text-blue-500 cursor-pointer hover:text-blue-700">
                      Set preference
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
