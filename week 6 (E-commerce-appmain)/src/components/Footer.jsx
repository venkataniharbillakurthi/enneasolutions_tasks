import React from 'react';
import { assets } from '../assets/assets';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';

// Styled Components
const FooterContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
  }
`;

const Logo = styled.img`
  width: 8rem;
  margin-bottom: 1.25rem;
`;

const Description = styled.p`
  width: 100%;
  max-width: 66.67%;
  color: #4b4b4b;
`;

const SectionTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
`;

const ListItem = styled.li`
  color: #4b4b4b;
  margin-bottom: 0.25rem;
`;

const FooterBottom = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  font-size: 0.875rem;
  color: #808080;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <Logo src={assets.logo} alt="Logo" />
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reiciendis praesentium expedita obcaecati ut beatae saepe cum esse autem et?
          </Description>
        </div>
        <div>
          <SectionTitle>COMPANY</SectionTitle>
          <ul>
            <ListItem>Home</ListItem>
            <ListItem>About us</ListItem>
            <ListItem>Delivery</ListItem>
            <ListItem>Privacy Policy</ListItem>
          </ul>
        </div>
        <div>
          <SectionTitle>Get In Touch</SectionTitle>
          <ul>
            <ListItem>+91-8902315678</ListItem>
            <ListItem>contactus@ennea.com</ListItem>
          </ul>
        </div>
      </FooterContent>
      <Divider />
      <FooterBottom>
        Copyright 2025@ ennea.com - All Right Reserved.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
