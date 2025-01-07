import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Form, Input, Button, Radio, Space, Divider } from "antd";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    padding-top: 56px;
  }
`;

const DeliverySection = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    max-width: 480px;
  }
`;

const PaymentSection = styled.div`
  margin-top: 32px;
`;

const PaymentMethod = styled(Radio.Button)`
  display: flex;
  align-items: center;
  gap: 12px;
  height: auto;
  padding: 8px 12px;

  img {
    height: 20px;
    margin: 0 16px;
  }

  .payment-text {
    color: #666;
    font-size: 14px;
    font-weight: 500;
    margin: 0 16px;
  }
`;

const PlaceOrderButton = styled(Button)`
  margin-top: 32px;
  padding: 0 64px;
  height: 48px;
`;

const PlaceOrders = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const { cartItems, placeOrder } = useContext(ShopContext);
  const [form] = Form.useForm();

  const handlePlaceOrder = () => {
    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    form
      .validateFields()
      .then((values) => {
        try {
          const orderData = {
            ...values,
            paymentMethod: method
          };
          placeOrder(orderData);
          toast.success("Order placed successfully!");
          navigate("/orders");
        } catch (error) {
          console.error("Error placing order:", error);
          toast.error("Failed to place order. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Please fill in all required fields");
      });
  };

  return (
    <PageContainer>
      <DeliverySection>
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <Form form={form} layout="vertical" requiredMark={false}>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
              style={{ width: "50%" }}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Space.Compact>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="street"
            rules={[{ required: true, message: "Please enter street" }]}
          >
            <Input placeholder="Street" />
          </Form.Item>

          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please enter city" }]}
              style={{ width: "50%" }}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="place"
              rules={[{ required: true, message: "Please enter place" }]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Place" />
            </Form.Item>
          </Space.Compact>

          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="zipcode"
              rules={[{ required: true, message: "Please enter zipcode" }]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Zipcode" />
            </Form.Item>
            <Form.Item
              name="country"
              rules={[{ required: true, message: "Please enter country" }]}
              style={{ width: "50%" }}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Space.Compact>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Form>
      </DeliverySection>

      <PaymentSection>
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <Radio.Group
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <PaymentMethod value="stripe">
              <img src={assets.stripe_logo} alt="Stripe" />
            </PaymentMethod>

            <PaymentMethod value="razorpay">
              <img src={assets.razorpay_logo} alt="Razorpay" />
            </PaymentMethod>

            <PaymentMethod value="cod">
              <span className="payment-text">CASH ON DELIVERY</span>
            </PaymentMethod>
          </Radio.Group>

          <div style={{ textAlign: "right" }}>
            <PlaceOrderButton type="primary" onClick={handlePlaceOrder}>
              PLACE ORDER
            </PlaceOrderButton>
          </div>
        </div>
      </PaymentSection>
    </PageContainer>
  );
};

export default PlaceOrders;
