// Test script to check your Printful products
async function testPrintfulProducts() {
  try {
    console.log('🔍 Testing your Printful products via your API endpoint...\n');
    
    // Test your existing API endpoint
    const response = await fetch('http://localhost:3000/api/products');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const products = await response.json();
    
    console.log('📦 Your Products:');
    console.log('==================');
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   External ID: ${product.external_id || 'Not set'}`);
      console.log(`   Price: ${product.price} SEK`);
      console.log(`   Thumbnail: ${product.thumbnail_url}`);
      console.log('');
    });

    console.log('✅ Your products are being fetched from Printful successfully!');
    console.log('\n📝 Next Steps:');
    console.log('1. Make a test purchase to see if orders appear in Printful');
    console.log('2. Check your Printful dashboard for new orders');
    console.log('3. Verify the order details are correct');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your Next.js app is running (npm run dev)');
    console.log('2. Check that PRINTFUL_API_KEY is set in Vercel');
    console.log('3. Verify your API key has the correct permissions');
  }
}

testPrintfulProducts();
