import React, { useState } from "react";
import { addProduct } from "../services/ProductServices";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    imageUrl: ""
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
      setProduct({ name: "", quantity: "", price: "", imageUrl: "" });
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
      <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '1rem', fontWeight: 900, color: '#f9f6f0', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>Product Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
        style={{ margin: "5px 0", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#1a1a1a', color: '#ffffff', border: '1px solid #777', borderRadius: '7px', fontWeight: '700', letterSpacing: '0.03em', transition: 'all .2s ease' }}
      />
      <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '1rem', fontWeight: 900, color: '#f9f6f0', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>Quantity:</label>
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
        required
        style={{ margin: "5px 0", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#1a1a1a', color: '#ffffff', border: '1px solid #777', borderRadius: '7px', fontWeight: '700', letterSpacing: '0.03em', transition: 'all .2s ease' }}
      />
      <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '1rem', fontWeight: 900, color: '#f9f6f0', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>Price:</label>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
        step="0.01"
        style={{ margin: "5px 0", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#1a1a1a', color: '#ffffff', border: '1px solid #777', borderRadius: '7px', fontWeight: '700', letterSpacing: '0.03em', transition: 'all .2s ease' }}
      />
      <label style={{ display: 'block', margin: '8px 0 4px', fontSize: '1rem', fontWeight: 900, color: '#f9f6f0', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>Image URL:</label>
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={product.imageUrl || ''}
        onChange={handleChange}
        style={{ margin: "5px 0", padding: "12px", width: '100%', boxSizing: 'border-box', background: '#1a1a1a', color: '#ffffff', border: '1px solid #777', borderRadius: '7px', fontWeight: '700', letterSpacing: '0.03em', transition: 'all .2s ease' }}
      />
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          margin: "12px 0", 
          padding: "14px 24px", 
          background: 'linear-gradient(145deg, #d4af37, #c29d1d)',
          color: "#1a1a1a",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "900",
          fontSize: '16px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
          width: '100%',
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;