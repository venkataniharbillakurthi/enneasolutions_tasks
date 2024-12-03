import React from 'react';


function Home() {
  return (
    <div>

          <div className="marq">
      <div className="scroll-text">
        Today Special offer on T-Shirt up to 30%
      </div>
    </div>

      
      <h2>Product Categories</h2>
      <div className="roundimage">
        <div className="image image1">
          <img
            src="https://img.freepik.com/free-photo/young-handsome-hipster-man-isolated-white-studio-background-stylish-outfit-denim-shirt-trousers-hat-sunglasses-standing-chair-cheerful-happy-smiling-positive-success-cheerful-thumb-up_285396-1512.jpg?uid=R92718993&ga=GA1.1.472320102.1676296645&semt=ais_hybrid"
            alt="Mens category"
          />
          <p>Mens</p>
        </div>
        <div className="image image2">
          <img
            src="https://img.freepik.com/free-photo/sensual-stylish-woman-grey-hat-blouse-gazing_176420-20652.jpg?uid=R92718993&ga=GA1.1.472320102.1676296645&semt=ais_hybrid"
            alt="Womens category"
          />
          <p>Womens</p>
        </div>
        <div className="image image3">
          <img
            src="https://img.freepik.com/free-photo/cute-stylish-children_155003-8330.jpg?uid=R92718993&ga=GA1.1.472320102.1676296645&semt=ais_hybrid"
            alt="Kids category"
          />
          <p>Kids</p>
        </div>
      </div>

      <h1>Recommended Products</h1>

      <div id="main">

      </div>

    </div>
  );
}

export default Home;
