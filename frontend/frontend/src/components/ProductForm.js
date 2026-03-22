import React, { useState } from "react";
import { addProduct } from "../services/ProductServices";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log("Submitting product:", product);
      const response = await addProduct(product);
      console.log("Response:", response);
      alert("Product Added Successfully!");
      setProduct({ name: "", quantity: "", price: "" });
      // Reload to refresh the product list
      window.location.reload();
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.response?.data?.message || err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "20px", border: "2px solid #444", background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      <h3 style={{ color: '#f0f0f0', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Add New Product</h3>
      {error && <div style={{ color: "#ff6666", background: '#330000', padding: '10px', borderRadius: '5px', marginBottom: "10px" }}>{error}</div>}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
        style={{ margin: "5px", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#333', color: '#f0f0f0', border: '1px solid #555', borderRadius: '5px' }}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
        required
        style={{ margin: "5px", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#333', color: '#f0f0f0', border: '1px solid #555', borderRadius: '5px' }}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
        step="0.01"
        style={{ margin: "5px", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#333', color: '#f0f0f0', border: '1px solid #555', borderRadius: '5px' }}
      />
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          margin: "5px", 
          padding: "12px 24px", 
          background: 'linear-gradient(145deg, #b0b0b0, #888)',
          color: "#1a1a1a",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          width: '100%'
        }}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;