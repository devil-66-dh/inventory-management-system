import React, { useState } from 'react';
import { updateProduct } from '../services/ProductServices';

function ProductEdit({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        price: parseFloat(formData.price)
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
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000,
      width: '400px',
      border: '2px solid #2196F3',
      backgroundColor: '#e3f2fd',
      color: '#000'
    }}>
      <h2 style={{ marginTop: 0 }}>Edit Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '15px' }}>
        <label>Product Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          style={{ marginLeft: '10px', padding: '8px', width: '80%' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Quantity: </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          disabled={loading}
          style={{ marginLeft: '10px', padding: '8px', width: '80%' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={loading}
          step="0.01"
          style={{ marginLeft: '10px', padding: '8px', width: '80%' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onClose}
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: -1,
        cursor: 'pointer'
      }} onClick={onClose} />
    </div>
  );
}

export default ProductEdit;
