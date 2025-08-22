// Debug script to test webhook functionality
const crypto = require('crypto');

async function testWebhook() {
  console.log('🔍 Testing webhook endpoint...\n');
  
  try {
    // Test if the webhook endpoint is accessible
    const response = await fetch('https://beanie-pi.vercel.app/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test-signature'
      },
      body: JSON.stringify({ test: 'data' })
    });
    
    console.log('📡 Webhook endpoint response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`Response: ${responseText}`);
    
    console.log('\n🔧 Next steps to debug:');
    console.log('1. Check Vercel logs for webhook calls');
    console.log('2. Verify STRIPE_WEBHOOK_SECRET is set in Vercel');
    console.log('3. Check if webhook URL is correct in Stripe dashboard');
    console.log('4. Test with a real Stripe webhook event');
    
  } catch (error) {
    console.error('❌ Error testing webhook:', error.message);
  }
}

testWebhook();
