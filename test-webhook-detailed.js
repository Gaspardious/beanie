const crypto = require('crypto');

async function testWebhookDetailed() {
  console.log('🔍 Testing webhook with detailed error reporting...\n');
  
  try {
    // Get the webhook secret from environment
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not found in environment');
      return;
    }
    
    // Create a test event that will trigger Printful order creation
    const testEvent = {
      id: 'evt_test_' + Date.now(),
      object: 'event',
      api_version: '2025-07-30.basil',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'cs_test_' + Date.now(),
          object: 'checkout.session',
          amount_total: 24900,
          amount_subtotal: 24900,
          currency: 'sek',
          customer_details: {
            email: 'test@example.com',
            name: 'Test Customer',
            phone: '+46701234567',
            address: {
              line1: 'Test Street 1',
              city: 'Stockholm',
              country: 'SE',
              postal_code: '12345'
            }
          },
          line_items: {
            data: [{
              id: 'li_test',
              object: 'item',
              amount_total: 24900,
              quantity: 1,
              price: {
                product: {
                  metadata: {
                    printful_variant_id: '1', // This will trigger our fallback
                    printful_product_id: '366639172'
                  }
                }
              }
            }]
          },
          status: 'complete'
        }
      },
      livemode: false,
      pending_webhooks: 1,
      request: {
        id: 'req_test',
        idempotency_key: null
      },
      type: 'checkout.session.completed'
    };
    
    // Create the signature
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify(testEvent);
    const signedPayload = `${timestamp}.${payload}`;
    const signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(signedPayload, 'utf8')
      .digest('hex');
    
    const stripeSignature = `t=${timestamp},v1=${signature}`;
    
    console.log('📤 Sending detailed webhook test...');
    console.log('📋 Event type: checkout.session.completed');
    console.log('📋 Amount: 249.00 SEK');
    console.log('📋 Customer: test@example.com');
    
    const response = await fetch('https://beanie-pi.vercel.app/api/webhooks/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': stripeSignature
      },
      body: payload
    });
    
    console.log('\n📡 Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    const responseText = await response.text();
    console.log(`Body: ${responseText}`);
    
    if (response.ok) {
      console.log('\n✅ Webhook test successful!');
      console.log('This means the webhook is working correctly.');
    } else {
      console.log('\n❌ Webhook test failed');
      console.log('The error response above should help identify the issue.');
      
      if (response.status === 500) {
        console.log('\n🔧 500 errors usually indicate:');
        console.log('1. Printful API call failed');
        console.log('2. Environment variable issue');
        console.log('3. Code error in the webhook handler');
        console.log('\n📝 Check Vercel logs for more details:');
        console.log('https://vercel.com/dashboard/gaspardious-projects/beanie/functions');
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing webhook:', error.message);
  }
}

testWebhookDetailed();
