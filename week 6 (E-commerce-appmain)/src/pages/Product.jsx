import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Rate, Divider, Space, Spin } from "antd";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import { fetchProduct } from "../api";

// Styled Components
const ProductContainer = styled.div`
  border-top: 2px solid #f0f0f0;
  padding-top: 40px;
  transition: opacity 0.5s ease-in;
`;

const ProductLayout = styled.div`
  display: flex;
  gap: 48px;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  overflow-x: auto;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: column;
    overflow-y: scroll;
    width: 18.7%;
    justify-content: normal;
  }
`;

const Thumbnail = styled.img`
  width: 24%;
  flex-shrink: 0;
  cursor: pointer;

  @media (min-width: 640px) {
    width: 100%;
    margin-bottom: 12px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: 640px) {
    width: 80%;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-top: 8px;
`;

const Price = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-top: 20px;
`;

const Description = styled.p`
  color: #666;
  margin-top: 20px;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

const SizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 32px 0;
`;

const SizeButton = styled(Button)`
  &.selected {
    border-color: #ff4d4f;
  }
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currency, addToCart, user } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProduct(productId);
        setProductData(data);
        setImage(data.image[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <ProductContainer style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </ProductContainer>
    );
  }

  if (!productData) {
    return (
      <ProductContainer>
        <h2>Product not found</h2>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <ProductLayout>
        <ImageSection>
          <ThumbnailContainer>
            {productData.image.map((item, index) => (
              <Thumbnail
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt={`${productData.name} thumbnail ${index + 1}`}
              />
            ))}
          </ThumbnailContainer>
          <MainImage src={image} alt={productData.name} />
        </ImageSection>

        <ProductInfo>
          <ProductTitle>{productData.name}</ProductTitle>
          <Space align="center">
            <Rate disabled defaultValue={productData.rating || 4} />
            <span>({productData.reviews || 0})</span>
          </Space>

          <Price>
            {currency}
            {productData.price}
          </Price>

          <Description>{productData.description}</Description>

          <SizeSection>
            <p>Select Size</p>
            <Space wrap>
              {productData.sizes.map((item, index) => (
                <SizeButton
                  key={index}
                  onClick={() => setSize(item)}
                  className={item === size ? "selected" : ""}
                >
                  {item}
                </SizeButton>
              ))}
            </Space>
          </SizeSection>

          <Button
            type="primary"
            size="large"
            onClick={() => {
              if (!user) {
                toast.error("Please login to add items to cart");
                navigate("/login");
                return;
              }
              if (!size) {
                toast.error("Please select a size");
                return;
              }
              addToCart(productData._id, size);
            }}
          >
            ADD TO CART
          </Button>

          <Divider style={{ margin: "32px 0", width: "80%" }} />

          <InfoText>
            <p>Category: {productData.category}</p>
            <p>Tags: {productData.tags?.join(", ") || "N/A"}</p>
          </InfoText>
        </ProductInfo>
      </ProductLayout>

      {productData.category && productData.subCategory && (
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      )}
    </ProductContainer>
  );
};

export default Product;
