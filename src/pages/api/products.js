// src/pages/api/products.js
import { getProducts } from '../../lib/products';

export default async (req, res) => {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const products = await getProducts();
    
    if (!products || !Array.isArray(products)) {
      throw new Error('Invalid products data');
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to load products',
      details: error.message 
    });
  }
}