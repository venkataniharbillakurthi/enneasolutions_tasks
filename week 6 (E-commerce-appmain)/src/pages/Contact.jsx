import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
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

const ContactImage = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 8px;
`;

const ContactInfo = styled.div`
  margin-bottom: 32px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const InfoText = styled.p`
  color: #666;
  font-size: 16px;
  line-height: 1.6;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-input {
    padding: 12px;
    border-radius: 4px;
  }

  .ant-input-textarea {
    min-height: 120px;
  }

  button {
    height: 48px;
    font-size: 16px;
  }
`;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
    // Handle form submission here
    form.resetFields();
  };

  return (
    <Container>
      <Title>Contact Us</Title>

      <Row gutter={[48, 48]}>
        <Col xs={24} md={12}>
          <ContactInfo>
            <InfoItem>
              <InfoTitle>Visit Our Store : </InfoTitle>
              <InfoText>
                Jubilee Hills,
                Hyderabad,
                India
                <br />
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoTitle>Contact Information : </InfoTitle>
              <InfoText>
                Email: support@ennea.com
                <br />
                Phone: +91 9876543210
                <br />
                Hours: Mon-Fri, 9:00 AM - 6:00 PM EST
              </InfoText>
            </InfoItem>
          </ContactInfo>

          <ContactImage src={assets.contact_img} alt="Contact Us" />
        </Col>

        <Col xs={24} md={12}>
          <StyledForm
            form={form}
            name="contact"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input placeholder="Enter the subject" />
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea placeholder="Enter your message" rows={6} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  background: "#000",
                }}
              >
                Send Message
              </Button>
            </Form.Item>
          </StyledForm>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
