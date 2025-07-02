import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.filter(p => p.url.includes('http')));
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="container">
      <Head>
        <title>Affiliate Products</title>
      </Head>

      <h1>Featured Products</h1>
      
      <div className="product-grid">
        {products.map((product) => (
          <a 
            href={product.url} 
            key={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card"
          >
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => e.target.src = '/placeholder-product.png'}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Buy Now</button>
          </a>
        ))}
      </div>
    </div>
  );
}