// src/lib/products.js
import axios from 'axios';
import Papa from 'papaparse';

export async function getProducts() {
  try {
    const response = await axios.get(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSh_tgFZ6Qqjt22A949taUpyhctA1tvN_ZKkMCKj-ZbF06gGANER8r6Zpzmwavkks2ekqQreEaa7qy5/pub?output=csv',
      {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );

    const results = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true
    });

    return results.data.map(item => ({
      name: item.Name || 'No name',
      price: item.Price || 'N/A',
      url: `${item.Link}?tag=${item.Affiliate_Tag || 'yourtag-20'}`
    }));

  } catch (error) {
    console.error('Sheets fetch error:', error);
    return [];
  }
}