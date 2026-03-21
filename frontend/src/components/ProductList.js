import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/ProductServices';
import ProductEdit from './ProductEdit';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log('Products fetched:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error in ProductList:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id).then(() => {
        console.log('Product deleted');
        setProducts(products.filter(p => p.id !== id));
      }).catch(err => {
        console.error('Error deleting product:', err);
        setError('Failed to delete product');
      });
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2>Product Inventory</h2>
      {products.length === 0 ? (
        <p>No products found. Add one to get started!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ backgroundColor: product.quantity < 5 ? '#fff3cd' : 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.quantity}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>${product.price.toFixed(2)}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {product.quantity < 5 ? <span style={{ color: 'orange', fontWeight: 'bold' }}>Low Stock ⚠️</span> : 'In Stock ✓'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => setEditingProduct(product)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
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
      {editingProduct && (
        <ProductEdit
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductList;
