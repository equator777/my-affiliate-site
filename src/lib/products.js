import axios from 'axios';
import Papa from 'papaparse';

export async function getProducts() {
  try {
    const response = await axios.get(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSh_tgFZ6Qqjt22A949taUpyhctA1tvN_ZKkMCKj-ZbF06gGANER8r6Zpzmwavkks2ekqQreEaa7qy5/pub?gid=0&single=true&output=csv',
      { timeout: 5000 }
    );

    const results = Papa.parse(response.data, {
      header: true,
      skipEmptyLines: true
    });

    return results.data
      .filter(item => item.Link && item.Name) // Filter out incomplete items
      .map(item => ({
        name: item.Name.trim(),
        price: item.Price?.trim() || 'Price not available',
        image: item.Image?.trim() || '/placeholder-product.png',
        url: `${item.Link.includes('?') ? item.Link : item.Link + '?'}tag=${item.Affiliate_Tag || 'yourtag-20'}`
      }));

  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}