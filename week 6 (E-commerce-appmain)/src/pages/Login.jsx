import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const StyledForm = styled(Form)`
  margin-top: 32px;
`;

const ToggleText = styled.p`
  margin-top: 16px;
  text-align: center;
`;

const ToggleButton = styled(Button)`
  padding: 0;
  height: auto;
  line-height: inherit;

  &:hover {
    color: #1890ff;
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, registerUser } = useContext(ShopContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (isLogin) {
      const user = await loginUser(values.email, values.password);
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } else {
      await registerUser({
        ...values,
        isAdmin: false,
        id: Date.now().toString()
      });
    }
  };

  return (
    <PageContainer>
      <Title>{isLogin ? "Login" : "Register"}</Title>
      <FormContainer>
        <StyledForm form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form.Item>
        </StyledForm>

        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <ToggleButton type="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </ToggleButton>
        </ToggleText>
      </FormContainer>
    </PageContainer>
  );
};

export default Login;
