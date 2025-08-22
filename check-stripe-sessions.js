// Check recent Stripe sessions
const Stripe = require('stripe');

async function checkStripeSessions() {
  console.log('🔍 Checking recent Stripe sessions...\n');
  
  try {
    // You'll need to set your Stripe secret key
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Get recent checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
      expand: ['data.line_items']
    });
    
    console.log('📋 Recent Stripe sessions:');
    console.log('==========================');
    
    sessions.data.forEach((session, index) => {
      console.log(`${index + 1}. Session ID: ${session.id}`);
      console.log(`   Status: ${session.status}`);
      console.log(`   Amount: ${session.amount_total} ${session.currency}`);
      console.log(`   Created: ${new Date(session.created * 1000).toLocaleString()}`);
      console.log(`   Customer: ${session.customer_details?.email || 'N/A'}`);
      console.log(`   Payment Status: ${session.payment_status}`);
      console.log('');
    });
    
    console.log('📝 If you see sessions but no webhooks, check:');
    console.log('1. Webhook URL is correct');
    console.log('2. Webhook is enabled');
    console.log('3. Webhook secret matches');
    
  } catch (error) {
    console.error('❌ Error checking sessions:', error.message);
    console.log('\n💡 Make sure STRIPE_SECRET_KEY is set in your environment');
  }
}

checkStripeSessions();
