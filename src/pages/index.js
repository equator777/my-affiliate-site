import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
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

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>Affiliate Products</title>
        <meta name="description" content="Best affiliate deals" />
      </Head>

      <h1>Featured Products</h1>
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.name} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}