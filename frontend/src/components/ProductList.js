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
    <div style={{ border: '2px solid #E8E0D5', padding: '35px', borderRadius: '20px', backgroundColor: '#FEFEF9', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', animation: 'fadeIn 0.6s ease 0.2s both' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ color: '#FF8E53', fontSize: '2em', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>📦 Products ({products.length})</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '12px 20px',
              background: viewMode === 'grid' ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' : '#E8E0D5',
              color: viewMode === 'grid' ? 'white' : '#2c2c2c',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: viewMode === 'grid' ? '0 4px 15px rgba(255, 107, 107, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
              transform: viewMode === 'grid' ? 'scale(1)' : 'scale(1)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
              if (viewMode === 'grid') {
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) translateY(0)';
              if (viewMode === 'grid') {
                e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
              }
            }}
          >
            🔲 Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '12px 20px',
              background: viewMode === 'table' ? 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' : '#E8E0D5',
              color: viewMode === 'table' ? 'white' : '#2c2c2c',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: viewMode === 'table' ? '0 4px 15px rgba(255, 107, 107, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
              transform: viewMode === 'table' ? 'scale(1)' : 'scale(1)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05) translateY(-2px)';
              if (viewMode === 'table') {
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) translateY(0)';
              if (viewMode === 'table') {
                e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
              }
            }}
          >
            📋 Table
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p>No products found. Add one to get started!</p>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{
                border: '2px solid #E8E0D5',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                backgroundColor: 'white',
                animation: `fadeIn 0.5s ease ${index * 0.1}s both`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
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
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: '800', color: '#000000', textShadow: '0 2px 4px rgba(255, 255, 255, 0.5), 0 0 10px rgba(0, 0, 0, 0.1)', letterSpacing: '-0.5px' }}>{product.name}</h3>
                <p style={{ margin: '8px 0', color: '#000000', fontWeight: '700', fontSize: '16px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' }}>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
                <p style={{ margin: '8px 0', color: '#000000', fontWeight: '700', fontSize: '16px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' }}>
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </p>
                <p style={{ margin: '10px 0', padding: '5px', borderRadius: '4px', backgroundColor: product.quantity < 5 ? '#fff3cd' : '#c8e6c9' }}>
                  {product.quantity < 5 ? <span style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ Low Stock</span> : <span style={{ color: 'green', fontWeight: 'bold' }}>✓ In Stock</span>}
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
                  <button
                    onClick={() => setEditingProduct(product)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1) translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = 'scale(0.95) translateY(0)';
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255, 71, 87, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1) translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255, 71, 87, 0.3)';
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = 'scale(0.95) translateY(0)';
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', animation: 'fadeIn 0.6s ease 0.2s both' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', color: 'white', fontWeight: '700' }}>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>Image</th>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>ID</th>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>Name</th>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>Quantity</th>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>Price</th>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>Status</th>
              <th style={{ padding: '14px', textAlign: 'left', border: '1px solid #E8E0D5' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ backgroundColor: product.quantity < 5 ? '#fff3cd' : '#FEFEF9', borderBottom: '1px solid #E8E0D5', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = product.quantity < 5 ? '#FFE5CC' : '#f0ebe3';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(255, 107, 107, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = product.quantity < 5 ? '#fff3cd' : '#FEFEF9';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <td style={{ padding: '12px', border: '1px solid #E8E0D5' }}>
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </td>
                <td style={{ padding: '12px', border: '1px solid #E8E0D5', color: '#000000', fontWeight: '700', fontSize: '15px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' }}>{product.id}</td>
                <td style={{ padding: '12px', border: '1px solid #E8E0D5', color: '#000000', fontWeight: '700', fontSize: '15px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' }}>{product.name}</td>
                <td style={{ padding: '12px', border: '1px solid #E8E0D5', color: '#000000', fontWeight: '700', fontSize: '15px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' }}>{product.quantity}</td>
                <td style={{ padding: '12px', border: '1px solid #E8E0D5', color: '#000000', fontWeight: '700', fontSize: '15px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.4)' }}>${product.price.toFixed(2)}</td>
                <td style={{ padding: '12px', border: '1px solid #E8E0D5', fontWeight: 'bold' }}>
                  {product.quantity < 5 ? <span style={{ color: 'orange', fontWeight: 'bold' }}>Low Stock ⚠️</span> : <span style={{ color: '#2d8659', fontWeight: 'bold' }}>In Stock ✓</span>}
                </td>
                <td style={{ padding: '12px', border: '1px solid #E8E0D5' }}>
                  <button
                    onClick={() => setEditingProduct(product)}
                    style={{
                      padding: '8px 12px',
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginRight: '8px',
                      fontWeight: '700',
                      fontSize: '13px',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 107, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1) translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.2)';
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = 'scale(0.95) translateY(0)';
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '8px 12px',
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '13px',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: '0 2px 8px rgba(255, 71, 87, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(255, 71, 87, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1) translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(255, 71, 87, 0.2)';
                    }}
                    onMouseDown={(e) => {
                      e.target.style.transform = 'scale(0.95) translateY(0)';
                    }}
                    onMouseUp={(e) => {
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    }}
                  >
                    🗑️ Delete
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
