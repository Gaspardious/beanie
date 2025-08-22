// Script to fetch Printful products and display their IDs

async function getPrintfulProducts() {
  const apiKey = process.env.PRINTFUL_API_KEY;
  
  if (!apiKey) {
    console.log('❌ PRINTFUL_API_KEY not found in environment variables');
    console.log('Please add your Printful API key to your environment variables');
    console.log('You can also manually set it in this script for testing');
    return;
  }

  try {
    console.log('🔍 Fetching your Printful products...\n');
    
    // Fetch store products
    const storeResponse = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    if (!storeResponse.ok) {
      throw new Error(`Store products API error: ${storeResponse.status}`);
    }

    const storeData = await storeResponse.json();
    console.log('📦 Store Products:');
    console.log('==================');
    
    storeData.result.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Store Product ID: ${product.id}`);
      console.log(`   External ID: ${product.external_id || 'Not set'}`);
      console.log('');
    });

    // Fetch sync products
    const syncResponse = await fetch('https://api.printful.com/sync/products', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    if (!syncResponse.ok) {
      throw new Error(`Sync products API error: ${syncResponse.status}`);
    }

    const syncData = await syncResponse.json();
    console.log('🔄 Sync Products:');
    console.log('==================');
    
    syncData.result.forEach((product, index) => {
      console.log(`${index + 1}. ${product.sync_product.name}`);
      console.log(`   Sync Product ID: ${product.sync_product.id}`);
      console.log(`   External ID: ${product.sync_product.external_id || 'Not set'}`);
      console.log(`   Variants: ${product.sync_product.variants.length}`);
      
      product.sync_product.variants.forEach((variant, vIndex) => {
        console.log(`     Variant ${vIndex + 1}:`);
        console.log(`       Sync Variant ID: ${variant.id}`);
        console.log(`       Name: ${variant.name}`);
        console.log(`       Retail Price: ${variant.retail_price}`);
      });
      console.log('');
    });

    console.log('📝 Next Steps:');
    console.log('1. Copy the Sync Product ID and Sync Variant ID for each beanie');
    console.log('2. Update your product data in the code');
    console.log('3. Test the integration');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check that your PRINTFUL_API_KEY is correct');
    console.log('2. Make sure you have products in your Printful store');
    console.log('3. Verify your API key has the correct permissions');
  }
}

getPrintfulProducts();
