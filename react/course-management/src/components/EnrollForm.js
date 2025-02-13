import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const OrangeButton = styled(Button)`
  background-color: #ff8c00 ;
  color: white ;
  font-weight: bold;
  border: none;
  font-size: 1rem;
  padding: 10px 15px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e67300 ;
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(255, 140, 0, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const EnrollForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isAuthenticated, userId } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndEnrollment = async () => {
      if (!isAuthenticated || !userId) {
        message.error('Please login to enroll in courses');
        navigate('/login', { state: { from: `/enroll/${id}` } });
        return;
      }

      try {
        const courseResponse = await axios.get(`http://localhost:3001/courses/${id}`);
        setCourse(courseResponse.data);

        const enrollmentResponse = await axios.get(`http://localhost:3001/enrollments?userId=${userId}&courseId=${id}`);
        if (enrollmentResponse.data.length > 0) {
          message.info('You are already enrolled in this course');
          navigate(`/course/${id}`);
          return;
        }

        const token = localStorage.getItem('token');
        const decoded = window.jwt_decode(token);
        form.setFieldsValue({
          fullName: decoded.name || '',
          email: decoded.email || '',
        });

        setLoading(false);
      } catch (error) {
        message.error('Failed to load course information');
        navigate(`/course/${id}`);
      }
    };

    checkAuthAndEnrollment();
  }, [id, isAuthenticated, userId, navigate, form]);

  const handleEnroll = async (values) => {
    if (!userId) {
      message.error('User ID not found. Please login again.');
      navigate('/login');
      return;
    }

    try {
      const enrollmentData = {
        id: `e_${Date.now()}`,
        userId,
        courseId: id,
        courseName: course.title,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active',
        studentName: values.fullName,
        studentEmail: values.email,
        studentPhone: values.phoneNumber
      };

      await axios.post('http://localhost:3001/enrollments', enrollmentData);
      
      message.success('Successfully enrolled in the course!');
      navigate('/student-profile');
    } catch (error) {
      console.error('Enrollment failed:', error);
      message.error('Failed to enroll. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <FormContainer>
      <Title>Enroll in {course?.title}</Title>
      <Form form={form} layout="vertical" onFinish={handleEnroll}>
        <Form.Item 
          name="fullName" 
          label="Full Name" 
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>
        
        <Form.Item 
          name="email" 
          label="Email" 
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        
        <Form.Item 
          name="phoneNumber" 
          label="Phone Number" 
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        
        <Form.Item>
          <OrangeButton htmlType="submit" block>
            Confirm Enrollment
          </OrangeButton>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default EnrollForm;
