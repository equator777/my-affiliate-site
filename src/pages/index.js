import { getProducts } from '../lib/products';

export default function Home({ products }) {
  return (
    <div className="container">
      <h1>Best Deals 🎁</h1>
      <div className="product-grid">
        {products.map((product) => (
          <a 
            href={product.url} 
            key={product.name}
            target="_blank"
            className="product-card"
          >
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button>Buy Now</button>
          </a>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products }, revalidate: 3600 }; // Updates hourly
}

console.log(products); // Check browser's console (F12)