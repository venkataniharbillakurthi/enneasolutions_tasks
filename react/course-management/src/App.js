import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './index.css';


// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const Search = lazy(() => import('./components/Search'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const StudentProfile = lazy(() => import('./components/student/StudentProfile'));
const CourseList = lazy(() => import('./components/CourseList'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));
const CourseDetailById = lazy(() => import('./components/CourseDetailById'));
const EnrollForm = lazy(() => import('./components/EnrollForm'));
const AdminStudentManagement = lazy(() => import('./components/admin/AdminStudentManagement'));
const ErrorPage = lazy(() => import('./components/errorpage'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/course-detail" element={<CourseDetail />} />
                <Route path="/course/:id" element={<CourseDetailById />} />
                <Route path="/enroll/:id" element={<EnrollForm />} />

                {/* Protected routes for admin */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <PrivateRoute requiredRole="ROLE_ADMIN">
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-student-management"
                  element={
                    <PrivateRoute requiredRole="ROLE_ADMIN">
                      <AdminStudentManagement />
                    </PrivateRoute>
                  }
                />

                {/* Protected routes for users */}
                <Route
                  path="/student-profile"
                  element={
                    <PrivateRoute requiredRole="ROLE_USER">
                      <StudentProfile />
                    </PrivateRoute>
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
