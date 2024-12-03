import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'; 
import Login from './pages/login'; 
import Contact from './pages/contact'; 
import Products from './pages/products'; 
import Header from './components/Header';
import Footer from './components/Footer';

import './script';
function App() {
  return (
    <div>
      
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
