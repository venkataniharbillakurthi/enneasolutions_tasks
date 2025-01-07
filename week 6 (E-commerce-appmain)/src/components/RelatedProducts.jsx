import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from './Title';
import ProductItem from './ProductItem';
import { fetchRelatedProducts } from "../api";

// Styled Components
const RelatedProductsContainer = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 2.25rem;
  padding: 0.5rem 0;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 1.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const RelatedProducts = ({ category, subCategory }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (category && subCategory) {
        setLoading(true);
        try {
          const data = await fetchRelatedProducts(category, subCategory);
          setRelated(data.slice(0, 5));
        } catch (error) {
          console.error("Error fetching related products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadRelatedProducts();
  }, [category, subCategory]);

  if (related.length === 0) return null;

  if(loading)
  {
    return <div>loading ...</div>
  }

  return (
    <RelatedProductsContainer>
      <TitleContainer>
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </TitleContainer>
      <ProductsGrid>
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </ProductsGrid>
    </RelatedProductsContainer>
  );
};

export default RelatedProducts;
