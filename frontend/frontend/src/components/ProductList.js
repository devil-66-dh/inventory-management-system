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
  if (error) return <div style={{ color: "#ff6666", background: '#330000', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>Error: {error}</div>;

  return (
    <div>
  <h2 style={{ color: '#f0f0f0', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>📋 Product Inventory</h2>
      
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
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)', borderColor: '#444', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #333, #444)', color: '#f0f0f0' }}>
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
                backgroundColor: p.quantity < 5 ? "#330000" : "#2d2d2d",
                color: '#f0f0f0'
              }}>
                <td style={{ textAlign: "center", borderColor: '#444' }}>{p.id}</td>
                <td style={{ color: '#f0f0f0' }}>{p.name}</td>
                <td style={{ textAlign: "center", color: '#f0f0f0' }}>{p.quantity}</td>
                <td style={{ textAlign: "right", color: '#d4a500' }}>${p.price.toFixed(2)}</td>
                <td style={{ textAlign: "center", color: p.quantity < 5 ? '#ff6666' : '#90ee90' }}>
                  {p.quantity < 5 ? "⚠ Low Stock" : "✅ OK"}
                </td>
                <td style={{ textAlign: "center", borderColor: '#444' }}>
                  <button 
                    onClick={() => handleEdit(p)}
                    style={{ 
                      background: 'linear-gradient(145deg, #b0b0b0, #888)',
                      color: "#1a1a1a",
                      padding: "8px 16px",
                      marginRight: "5px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    style={{
                      background: 'linear-gradient(145deg, #666, #444)',
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
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