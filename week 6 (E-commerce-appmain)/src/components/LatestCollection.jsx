import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Row, Col } from "antd";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../api";

const { Text, Title: AntTitle } = Typography;

// Styled Components
const CollectionContainer = styled.div`
  margin: 40px 0;
`;

const CollectionHeader = styled.div`
  text-align: center;
  padding: 32px 0;
`;

const Description = styled(Text)`
  margin: 0 auto;
  display: block;
  color: #606060;
  max-width: 75%;
  font-size: 14px;

  @media (min-width: 640px) {
    font-size: 16px;
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ProductGrid = styled(Row)`
  gap: 24px;
`;

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setLatestProducts(data.slice(0, 9));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CollectionContainer>
      {/* Header */}
      <CollectionHeader>
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <Description>
          Discover our newest arrivals featuring trendy designs and premium
          quality fabrics. Stay ahead in fashion with our carefully curated
          collection that combines style, comfort, and affordability.
        </Description>
      </CollectionHeader>

      {/* Product Grid */}
      <ProductGrid gutter={[16, 24]} justify="center">
        {latestProducts.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </Col>
        ))}
      </ProductGrid>
    </CollectionContainer>
  );
};

export default LatestCollection;
