import React from 'react';


function Products() {
    async function fetchdata() {
      try {
          let response = await fetch("https://fakestoreapi.com/products");
          let data = await response.json();
          let referElement = document.getElementById("container"); 
          if (!referElement) {
              console.error("Element with id 'container' not found");
              return;
          }
          data.forEach(product => {
            
              const card = document.createElement("div");
              card.className = "card";

              const img = document.createElement("img");
              img.src = product.image;
              img.alt = "Product image";

              const title = document.createElement("h2");
              title.textContent = product.title.slice(0, 50);

              const description = document.createElement("p");
              description.textContent = product.description.slice(0, 50);

              const btns = document.createElement("div");
              btns.className = "btns";

              const priceButton = document.createElement("button");
              priceButton.className = "price";
              priceButton.textContent = `$${product.price}/-`;

              const ratingButton = document.createElement("button");
              ratingButton.className = "rating";
              const starIcon = document.createElement("i");
              starIcon.className = "fa-solid fa-star";
              ratingButton.appendChild(starIcon);
              ratingButton.appendChild(document.createTextNode(product.rating.rate));

              btns.appendChild(priceButton);
              btns.appendChild(ratingButton);

              card.appendChild(img);
              card.appendChild(title);
              card.appendChild(description);
              card.appendChild(btns);

              referElement.appendChild(card);
          });
      } catch (error) {
          console.error("Error fetching product data:", error);
      }
  }
  fetchdata();
  return (
    <div>
   
      <h2 style={{ margin: '40px 20px' }}>Products</h2> 
      <div  id="container">
       
      </div>

   
    </div>
  );
}

export default Products;
