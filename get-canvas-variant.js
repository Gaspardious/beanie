// Load environment variables
const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse environment variables
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

// Set environment variables
Object.keys(envVars).forEach(key => {
  process.env[key] = envVars[key];
});

async function getCanvasVariant() {
  try {
    console.log('🔍 Fetching canvas product variants...');
    
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('📋 API Response structure:', JSON.stringify(data, null, 2));
    
    // Find the canvas product
    const canvasProduct = data.result.find(product => 
      product.name === 'Salt and Storms'
    );

    if (!canvasProduct) {
      console.log('❌ Canvas product not found');
      console.log('📋 Available products:');
      data.result.forEach(product => {
        console.log(`  - ${product.name} (ID: ${product.id})`);
      });
      return;
    }

    console.log('✅ Found canvas product:', canvasProduct.name);
    console.log('📋 Product ID:', canvasProduct.id);
    
    // Now get the specific variant details
    console.log('🔍 Fetching variant details...');
    const variantResponse = await fetch(`https://api.printful.com/store/products/${canvasProduct.id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      }
    });

    if (!variantResponse.ok) {
      throw new Error(`HTTP error! status: ${variantResponse.status}`);
    }

    const variantData = await variantResponse.json();
    console.log('🎨 Variant details:', JSON.stringify(variantData, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

getCanvasVariant();
