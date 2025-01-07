import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;
  const [loading, setLoading] = useState(true);

  // User state management first
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      return null;
    }
  });
  const [users, setUsers] = useState([]);

  // Cart and orders state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return {};
    }
  });
  const [orders, setOrders] = useState([]);

  // Initialize products state
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("products");
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error("Error loading products from localStorage:", error);
      return [];
    }
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch users from server
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Check for existing session on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const foundUser = users.find((u) => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [users]);

  // Fetch orders after user is set
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await axios.get("http://localhost:3000/orders");
          // If admin, show all orders, otherwise filter for user's orders
          const filteredOrders =
            user.role === "admin"
              ? response.data
              : response.data.filter((order) => order.userId === user.id);
          setOrders(filteredOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Fetch products from server and merge with localStorage
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        const serverProducts = response.data;

        // Merge server products with localStorage products
        const localProducts = JSON.parse(
          localStorage.getItem("products") || "[]"
        );

        // Create a map of existing products by ID
        const productMap = new Map();

        // Add server products first
        serverProducts.forEach((product) => {
          productMap.set(product._id, product);
        });

        // Add local products, overwriting server products if they exist
        localProducts.forEach((product) => {
          productMap.set(product._id, product);
        });

        // Convert map back to array
        const mergedProducts = Array.from(productMap.values());

        setProducts(mergedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products from server");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Error saving products to localStorage:", error);
    }
  }, [products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const filterProducts = (searchQuery) => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description &&
          product.description.toLowerCase().includes(query))
    );
    setFilteredProducts(filtered);
  };

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      setUsers([...users, response.data]);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const loginUser = async (email, password) => {
    try {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("userId", foundUser.id);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast.success("Login successful!");
        return foundUser;
      } else {
        toast.error("Invalid credentials");
        return null;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return null;
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const placeOrder = async (orderData) => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      // Calculate total from cart items
      const itemsTotal = Object.entries(cartItems).reduce(
        (total, [productId, sizes]) => {
          const product = products.find((p) => p._id === productId);
          if (!product) return total;

          const quantityTotal = Object.values(sizes).reduce(
            (sum, quantity) => sum + quantity,
            0
          );
          return total + product.price * quantityTotal;
        },
        0
      );

      const orderTotal = itemsTotal + delivery_fee;

      const newOrder = {
        id: Date.now().toString(),
        userId: user.id,
        userEmail: user.email,
        items: cartItems,
        itemsTotal: itemsTotal,
        deliveryFee: delivery_fee,
        total: orderTotal,
        ...orderData,
        date: new Date().toISOString(),
        status: "Pending",
      };

      // Find user details
      const userDetails = users.find((u) => u.id === user.id);
      if (userDetails) {
        newOrder.userEmail = userDetails.email;
      }

      const response = await axios.post(
        "http://localhost:3000/orders",
        newOrder
      );
      setOrders([...orders, response.data]);

      // Clear cart after successful order
      setCartItems({});
      localStorage.removeItem("cartItems");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const addToCart = (itemId, size) => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!newCart[itemId]) {
        newCart[itemId] = {};
      }
      if (!newCart[itemId][size]) {
        newCart[itemId][size] = 0;
      }
      newCart[itemId][size] += 1;

      // Show success message after updating cart
      toast.success("Added to cart successfully");
      return newCart;
    });
  };

  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] && updated[itemId][size]) {
        if (updated[itemId][size] === 1) {
          delete updated[itemId][size];
          if (Object.keys(updated[itemId]).length === 0) {
            delete updated[itemId];
          }
        } else {
          updated[itemId][size] -= 1;
        }
      }
      return updated;
    });
  };

  const getCartCount = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      return 0;
    }

    return Object.values(cartItems).reduce((total, sizes) => {
      return (
        total +
        Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0)
      );
    }, 0);
  };

  const getCartTotal = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      return 0;
    }

    return Object.entries(cartItems).reduce((total, [productId, sizes]) => {
      const product = products.find((p) => p._id === productId);
      if (!product) return total;

      const quantityTotal = Object.values(sizes).reduce(
        (sum, quantity) => sum + quantity,
        0
      );
      return total + product.price * quantityTotal;
    }, 0);
  };

  const clearCart = () => {
    setCartItems({});
  };

  const addProduct = async (productData) => {
    try {
      // Send product to server
      const response = await axios.post(
        "http://localhost:3000/products",
        productData
      );
      const newProduct = response.data;

      // Update local state
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product to server");

      // Add to local state even if server fails
      setProducts((prev) => [...prev, productData]);
    }
  };

  const deleteProduct = (productId) => {
    try {
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Update order in the database
      const response = await axios.patch(
        `http://localhost:3000/orders/${orderId}`,
        {
          status: newStatus,
        }
      );

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const contextValue = {
    currency,
    delivery_fee,
    loading,
    user,
    users,
    cartItems,
    orders,
    products: filteredProducts,
    registerUser,
    loginUser,
    logout: logoutUser,
    placeOrder,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartCount,
    clearCart,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    filterProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
