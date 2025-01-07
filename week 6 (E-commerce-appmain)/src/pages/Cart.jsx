import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Empty, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

// Styled Components
const CartWrapper = styled.div`
  padding-top: 14px;
  border-top: 1px solid #f0f0f0;
`;

const CartTitle = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const CartItem = styled.div`
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: 4fr 0.5fr 0.5fr;
  align-items: center;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 4fr 2fr 0.5fr;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

const ItemImage = styled.img`
  width: 64px;

  @media (min-width: 640px) {
    width: 80px;
  }
`;

const ItemDetails = styled.div`
  font-size: 16px;

  .name {
    margin-bottom: 8px;
    font-weight: 500;
  }

  .price {
    color: #666;
    font-size: 14px;

    .size {
      margin-top: 4px;
      color: #999;
    }
  }
`;

const RemoveIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const CheckoutSection = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;

  .checkout-wrapper {
    width: 100%;
    max-width: 400px;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 48px 0;
`;

// Ant Design Button Styling
const StyledButton = styled(Button)`
  border: none;
  padding: 12px 32px;
  font-size: 14px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const updateQuantity = (productId, size, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId, size);
    } else {
      const diff = quantity - (cartItems[productId]?.[size] || 0);
      for (let i = 0; i < Math.abs(diff); i++) {
        if (diff > 0) {
          addToCart(productId, size);
        } else {
          removeFromCart(productId, size);
        }
      }
    }
  };

  return (
    <CartWrapper>
      <CartTitle>
        <Title text1="YOUR" text2="CART" />
      </CartTitle>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <CartItem key={index}>
              <ItemInfo>
                <ItemImage src={productData.image[0]} alt={productData.name} />
                <ItemDetails>
                  <p className="name">{productData.name}</p>
                  <div className="price">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="size">{item.size}</p>
                  </div>
                </ItemDetails>
              </ItemInfo>
              <Input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
              />
              <RemoveIcon
                src={assets.bin_icon}
                alt="Remove item"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </CartItem>
          );
        })}
      </div>
      {cartData.length > 0 ? (
        <CheckoutSection>
          <div className="checkout-wrapper">
            <CartTotal />
            <div>
              <StyledButton
                onClick={() => navigate("/place-order")}
                block
                size="large"
                type="primary"
              >
                Check Out
              </StyledButton>
            </div>
          </div>
        </CheckoutSection>
      ) : (
        <EmptyCart>
          <Empty description="Your cart is empty" />
          <StyledButton
            onClick={() => navigate("/collection")}
            size="large"
            style={{ marginTop: "16px" }}
          >
            Continue Shopping
          </StyledButton>
        </EmptyCart>
      )}
    </CartWrapper>
  );
};

export default Cart;
