import React from 'react'

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="f1">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/12/15/53/shopping-cart-150504_1280.png"
            alt="Shopping cart logo"
            width="100px"
          />
        </div>
        <div className="f2">
          <p>
            ZStore is a one-stop e-commerce platform where shopping meets
            convenience and choice. Whether you're searching for the latest
            electronics, trending fashion, home essentials, or unique gifts,
            ZStore brings together a wide range of products to meet every need and
            style. Our commitment is to provide an easy, reliable, and rewarding
            shopping experience for every user.
          </p>
          <p><i className="fa-solid fa-phone-volume"></i> 1800-130-4345</p>
          <p><i className="fa-regular fa-envelope"></i> support@Zstore.com</p>
        </div>
      </div>

      <div className="footer2">
        <p>
          <i className="fa-regular fa-copyright"></i> Zstore Pvt Ltd. All Rights
          Reserved
        </p>
      </div> 
    </div>
  )
}

export default Footer
