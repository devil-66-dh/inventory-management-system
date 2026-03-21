import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/ProductServices";
import ProductEdit from "./ProductEdit";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products...");
      const res = await getProducts();
      console.log("Products fetched:", res.data);
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        console.log("Deleting product:", id);
        await deleteProduct(id);
        console.log("Product deleted successfully");
        loadProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateComplete = () => {
    setEditingProduct(null);
    loadProducts();
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h2>📋 Product Inventory</h2>
      
      {editingProduct && (
        <ProductEdit 
          product={editingProduct}
          onUpdate={handleUpdateComplete}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {products.length === 0 ? (
        <p>No products found. Add one to get started!</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{
                backgroundColor: p.quantity < 5 ? "#ffcccc" : "white"
              }}>
                <td style={{ textAlign: "center" }}>{p.id}</td>
                <td>{p.name}</td>
                <td style={{ textAlign: "center" }}>{p.quantity}</td>
                <td style={{ textAlign: "right" }}>${p.price.toFixed(2)}</td>
                <td style={{ textAlign: "center" }}>
                  {p.quantity < 5 ? "⚠ Low Stock" : "✅ OK"}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button 
                    onClick={() => handleEdit(p)}
                    style={{ 
                      backgroundColor: "#2196F3",
                      color: "white",
                      padding: "6px 12px",
                      marginRight: "5px",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default ProductList;