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
        <p>&copy; 2026 Inventory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
