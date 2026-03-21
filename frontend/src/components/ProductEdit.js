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
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '90%',
        maxWidth: '500px',
        border: '2px solid #2196F3',
        backgroundColor: '#e3f2fd'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px' }}>Edit Product</h2>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '20px', marginBottom: '20px' }}>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Product Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantity: </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                disabled={loading}
                style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price: </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
                step="0.01"
                style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL: </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
                style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {imagePreview && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#666', marginTop: 0 }}>Preview:</p>
              <img 
                src={imagePreview} 
                alt="preview" 
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }}
                onError={() => setImagePreview('')}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              padding: '10px 15px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
