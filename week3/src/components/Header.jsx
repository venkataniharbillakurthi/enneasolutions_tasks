import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
         <div class="nav">
        <div class="logo">
            <img src="https://cdn.pixabay.com/photo/2013/07/12/15/53/shopping-cart-150504_1280.png" alt="no image" width="100px" style={{padding: "10px;"}} />
        </div>
        <div class="memu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div class="btns">
            <Link to="/login" id='linkk'>Login</Link>
        </div>
    </div>
    </div>
  )
}

export default Header
