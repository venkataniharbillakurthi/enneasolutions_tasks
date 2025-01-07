import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const ProductContainer = styled.div`
  display: block;
`;

const ProductLink = styled(Link)`
  color: #4a4a4a;
  cursor: pointer;
  text-decoration: none;
`;

const ProductImageContainer = styled.div`
  overflow: hidden;
  &:hover img {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductName = styled.p`
  padding-top: 0.75rem;
  padding-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #4b4b4b;
`;

const ProductPrice = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b4b4b;
`;

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Handle both string and array image props
  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <ProductContainer>
      <ProductLink to={`/product/${id}`}>
        <ProductImageContainer>
          <ProductImage src={imageUrl} alt={name} />
        </ProductImageContainer>
        <ProductName>{name}</ProductName>
        <ProductPrice>{currency}{price}</ProductPrice>
      </ProductLink>
    </ProductContainer>
  );
};

export default ProductItem;
