// Test the live webhook endpoint
async function testLiveWebhook() {
  console.log('🔍 Testing live webhook endpoint...\n');
  
  try {
    // Test the live webhook endpoint
    const response = await fetch('https://beanie-pi.vercel.app/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test-signature'
      },
      body: JSON.stringify({ test: 'data' })
    });
    
    console.log('📡 Live webhook response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`Response: ${responseText}`);
    
    console.log('\n🔧 If you got "Invalid signature", that means:');
    console.log('✅ The webhook endpoint is accessible');
    console.log('✅ The route is working');
    console.log('✅ Environment variables are loaded');
    console.log('❌ But Stripe is not calling it (or signature is wrong)');
    
    console.log('\n📝 Next steps:');
    console.log('1. Check Stripe dashboard webhook settings');
    console.log('2. Verify webhook URL is: https://beanie-pi.vercel.app/api/webhooks/stripe');
    console.log('3. Make a test purchase on the live site');
    console.log('4. Check Vercel logs for webhook calls');
    
  } catch (error) {
    console.error('❌ Error testing live webhook:', error.message);
  }
}

testLiveWebhook();
