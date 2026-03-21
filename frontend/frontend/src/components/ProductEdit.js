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
      padding: "15px", 
      border: "2px solid #2196F3", 
      backgroundColor: "#e3f2fd",
      marginBottom: "15px",
      borderRadius: "5px"
    }}>
      <h3>Edit Product</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: "8px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            style={{ 
              padding: "8px 15px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
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
