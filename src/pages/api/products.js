// src/pages/api/products.js
import { getProducts } from '../../lib/products';

export default async function handler(req, res) {
  try {
    console.log('Fetching products...'); // Debug log
    const products = await getProducts();
    
    // Validate response
    if (!Array.isArray(products)) {
      throw new Error('Invalid products data format');
    }
    
    console.log('Successfully fetched products:', products.length); // Debug log
    
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(products);
    
  } catch (error) {
    console.error('API Error:', error.message); // Detailed error logging
    return res.status(500).json({ 
      error: 'Failed to load products',
      message: error.message 
    });
  }
}