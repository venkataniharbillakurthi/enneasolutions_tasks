import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { assets } from "../assets/assets";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: "Prata", serif;
  font-size: 48px;
  text-align: center;
  margin-bottom: 40px;
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ContentSection = styled.div`
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 24px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  text-align: center;
  margin: 40px 0;
`;

const StatItem = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const StatNumber = styled.h3`
  font-size: 36px;
  font-weight: 600;
  color: #f50;
  margin-bottom: 8px;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: #666;
`;

const About = () => {
  return (
    <Container>
      <Title>About Us</Title>

      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <AboutImage src={assets.about_img} alt="About Us" />
        </Col>
        <Col xs={24} md={12}>
          <ContentSection>
            <Heading>Our Story</Heading>
            <Description>
              Founded in 2024, our fashion e-commerce platform brings together
              the best of style, quality, and convenience. We believe that
              everyone deserves to look and feel their best without compromising
              on comfort or breaking the bank.
            </Description>

            <Heading>Our Mission</Heading>
            <Description>
              We strive to provide our customers with carefully curated
              collections that blend contemporary trends with timeless classics.
              Our commitment to quality ensures that each piece in our
              collection meets the highest standards of craftsmanship.
            </Description>
          </ContentSection>
        </Col>
      </Row>

      <StatsContainer>
        <StatItem>
          <StatNumber>50K+</StatNumber>
          <StatLabel>Happy Customers</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>1000+</StatNumber>
          <StatLabel>Products Available</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>15+</StatNumber>
          <StatLabel>Countries Served</StatLabel>
        </StatItem>
      </StatsContainer>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <ContentSection>
            <Heading>Quality First</Heading>
            <Description>
              We partner with trusted manufacturers who share our commitment to
              quality and sustainable practices. Each product is carefully
              inspected to ensure it meets our high standards.
            </Description>
          </ContentSection>
        </Col>
        <Col xs={24} md={8}>
          <ContentSection>
            <Heading>Customer Service</Heading>
            <Description>
              Our dedicated support team is available 24/7 to assist you with
              any questions or concerns. We believe in building long-lasting
              relationships with our customers through exceptional service.
            </Description>
          </ContentSection>
        </Col>
        <Col xs={24} md={8}>
          <ContentSection>
            <Heading>Fast Delivery</Heading>
            <Description>
              We understand the excitement of receiving new clothes. That's why
              we partner with reliable shipping carriers to ensure your orders
              reach you quickly and safely.
            </Description>
          </ContentSection>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
