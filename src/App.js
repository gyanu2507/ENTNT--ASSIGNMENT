import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Product from './Components/Product';
import Order from './Components/Order';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul className="nav-list">
            {/* Brand Link */}
            <li className="nav-item">
              <Link to="/" className="nav-link brand-link">Entnt Front End Assignment</Link>
            </li>
            {/* Dashboard Link */}
            <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>
            {/* Products Link */}
            <li className="nav-item">
              <Link to="/product" className="nav-link">Products</Link>
            </li>
            {/* Orders Link */}
            <li className="nav-item">
              <Link to="/order" className="nav-link">Orders</Link>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <div className="content">
          <Routes>
            {/* Dashboard Route */}
            <Route path="/" element={<Dashboard />} />
            {/* Products Route */}
            <Route path="/product" element={<Product />} />
            {/* Orders Route */}
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
