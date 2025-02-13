import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: #fffaf0;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  max-width: 1100px;
  margin: 40px auto;
  gap: 30px;
`;

const ContactImage = styled.img`
  width: 100%;
  max-width: 450px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled(Form)`
  flex: 1;
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SubmitButton = styled(Button)`
  width: 100%;
  background-color: #ff8c00;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    background-color: #ff6500;
  }
`;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:3001/contacts', values);
      toast.success('Message sent successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <ContactContainer>
      <ToastContainer />
      <ContactImage 
        src="https://img.freepik.com/free-photo/closeup-friends-working-with-computer-laptop-together_53876-30145.jpg?ga=GA1.1.500716520.1737194945&semt=ais_hybrid_sidr" 
        alt="Contact Us" 
      />
      <ContactForm
        form={form}
        name="contact"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please enter your phone number!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: 'Please enter your message!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <SubmitButton type="primary" htmlType="submit">
            Send Message
          </SubmitButton>
        </Form.Item>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
