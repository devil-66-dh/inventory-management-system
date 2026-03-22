import React, { useState } from "react";
import { updateProduct } from "../services/ProductServices";

function ProductEdit({ product, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    name: product.name,
    quantity: product.quantity,
    price: product.price
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Updating product:", product.id, formData);
      const response = await updateProduct(product.id, formData);
      console.log("Update response:", response);
      alert("Product Updated Successfully!");
      onUpdate();
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.response?.data?.message || err.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      border: "2px solid #b0b0b0", 
      background: 'linear-gradient(145deg, #333, #222)',
      marginBottom: "15px",
      borderRadius: "10px",
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
    }}>
      <h3 style={{ color: '#f0f0f0', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Edit Product</h3>
      {error && <div style={{ color: "#ff6666", background: '#330000', padding: '10px', borderRadius: '5px', marginBottom: "10px" }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: '#f0f0f0' }}>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", boxSizing: "border-box", background: '#2d2d2d', color: '#f0f0f0', border: '1px solid #555', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: '#f0f0f0' }}>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "12px", boxSizing: "border-box", background: '#2d2d2d', color: '#f0f0f0', border: '1px solid #555', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: '#f0f0f0' }}>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            style={{ width: "100%", padding: "12px", boxSizing: "border-box", background: '#2d2d2d', color: '#f0f0f0', border: '1px solid #555', borderRadius: '5px' }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: "12px 20px",
              background: 'linear-gradient(145deg, #b0b0b0, #888)',
              color: "#1a1a1a",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              flex: 1
            }}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            style={{ 
              padding: "12px 20px",
              background: 'linear-gradient(145deg, #666, #444)',
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              flex: 1
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;
