import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from 'antd';


const FooterContainer = styled.footer`
  padding: 30px;
  background-color: #f1f3f5;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 10px;
  border-radius: 30px;
`;

const Address = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

const FooterText = styled(Typography.Text)`
  color: #6c757d;
  font-size: 14px;
  margin-top: 10px;
`;

const FooterButton = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo src="./logo.png" alt="Company Logo" />
      <Address>Company Address: 123 Course St, Education City</Address>
      
      <FooterText>
        © 2025 Company Name. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
