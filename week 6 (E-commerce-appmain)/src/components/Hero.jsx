import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { assets } from "../assets/assets";

const { Title, Text } = Typography;

// Styled Components
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 4px 8px 28px rgba(0, 0, 0, 0.1);
  background: #fdfdfd;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const HeroLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background-color: #f7fafc;

  @media (min-width: 640px) {
    width: 50%;
    padding: 48px 24px;
  }
`;

const HeroContent = styled.div`
  color: #333333;
  padding: 0 16px;

  @media (min-width: 640px) {
    padding: 0 32px;
  }
`;

const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const HeaderLine = styled.div`
  width: 36px;
  height: 3px;
  background-color: #ff6b6b;

  @media (min-width: 768px) {
    width: 48px;
  }
`;

const ExploreLink = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateX(4px);
  }

  & span {
    color: #ff6b6b;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 32px;
  justify-content: space-evenly;

  @media (min-width: 640px) {
    gap: 48px;
    justify-content: flex-start;
  }
`;

const StatItem = styled.div`
  text-align: center;

  .stat-value {
    font-weight: 700;
    font-size: 20px;
    color: #333333;
  }

  .stat-label {
    color: #999999;
    font-size: 14px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  object-fit: cover;
  background-color: #ffe6e6;

  @media (min-width: 640px) {
    width: 50%;
    max-height: 400px;
  }

  @media (min-width: 1024px) {
    max-height: 480px;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      {/* Hero Left side */}
      <HeroLeft>
        <HeroContent>
          <HeroHeader>
            <HeaderLine />
            <Text strong style={{ fontSize: "18px", color: "#ff6b6b" }}>
              WELCOME TO ENNEA STORE
            </Text>
          </HeroHeader>
          <Title level={1} style={{ lineHeight: "1.3", marginBottom: "20px", color: "#333333" }}>
            Discover Your Style
          </Title>
          <Text style={{ color: "#606060", marginBottom: "24px", display: "block", fontSize: "16px" }}>
            Explore our collection of trendy clothing. From casual wear to elegant pieces, find the perfect outfit that matches your unique style.
          </Text>
          <ExploreLink>
            <Text strong style={{ fontSize: "16px" }}>
              <span>EXPLORE COLLECTION</span>
            </Text>
            <HeaderLine />
          </ExploreLink>
          <StatsContainer>
            <StatItem>
              <p className="stat-value">500+</p>
              <p className="stat-label">Products</p>
            </StatItem>
            <StatItem>
              <p className="stat-value">50+</p>
              <p className="stat-label">Brands</p>
            </StatItem>
            <StatItem>
              <p className="stat-value">24/7</p>
              <p className="stat-label">Support</p>
            </StatItem>
          </StatsContainer>
        </HeroContent>
      </HeroLeft>
      {/* Hero right side */}
      <HeroImage src={assets.hero_img} alt="Fashion Collection" />
    </HeroContainer>
  );
};

export default Hero;
