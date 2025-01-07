import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { Row, Col, Divider } from "antd";
import styled from "styled-components";

// Styled Components
const CartTotalContainer = styled.div`
  width: 100%;
  padding: 16px;
`;

const CartTotalItem = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const CartTotal = () => {
  const { currency, delivery_fee, getCartTotal } = useContext(ShopContext);

  return (
    <CartTotalContainer>
      <Title text1={"CART"} text2={"TOTALS"} />
      <div>
        <CartTotalItem>
          <Col span={12}>Subtotal</Col>
          <Col span={12}>
            {currency} {getCartTotal()}.00
          </Col>
        </CartTotalItem>
        <Divider />
        <CartTotalItem>
          <Col span={12}>Shipping Fee</Col>
          <Col span={12}>
            {currency} {delivery_fee}.00
          </Col>
        </CartTotalItem>
        <Divider />
        <CartTotalItem>
          <Col span={12}>Total</Col>
          <Col span={12}>
            {currency} {getCartTotal() === 0 ? 0 : getCartTotal() + delivery_fee}.00
          </Col>
        </CartTotalItem>
      </div>
    </CartTotalContainer>
  );
};

export default CartTotal;
