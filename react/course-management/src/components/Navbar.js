import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { HomeOutlined, InfoCircleOutlined, ContactsOutlined, UserOutlined, LogoutOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #f57c00, #37474f);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  height: 60px;
  z-index: 1000;
`;

const StyledLink = styled(Link)`
  text-decoration: none; 
  &:hover {
    text-decoration: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  height: 65px;
  border-radius: 10px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavbarLink = styled.div`
  a {
    color: #fff;
    font-size: 1rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;

    &:hover {
      color: #cfd8dc;
      transform: scale(1.05);
    }
  }
`;

const NavbarButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  background: #fff;
  color: #37474f;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    background: #ffe0b2;
    color: #bf360c;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarContainer>
      <StyledLink to="/">
        <LogoContainer>
          <Logo src="/logo.png" alt="Company Logo" />
          <Title>Aditya Academy</Title>
        </LogoContainer>
      </StyledLink>

      <NavbarLinks>
        <NavbarLink>
          <StyledLink to="/"><HomeOutlined /> Home</StyledLink>
        </NavbarLink>
        <NavbarLink>
          <StyledLink to="/about"><InfoCircleOutlined /> About</StyledLink>
        </NavbarLink>
        <NavbarLink>
          <StyledLink to="/contact"><ContactsOutlined /> Contact</StyledLink>
        </NavbarLink>

        {isAuthenticated && (
          <>
            {userRole === 'ROLE_ADMIN' && (
              <NavbarLink>
                <StyledLink to="/admin-dashboard"><DashboardOutlined /> Admin Dashboard</StyledLink>
              </NavbarLink>
            )}
            {userRole === 'ROLE_ADMIN' && (
              <NavbarLink>
                <StyledLink to="/admin-student-management"><UserOutlined /> Student Management</StyledLink>
              </NavbarLink>
            )}
            {userRole === 'ROLE_USER' && (
              <NavbarLink>
                <StyledLink to="/student-profile"><ProfileOutlined /> My Profile</StyledLink>
              </NavbarLink>
            )}
            <NavbarLink>
              <NavbarButton onClick={handleLogout} type="orange">
                <LogoutOutlined /> Logout
              </NavbarButton>
            </NavbarLink>
          </>
        )}

        {!isAuthenticated && (
          <NavbarLink>
            <StyledLink to="/login">
              <NavbarButton type="orange">
                <UserOutlined /> Login
              </NavbarButton>
            </StyledLink>
          </NavbarLink>
        )}
      </NavbarLinks>
    </NavbarContainer>
  );
};

export default Navbar;
