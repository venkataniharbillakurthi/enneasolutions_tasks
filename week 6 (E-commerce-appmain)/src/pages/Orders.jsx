import React, { useContext } from "react";
import styled from "styled-components";
import { Card, Button, Tag, Empty, Space, Typography, Divider } from "antd";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`;

const ContentWrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 16px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const OrderCard = styled(Card)`
  margin-bottom: 24px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ProductImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const Orders = () => {
  const { orders, products, user, currency } = useContext(ShopContext);
  const navigate = useNavigate();

  // Filter orders for the current user
  const userOrders = orders.filter(order => order.userId === user?.id);

  const getStatusTag = (status) => {
    const statusConfig = {
      Pending: { color: "warning" },
      Processing: { color: "processing" },
      Shipped: { color: "purple" },
      Delivered: { color: "success" },
      default: { color: "default" },
    };

    return (
      <Tag color={statusConfig[status]?.color || statusConfig.default.color}>
        {status}
      </Tag>
    );
  };

  // Calculate order total
  const calculateOrderTotal = (items) => {
    let total = 0;
    Object.entries(items).forEach(([productId, sizes]) => {
      const product = products.find(p => p._id === productId);
      if (product) {
        Object.values(sizes).forEach(quantity => {
          total += product.price * quantity;
        });
      }
    });
    return total;
  };

  // Check if user is logged in
  if (!user) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Title text1="YOUR" text2="ORDERS" />
          <Empty
            description={
              <div>
                <p>Please login to view your orders</p>
                <Button type="primary" onClick={() => navigate("/login")}>
                  Login Now
                </Button>
              </div>
            }
            style={{ marginTop: 32 }}
          />
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <HeaderSection>
          <Title text1="YOUR" text2="ORDERS" />
        </HeaderSection>

        {userOrders.length === 0 ? (
          <Empty 
            description={
              <div>
                <p>No orders found</p>
                <Button type="primary" onClick={() => navigate("/collection")}>
                  Start Shopping
                </Button>
              </div>
            }
          />
        ) : (
          <Space direction="vertical" style={{ width: "100%" }}>
            {userOrders.map((order) => (
              <OrderCard key={order.id}>
                <OrderHeader>
                  <Space direction="vertical">
                    <Space>
                      <Text strong>Order ID:</Text>
                      <Text>{order.id}</Text>
                    </Space>
                    <Space>
                      <Text strong>Name:</Text>
                      <Text>{order.firstName} {order.lastName}</Text>
                    </Space>
                    <Space>
                      <Text strong>Delivery Address:</Text>
                      <Text>{order.street}, {order.city}, {order.country} - {order.zipcode}</Text>
                    </Space>
                  </Space>
                  <Space direction="vertical" align="end">
                    <Text>
                      Order Date: {new Date(order.date).toLocaleDateString()}
                    </Text>
                    {getStatusTag(order.status)}
                  </Space>
                </OrderHeader>

                <div>
                  {Object.entries(order.items).map(([productId, sizes]) => {
                    const product = products.find(p => p._id === productId);
                    if (!product) return null;

                    return (
                      <OrderItem key={productId}>
                        <ProductImage
                          src={product.image[0]}
                          alt={product.name}
                        />
                        <ProductInfo>
                          <Text strong>{product.name}</Text>
                          <div>
                            {Object.entries(sizes).map(([size, quantity]) => (
                              <Text key={size} type="secondary" style={{ display: 'block' }}>
                                Size: {size}, Quantity: {quantity}
                              </Text>
                            ))}
                          </div>
                          <div>
                            <Text type="secondary">
                              Price: {currency}{product.price} × {Object.values(sizes).reduce((a, b) => a + b, 0)}
                            </Text>
                          </div>
                        </ProductInfo>
                      </OrderItem>
                    );
                  })}
                </div>

                <Divider />

                <div style={{ textAlign: "right" }}>
                  <Text strong>Total: {currency}{calculateOrderTotal(order.items).toFixed(2)}</Text>
                </div>
              </OrderCard>
            ))}
          </Space>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default Orders;
