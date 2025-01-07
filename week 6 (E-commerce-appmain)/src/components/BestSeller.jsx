import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchBestSellers } from "../api";

const { Text } = Typography;

// Styled Components
const BestSellerContainer = styled.div`
  margin: 40px 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  padding: 32px 0;
`;

const StyledDescription = styled(Text)`
  && {
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
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  padding: 0 24px;
`;

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBestSellers = async () => {
      setLoading(true);
      try {
        const data = await fetchBestSellers();
        setBestSeller(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBestSellers();
  }, []);

  if(loading){
    return <div>loading...</div>

  }

  return (
    <BestSellerContainer>
      {/* Header */}
      <SectionHeader>
        <Title text1={"BEST"} text2={"SELLERS"} />
        <StyledDescription>
          Explore our most popular and highly rated fashion pieces. These
          customer favorites showcase the perfect blend of style, quality, and
          value that keeps our shoppers coming back for more.
        </StyledDescription>
      </SectionHeader>

      {/* Product Grid */}
      <ProductGrid>
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </ProductGrid>
    </BestSellerContainer>
  );
};

export default BestSeller;
