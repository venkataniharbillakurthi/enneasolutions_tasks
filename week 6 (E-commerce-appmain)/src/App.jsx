import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Spin } from "antd";

// Lazy loading of pages
const Home = React.lazy(() => import("./pages/Home"));
const Collection = React.lazy(() => import("./pages/Collection"));
const About = React.lazy(() => import("./pages/About"));
const Login = React.lazy(() => import("./pages/Login"));
const PlaceOrders = React.lazy(() => import("./pages/PlaceOrders"));
const Product = React.lazy(() => import("./pages/Product"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Cart = React.lazy(() => import("./pages/Cart"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const Profile = React.lazy(() => import("./pages/Profile"));

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vm] lg:px-[pvm]">
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<Spin />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrders />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
