import { useState } from 'react';
import { Form, Input, Button, Typography, message, Divider } from 'antd';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosConfig';

const { Title } = Typography;

const LoginContainer = styled.div`
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

const StyledDivider = styled(Divider)`
  margin: 24px 0;
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const token =
        typeof response.data === 'string'
          ? response.data
          : response.data.token || response.data.accessToken;

      if (!token) {
        throw new Error('No token received from server');
      }

      login(token);
      message.success('Login successful!');

      // Get role from decoded token
      const decoded = window.jwt_decode(token);
      const role = decoded.authorities?.[0] || decoded.roles?.[0] || decoded.role;

      // Redirect based on role
      if (role === 'ROLE_ADMIN') {
        navigate('/');
      } else if (role === 'ROLE_USER') {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.message ||
          'Login failed. Please try again.'
      );
      localStorage.removeItem('token');
    }
  };

  return (
    <LoginContainer>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#f57c00' }}>
        Login
      </Title>
      <Form onFinish={handleLogin} layout="vertical">
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
          rules={[{ required: true, message: 'Please input your password!' }]}
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
            Login
          </StyledButton>
        </Form.Item>
      </Form>

      <StyledDivider>Or</StyledDivider>

      <StyledLink to="/register">
        Don't have an account? Register here
      </StyledLink>
    </LoginContainer>
  );
};

export default Login;
