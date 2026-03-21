import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/ProductServices';
import ProductEdit from './ProductEdit';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

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
    <div style={{ border: '1px solid #e0e0e0', padding: '30px', borderRadius: '12px', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ color: '#2196F3', fontSize: '1.8em', margin: 0 }}>📦 Product Inventory ({products.length})</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '8px 15px',
              backgroundColor: viewMode === 'grid' ? '#4CAF50' : '#e0e0e0',
              color: viewMode === 'grid' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
              fontWeight: viewMode === 'grid' ? '600' : '500',
              transition: 'all 0.3s ease'
            }}
          >
            🔲 Grid View
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '8px 15px',
              backgroundColor: viewMode === 'table' ? '#4CAF50' : '#e0e0e0',
              color: viewMode === 'table' ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: viewMode === 'table' ? '600' : '500',
              transition: 'all 0.3s ease'
            }}
          >
            📋 Table View
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p>No products found. Add one to get started!</p>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    backgroundColor: '#f0f0f0'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{product.name}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p style={{ margin: '10px 0', padding: '5px', borderRadius: '4px', backgroundColor: product.quantity < 5 ? '#fff3cd' : '#c8e6c9' }}>
                  {product.quantity < 5 ? <span style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ Low Stock</span> : <span style={{ color: 'green', fontWeight: 'bold' }}>✓ In Stock</span>}
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button
                    onClick={() => setEditingProduct(product)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Image</th>
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
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </td>
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
