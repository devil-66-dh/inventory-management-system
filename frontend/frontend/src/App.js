import React from "react";
import './App.css';
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/image.png" className="App-logo" alt="Inventory Icon" />
        <h1>Inventory Management System</h1>
        <ProductForm />
        <ProductList />
      </header>
    </div>
  );
}

export default App;
