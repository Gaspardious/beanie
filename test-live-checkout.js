// Test the live checkout functionality
async function testLiveCheckout() {
  console.log('🔍 Testing live checkout...\n');
  
  try {
    // Test if the checkout page loads
    const response = await fetch('https://beanie-pi.vercel.app/checkout');
    
    console.log('📡 Checkout page response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ Checkout page is accessible');
    } else {
      console.log('❌ Checkout page is not accessible');
    }
    
    console.log('\n📝 Next steps:');
    console.log('1. Go to https://beanie-pi.vercel.app/checkout');
    console.log('2. Add a product to cart first');
    console.log('3. Try to complete the checkout');
    console.log('4. Check if you get redirected to Stripe');
    console.log('5. Check if the payment actually processes');
    
  } catch (error) {
    console.error('❌ Error testing checkout:', error.message);
  }
}

testLiveCheckout();
