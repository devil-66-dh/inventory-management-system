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
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <h2>Add New Product</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '20px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label>Product Name: </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                disabled={loading}
                style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Quantity: </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                disabled={loading}
                style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Price: </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                disabled={loading}
                step="0.01"
                style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Image URL: </label>
              <input
                type="url"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://example.com/image.jpg"
                style={{ marginLeft: '10px', padding: '8px', width: '100%' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Adding...' : 'Add Product'}
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
