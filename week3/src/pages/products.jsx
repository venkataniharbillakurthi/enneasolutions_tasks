import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ margin: '40px 20px' }}>Products</h2>
      <div id="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} className="card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '250px', textAlign: 'center' }}>
            <img src={product.image} alt="Product" style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
            <h2 style={{ fontSize: '16px', margin: '10px 0' }}>{product.title.slice(0, 50)}</h2>
            <p style={{ fontSize: '14px', color: '#555' }}>{product.description.slice(0, 50)}</p>
            <div className="btns" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button className="price" style={{ padding: '5px 10px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
                ${product.price}/-
              </button>
              <button className="rating" style={{ padding: '5px 10px', background: '#FFC107', color: '#fff', border: 'none', borderRadius: '4px' }}>
                <i className="fa-solid fa-star" style={{ marginRight: '5px' }}></i>
                {product.rating.rate}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
