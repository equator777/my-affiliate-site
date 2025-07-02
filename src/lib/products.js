import axios from 'axios';
import Papa from 'papaparse';

export async function getProducts() {
  try {
    const res = await axios.get(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSh_tgFZ6Qqjt22A949taUpyhctA1tvN_ZKkMCKj-ZbF06gGANER8r6Zpzmwavkks2ekqQreEaa7qy5/pub?output=csv",
      {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
    
    const parsed = Papa.parse(res.data, { 
      header: true,
      skipEmptyLines: true
    });
    
    return parsed.data.map((item) => ({
      name: item.Name || item['Product Name'], // Handle different column names
      price: item.Price || item['Product Price'],
      url: `${item.Link || item.URL}?tag=${item.Affiliate_Tag || 'yourtag-20'}`
    })).filter(item => item.name); // Filter out empty items
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array if fetch fails
  }
}