import React, { useState } from 'react';
import { updateProduct } from '../services/ProductServices';

function ProductEdit({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(product.imageUrl || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.quantity || !formData.price) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await updateProduct(formData.id, {
        name: formData.name,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl
      });
      console.log('Product updated successfully');
      onSave();
      window.location.reload();
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#FEFEF9',
        padding: '35px',
        borderRadius: '20px',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
        width: '90%',
        maxWidth: '550px',
        border: '2px solid #E8E0D5',
        animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '25px', color: '#FF6B6B', fontSize: '2em', fontWeight: '800', letterSpacing: '-0.5px' }}>✏️ Edit Product</h2>
        {error && <p style={{ color: '#FF6B6B', marginBottom: '15px', fontWeight: '700', backgroundColor: '#ffe6e6', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #FF6B6B' }}>{error}</p>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '20px', marginBottom: '20px' }}>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#000000', fontSize: '14px', letterSpacing: '0.3px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' }}>Product Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                style={{ padding: '12px', width: '100%', boxSizing: 'border-box', borderRadius: '8px', border: '2px solid #E8E0D5', fontSize: '14px', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                onFocus={(e) => { e.target.style.borderColor = '#FF6B6B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8E0D5'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#000000', fontSize: '14px', letterSpacing: '0.3px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' }}>Quantity: </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                disabled={loading}
                style={{ padding: '12px', width: '100%', boxSizing: 'border-box', borderRadius: '8px', border: '2px solid #E8E0D5', fontSize: '14px', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                onFocus={(e) => { e.target.style.borderColor = '#FF6B6B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8E0D5'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#000000', fontSize: '14px', letterSpacing: '0.3px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' }}>Price: </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
                step="0.01"
                style={{ padding: '12px', width: '100%', boxSizing: 'border-box', borderRadius: '8px', border: '2px solid #E8E0D5', fontSize: '14px', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                onFocus={(e) => { e.target.style.borderColor = '#FF6B6B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8E0D5'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', color: '#000000', fontSize: '14px', letterSpacing: '0.3px', textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)' }}>Image URL: </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
                style={{ padding: '12px', width: '100%', boxSizing: 'border-box', borderRadius: '8px', border: '2px solid #E8E0D5', fontSize: '14px', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                onFocus={(e) => { e.target.style.borderColor = '#FF6B6B'; e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E8E0D5'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {imagePreview && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#2c2c2c', marginTop: 0, fontWeight: '700', letterSpacing: '0.3px' }}>📸 Preview:</p>
              <img 
                src={imagePreview} 
                alt="preview" 
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #E8E0D5', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
                onError={() => setImagePreview('')}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.05) translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(0.95) translateY(0)';
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.05) translateY(-2px)';
              }
            }}
          >
            {loading ? '⏳ Saving...' : '💾 Save'}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #E8E0D5 0%, #D9D0C4 100%)',
              color: '#2c2c2c',
              border: '2px solid #E8E0D5',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
              letterSpacing: '0.5px',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.05) translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
            }}
            onMouseDown={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(0.95) translateY(0)';
              }
            }}
            onMouseUp={(e) => {
              if (!loading) {
                e.target.style.transform = 'scale(1.05) translateY(-2px)';
              }
            }}
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
