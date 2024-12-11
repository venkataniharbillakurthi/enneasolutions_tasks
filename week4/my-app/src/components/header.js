import React, { useState, useEffect} from 'react' 
import { Link } from 'react-router-dom'
import iconCart from '../assets/images/iconCart.png' 
import { useSelector, useDispatch } from 'react-redux' 
import { toggleStatusTab } from '../stores/cart'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #BF4F74;
    color: white;
  }
`;
const HeaderDoc = styled.header`
    display: flex;
    justify-content: space-between;
    algin-items: center;
    padding: 20px;
    background-color: #BF4F74;

    &:hover {
        background-color: gray;
    }
`;


const Header = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts])
    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    }
  return (
    <HeaderDoc>
        <Link to="/" >
        <StyledButton>Home</StyledButton></Link>
        <div className='w-10 h-10 bg-gray-100 rounded-full
        flex justify-center items-center relative cursor-pointer' onClick={handleOpenTabCart}>
            <img src={iconCart} alt="" className='w-6'/>
            <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
            w-5 h-5 rounded-full flex justify-center items-center'>{totalQuantity}</span>
        </div>
    </HeaderDoc>
  )
}


export default Header
