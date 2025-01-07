import React from 'react';
import styled from 'styled-components';

// Styled Components
const TitleContainer = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const TitleText = styled.p`
  color: #4A4A4A;
`;

const TitleHighlight = styled.span`
  color: #4A4A4A;
  font-weight: 500;
`;

const Line = styled.p`
  width: 2rem;
  height: 2px;
  background-color: #4A4A4A;
`;

const Title = ({ text1, text2 }) => {
  return (
    <TitleContainer>
      <TitleText>{text1} <TitleHighlight>{text2}</TitleHighlight></TitleText>
      <Line />
    </TitleContainer>
  );
};

export default Title;
