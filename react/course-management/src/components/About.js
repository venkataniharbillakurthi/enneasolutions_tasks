import React from 'react';
import { Card, List } from 'antd';
import styled from 'styled-components';


const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fffaf0; 
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  margin: 40px auto;
  max-width: 90%;
`;

const AboutRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  margin-bottom: 30px;
`;

const AboutImage = styled.img`
  width: 100%;
  max-width: 450px; 
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const AboutText = styled.div`
  flex: 1;
  padding-right: 20px;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #ff8c00; 
`;

const Highlight = styled.span`
  color: #ff4500;   
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutRow>
        <AboutText>
          <Title>Welcome to <Highlight>Aditya Academy</Highlight></Title>
          <p>
            We are dedicated to providing high-quality education and hands-on training 
            to empower students in their careers.
          </p>
        </AboutText>
        <AboutImage 
          src="https://img.freepik.com/free-photo/casual-coworkers-long-hair-executives-explaining_1134-692.jpg?ga=GA1.1.500716520.1737194945&semt=ais_hybrid_sidr" 
          alt="About Us" 
        />
      </AboutRow>

      <StyledCard>
        <p>🚀 <b>Why Choose Us?</b></p>
        <List
          dataSource={[
            '📚 High-quality, industry-relevant courses.',
            '🔧 Hands-on, practical learning experiences.',
            '🎓 Experienced professionals as instructors.',
            '✅ Affordable & accessible learning for all.',
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </StyledCard>
    </AboutContainer>
  );
};

export default About;
