import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { assets } from "../assets/assets";

// Styled Components
const PolicyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  text-align: center;
  color: #4b5563; // text-gray-700

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 8px;
  }
`;

const PolicyCard = styled(Card)`
  width: 100%;
  max-width: 300px;
  border: none;
  text-align: center;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px;
  }
`;

const PolicyIcon = styled.img`
  width: 48px;
  margin: auto;
`;

const PolicyTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #1f2937; // text-gray-900
`;

const PolicyDescription = styled.p`
  color: #9ca3af; // text-gray-400
  font-size: 14px;
`;

const OurPolicy = () => {
  return (
    <PolicyContainer>
      <PolicyCard>
        <PolicyIcon src={assets.exchange_icon} alt="Exchange Policy Icon" />
        <PolicyTitle>Easy Exchange Policy</PolicyTitle>
        <PolicyDescription>We offer hassle-free exchange policy</PolicyDescription>
      </PolicyCard>

      <PolicyCard>
        <PolicyIcon src={assets.quality_icon} alt="Quality Policy Icon" />
        <PolicyTitle>7 Days Return Policy</PolicyTitle>
        <PolicyDescription>We provide 7 Days free return policy</PolicyDescription>
      </PolicyCard>

      <PolicyCard>
        <PolicyIcon src={assets.support_img} alt="Customer Support Icon" />
        <PolicyTitle>Best Customer Support</PolicyTitle>
        <PolicyDescription>We provide 24/7 customer support</PolicyDescription>
      </PolicyCard>
    </PolicyContainer>
  );
};

export default OurPolicy;
