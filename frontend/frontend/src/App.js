import React from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Inventory Management System</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;