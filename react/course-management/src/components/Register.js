import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import styled from 'styled-components';
import api from '../utils/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #f57c00; 
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #bf360c; 
  }
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.post('/api/auth/register', {
        email,
        password,
        username,
        role: 'USER', 
      });

      message.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      message.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <RegisterContainer>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#f57c00' }}>
        Register
      </Title>
      <Form onFinish={handleRegister} layout="vertical">
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 3, max: 50, message: 'Username must be between 3 and 50 characters' },
          ]}
        >
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <StyledButton type="orange" htmlType="submit" block size="large">
            Register
          </StyledButton>
        </Form.Item>
      </Form>
      <StyledLink to="/login">Already have an account? Login here</StyledLink>
    </RegisterContainer>
  );
};

export default Register;
