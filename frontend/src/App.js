import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header with Logo */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <img src="/logo.svg" alt="Inventory Logo" className="app-logo" />
          </div>
          <div className="header-text">
            <h1>Inventory Management System</h1>
            <p className="subtitle">Track, Manage & Organize Your Products</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <ProductForm />
        <ProductList />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Inventory Management System</h3>
            <p>
              Our Inventory Management System is a powerful, user-friendly solution designed to streamline your business operations. 
              Whether you're managing a small boutique or a large warehouse, our system provides real-time tracking and comprehensive management 
              tools to keep your products organized and accessible.
            </p>
          </div>
          <div className="footer-section">
            <h3>Key Features</h3>
            <ul>
              <li>✓ Real-time product tracking</li>
              <li>✓ Low stock alerts and notifications</li>
              <li>✓ Product image management</li>
              <li>✓ Grid and table view options</li>
              <li>✓ Easy CRUD operations</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Why Choose Us?</h3>
            <p>
              Built with modern technology and intuitive design, our system helps you make better inventory decisions. 
              Reduce waste, optimize stock levels, and improve your bottom line with our comprehensive management platform.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Inventory Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
