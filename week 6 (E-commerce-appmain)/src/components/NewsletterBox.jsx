import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Button, Input } from "antd";

// Styled components
const NewsletterContainer = styled.div`
  text-align: center;
  max-width: 768px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Heading = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
`;

const SubHeading = styled.p`
  color: #b0b0b0;
  margin-top: 0.75rem;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 480px;
  margin: 1.5rem auto;
  border-left: 2px solid #f0f0f0;
  padding-left: 1rem;
`;

const CustomButton = styled(Button)`
  background-color: black;
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem 2.5rem;
  &:hover {
    background-color: #333;
  }
`;

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Check if email is not empty
    if (email.trim()) {
      // Clear the input
      setEmail("");
      // Show success message
      toast.success("Thank you for subscribing!");
    }
  };

  return (
    <NewsletterContainer>
      <Heading>Subscribe now & get 20% offer</Heading>
      <SubHeading>Stay updated with our latest collections and exclusive offers</SubHeading>
      <FormContainer onSubmit={onSubmitHandler}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "4px",
            borderColor: "#d9d9d9",
            boxShadow: "none",
          }}
        />
        <CustomButton type="submit">SUBSCRIBE</CustomButton>
      </FormContainer>
    </NewsletterContainer>
  );
};

export default NewsletterBox;
