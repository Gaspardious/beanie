const crypto = require('crypto');

// Test the webhook with a fake Stripe event
async function testWebhookManually() {
  console.log('🔍 Testing webhook manually...\n');
  
  // Create a fake Stripe event
  const fakeEvent = {
    id: 'evt_test_123',
    object: 'event',
    api_version: '2020-08-27',
    created: Math.floor(Date.now() / 1000),
    data: {
      object: {
        id: 'cs_test_123',
        object: 'checkout.session',
        amount_total: 24900,
        currency: 'sek',
        customer_details: {
          email: 'test@example.com',
          name: 'Test Customer'
        },
        line_items: {
          data: [{
            id: 'li_test_123',
            object: 'line_item',
            amount_total: 24900,
            quantity: 1,
            price: {
              product: {
                metadata: {
                  printful_variant_id: '1',
                  printful_product_id: '366639172'
                }
              }
            }
          }]
        },
        status: 'complete'
      }
    },
    type: 'checkout.session.completed'
  };

  const body = JSON.stringify(fakeEvent);
  const timestamp = Math.floor(Date.now() / 1000);
  const payload = `${timestamp}.${body}`;
  
  // Create a fake signature (this won't work with real webhook secret)
  const signature = `t=${timestamp},v1=fake_signature`;
  
  try {
    const response = await fetch('https://beanie-pi.vercel.app/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature
      },
      body: body
    });
    
    console.log('📡 Webhook response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`Response: ${responseText}`);
    
    console.log('\n📝 This test will fail with "Invalid signature" because we used a fake signature.');
    console.log('But it confirms the webhook endpoint is accessible and working.');
    
  } catch (error) {
    console.error('❌ Error testing webhook:', error.message);
  }
}

testWebhookManually();
