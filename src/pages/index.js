// src/pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Affiliate Products</h1>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <div key={product.url} style={{
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px'
          }}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <a 
              href={product.url} 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: '#0070f3',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}