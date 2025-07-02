import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching products from API...');
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received products:', data.length);
        setProducts(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products.length) return <div>No products found</div>;

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map(product => (
          <div key={product.url}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <a href={product.url} target="_blank" rel="noopener">
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}