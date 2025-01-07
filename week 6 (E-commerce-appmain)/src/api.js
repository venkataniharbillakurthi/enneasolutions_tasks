const API_BASE_URL = 'http://localhost:3000';

// Products
export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
};

// Best Sellers
export const fetchBestSellers = async () => {
  const response = await fetch(`${API_BASE_URL}/products?bestseller=true`);
  return response.json();
};

// Related Products
export const fetchRelatedProducts = async (category, subCategory) => {
  const response = await fetch(
    `${API_BASE_URL}/products?category=${category}&subCategory=${subCategory}`
  );
  return response.json();
};



// Get Single Product
export const fetchProduct = async (productId) => {
  const response = await fetch(`${API_BASE_URL}/products?_id=${productId}`);
  const data = await response.json();
  if (data.length === 0) {
    throw new Error('Product not found');
  }
  return data[0];
};

// Create Product
export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return response.json();
};

// Users
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  return response.json();
};

// Orders
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const fetchOrders = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`);
  return response.json();
};
