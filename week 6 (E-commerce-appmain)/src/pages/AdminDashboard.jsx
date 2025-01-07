import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import styled from "styled-components";
import {
  Button,
  Input,
  Form,
  Select,
  Card,
  Typography,
  DatePicker,
  Space,
  Tag,
  Empty,
} from "antd";
import moment from "moment";
import { toast } from "react-toastify";


const { Title: AntTitle, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DashboardContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const StyledButton = styled(Button)`
  &.active {
    background-color: #1890ff;
    color: white;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  .ant-card-cover img {
    height: 280px;
    object-fit: cover;
  }
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 32px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OrdersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const OrderCard = styled(Card)`
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const OrderItemCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin: 8px 0;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const AdminDashboard = () => {

  const {
    products,
    orders,
    addProduct,
    updateOrderStatus,
    deleteProduct,
    currency,
    
    loading,
    delivery_fee
  } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState("products");
  const [startDate, setStartDate] = useState(moment().subtract(7, "days"));
  const [endDate, setEndDate] = useState(moment());

  const [form] = Form.useForm();

  // Calculate order total
  const calculateOrderTotal = (orderItems) => {
    const itemsTotal = Object.entries(orderItems).reduce((total, [productId, sizes]) => {
      const product = products.find(p => p._id === productId);
      if (!product) return total;
      
      const quantityTotal = Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0);
      return total + (product.price * quantityTotal);
    }, 0);

    return {
      itemsTotal,
      deliveryFee: delivery_fee,
      total: itemsTotal + delivery_fee
    };
  };

  // Show loading state
  if (loading) {
    return (
      <DashboardContainer>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <AntTitle level={2}>Admin Dashboard</AntTitle>
          <div>Loading products...</div>
        </Space>
      </DashboardContainer>
    );
  }

  

  const handleAddProduct = async (values) => {
    try {
      // Convert price to number
      const price = parseFloat(values.price);
      if (isNaN(price) || price <= 0) {
        toast.error("Please enter a valid price");
        return;
      }

      // Convert comma-separated image URLs to array
      const imageUrls = values.image.split(',').map(url => url.trim());
      
      // Validate URLs
      if (!imageUrls.length || !imageUrls[0]) {
        toast.error("Please add at least one image URL");
        return;
      }

      if (!imageUrls.every(url => isValidUrl(url))) {
        toast.error("Please ensure all image URLs are valid");
        return;
      }

      const productData = {
        ...values,
        price,
        image: imageUrls,
        _id: Date.now().toString(),
        date: new Date().toISOString(),
        bestseller: false
      };

      await addProduct(productData);
      
      // Reset form after successful addition
      form.resetFields();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product');
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const isValidUrl = (url) => {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

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

  return (
    <DashboardContainer>
      <AntTitle level={2}>Admin Dashboard</AntTitle>

      <TabButtons>
        <StyledButton
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Manage Products ({products?.length || 0})
        </StyledButton>
        <StyledButton
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Manage Orders ({orders?.length || 0})
        </StyledButton>
      </TabButtons>

      {activeTab === "products" && (
        <>
          <FormContainer>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddProduct}
              initialValues={{
                category: "Men",
                sizes: ["S", "M", "L", "XL"],
              }}
            >
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input placeholder="Product Name" />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input type="number" placeholder="Price" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Select>
                  <Option value="Men">Men</Option>
                  <Option value="Women">Women</Option>
                  <Option value="Kids">Kids</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Available Sizes"
                name="sizes"
                rules={[{ required: true, message: "Please select at least one size" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select sizes"
                  options={[
                    { value: "S", label: "Small (S)" },
                    { value: "M", label: "Medium (M)" },
                    { value: "L", label: "Large (L)" },
                    { value: "XL", label: "Extra Large (XL)" },
                    { value: "XXL", label: "XXL" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Image URLs (separate multiple URLs with commas)"
                name="image"
                rules={[{ required: true, message: "Please enter image URLs" }]}
              >
                <Input.TextArea
                  placeholder="Image URLs"
                  onBlur={(e) => {
                    const urls = e.target.value.split(',').map(url => url.trim());
                    urls.forEach(url => {
                      if (!isValidUrl(url)) {
                        toast.error(`Invalid URL format: ${url}`);
                      }
                    });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add Product
                </Button>
              </Form.Item>
            </Form>
          </FormContainer>

          <ProductGrid>
            {products && products.length > 0 ? (
              products.map((product) => (
                <StyledCard
                  key={product._id}
                  cover={
                    <img
                      alt={product.name}
                      src={product.image[0]}
                      onError={(e) => {
                        e.target.src = "/src/assets/placeholder.png";
                      }}
                    />
                  }
                  actions={[
                    <Button danger onClick={() => deleteProduct(product._id)}>
                      Delete
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text>Price: {currency}{product.price}</Text>
                        <Text>Category: {product.category}</Text>
                        <Text>Sizes: {product.sizes.join(", ")}</Text>
                      </Space>
                    }
                  />
                </StyledCard>
              ))
            ) : (
              <Empty description="No products available" />
            )}
          </ProductGrid>
        </>
      )}

      {activeTab === "orders" && (
        <OrdersContainer>
          <Space direction="vertical" style={{ width: '100%', marginBottom: "24px" }}>
            <Text>Filter Orders by Date:</Text>
            <RangePicker
              value={[startDate, endDate]}
              onChange={handleDateChange}
              disabledDate={(current) => current && current > moment().endOf("day")}
            />
          </Space>
          
          {orders.length > 0 ? (
            orders
              .filter((order) => moment(order.date).isBetween(startDate, endDate, "day", "[]"))
              .map((order) => (
                <OrderCard
                  key={order.id}
                  title={
                    <Space>
                      <Text strong>Order ID: {order.id}</Text>
                      {getStatusTag(order.status)}
                    </Space>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>Date: {new Date(order.date).toLocaleString()}</Text>
                    <Text>Customer Email: {order.userEmail}</Text>
                    <Text>Customer ID: {order.userId}</Text>
                    
                    <div style={{ margin: '16px 0' }}>
                      <Text strong>Status:</Text>
                      <Select
                        value={order.status}
                        style={{ width: 200, marginLeft: 8 }}
                        onChange={(value) => handleStatusUpdate(order.id, value)}
                      >
                        <Option value="Pending">Pending</Option>
                        <Option value="Processing">Processing</Option>
                        <Option value="Shipped">Shipped</Option>
                        <Option value="Delivered">Delivered</Option>
                      </Select>
                    </div>

                    <div>
                      <Text strong>Items:</Text>
                      {order.items && Object.keys(order.items).length > 0 ? (
                        Object.entries(order.items).map(([productId, sizes]) => {
                          const product = products.find(p => p._id === productId);
                          if (!product) return null;
                          
                          return (
                            <OrderItemCard key={productId}>
                              <ProductImage src={product.image[0]} alt={product.name} />
                              <Space direction="vertical">
                                <Text strong>{product.name}</Text>
                                {Object.entries(sizes).map(([size, quantity]) => (
                                  <Text key={size}>
                                    Size: {size}, Quantity: {quantity}
                                  </Text>
                                ))}
                                <Text>Price: {currency}{product.price}</Text>
                              </Space>
                            </OrderItemCard>
                          );
                        })
                      ) : (
                        <Text type="secondary">No items in this order</Text>
                      )}
                    </div>

                    <div style={{ textAlign: 'right', marginTop: 16 }}>
                      <Space direction="vertical" align="end">
                        {(() => {
                          const totals = calculateOrderTotal(order.items);
                          return (
                            <>
                              <Text>Items Total: {currency}{totals.itemsTotal.toFixed(2)}</Text>
                              <Text>Delivery Fee: {currency}{totals.deliveryFee.toFixed(2)}</Text>
                              <Text strong>Order Total: {currency}{totals.total.toFixed(2)}</Text>
                            </>
                          );
                        })()}
                      </Space>
                    </div>
                  </Space>
                </OrderCard>
              ))
          ) : (
            <Empty description="No orders found" />
          )}
        </OrdersContainer>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
