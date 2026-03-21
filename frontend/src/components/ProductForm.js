import React, { useState } from 'react';
import { addProduct } from '../services/ProductServices';

function ProductForm() {
  const [product, setProduct] = useState({ name: '', quantity: '', price: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!product.name || !product.quantity || !product.price) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      await addProduct({
        name: product.name,
        quantity: parseInt(product.quantity),
        price: parseFloat(product.price),
        imageUrl: product.imageUrl
      });

      console.log('Product added successfully');
      setProduct({ name: '', quantity: '', price: '', imageUrl: '' });
      setImagePreview('');
      window.location.reload();
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      border: '2px solid #E8E0D5', 
      padding: '35px', 
      borderRadius: '20px', 
      marginBottom: '40px', 
      backgroundColor: '#FEFEF9',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      animation: 'fadeIn 0.6s ease',
      backdrop: 'blur(10px)'
    }}>
      <h2 style={{ color: '#FF6B6B', marginBottom: '25px', fontSize: '2em', fontWeight: '800', letterSpacing: '-0.5px' }}>➕ Add New Product</h2>
      {error && <p style={{ color: '#d32f2f', marginBottom: '15px', padding: '12px 15px', backgroundColor: '#ffebee', borderRadius: '8px', fontWeight: '600', border: '2px solid #FF6B6B' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '20px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#2c2c2c', fontSize: '0.95em' }}>Product Name: </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                disabled={loading}
                style={{ marginLeft: 0, padding: '12px 15px', width: '100%', fontSize: '0.95em', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#2c2c2c', fontSize: '0.95em' }}>Quantity: </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                disabled={loading}
                style={{ marginLeft: 0, padding: '12px 15px', width: '100%', fontSize: '0.95em', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#2c2c2c', fontSize: '0.95em' }}>Price: </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                disabled={loading}
                step="0.01"
                style={{ marginLeft: 0, padding: '12px 15px', width: '100%', fontSize: '0.95em', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#2c2c2c', fontSize: '0.95em' }}>Image URL: </label>
              <input
                type="url"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
                style={{ marginLeft: 0, padding: '12px 15px', width: '100%', fontSize: '0.95em', boxSizing: 'border-box' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 32px',
                background: loading ? '#FFA500' : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1,
                fontSize: '1em',
                fontWeight: '700',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: loading ? 'scale(1)' : 'scale(1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'scale(1.05) translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'scale(1) translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                }
              }}
            >
              {loading ? '⏳ Adding...' : '✨ Add Product'}
            </button>
          </div>
          
          {imagePreview && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#666' }}>Preview:</p>
              <img 
                src={imagePreview} 
                alt="preview" 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }}
                onError={() => setImagePreview('')}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
