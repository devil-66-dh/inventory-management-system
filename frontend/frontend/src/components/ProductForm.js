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
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>Add New Product</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
        style={{ margin: "5px", padding: "5px" }}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
        required
        style={{ margin: "5px", padding: "5px" }}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
        step="0.01"
        style={{ margin: "5px", padding: "5px" }}
      />
      <button 
        type="submit" 
        disabled={loading}
        style={{ margin: "5px", padding: "5px", cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;