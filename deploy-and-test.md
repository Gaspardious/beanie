# Webhook Fix - Deployment Guide

## Problem Summary
Your webhooks are working from localhost but failing on the live site because the products are using incorrect `printful_variant_id` values.

## What I Fixed

### 1. Updated Webhook Code (`src/app/api/webhooks/stripe/route.ts`)
- Added fallback to use correct variant ID (`4615175066`) when the metadata contains '1'
- This ensures Printful orders are created with valid variant IDs

### 2. Updated Products API (`src/app/api/products/route.ts`)
- Changed to fetch from sync products endpoint instead of store products
- Added `printful_variant_id` and `printful_product_id` to product data
- This ensures products have correct Printful IDs when sent to Stripe

## Deployment Steps

### 1. Deploy to Vercel
```bash
# If you have Vercel CLI installed
vercel --prod

# Or push to your main branch if auto-deployment is enabled
git add .
git commit -m "Fix webhook: Add correct Printful variant IDs"
git push origin main
```

### 2. Verify Deployment
```bash
# Check if the webhook is working
curl -X POST https://beanie-pi.vercel.app/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -H "stripe-signature: test" \
  -d '{"test":"data"}'
```

### 3. Test the Fix
```bash
# Run the webhook test script
export $(cat .env.local | xargs) && node test-webhook-real.js
```

## Expected Results

After deployment:
1. ✅ Webhook should return 200 status for valid events
2. ✅ Printful orders should be created successfully
3. ✅ Orders should appear in your Printful dashboard
4. ✅ Live site purchases should trigger webhooks correctly

## Monitoring

### Check Vercel Logs
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `beanie-pi` project
3. Go to Functions tab
4. Check logs for `/api/webhooks/stripe`

### Check Stripe Webhook Logs
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. Check the "Events" tab for recent webhook attempts

### Check Printful Orders
1. Go to [Printful Dashboard](https://www.printful.com/dashboard)
2. Check Orders section for new orders

## Troubleshooting

If webhooks still fail after deployment:

1. **Check Vercel Logs**: Look for specific error messages
2. **Verify Environment Variables**: Ensure `PRINTFUL_API_KEY` is set in Vercel
3. **Test Printful Connection**: Run `node test-printful-connection.js`
4. **Check Variant IDs**: Ensure the variant IDs are correct in your Printful account

## Correct Variant IDs

Based on your Printful account, use these variant IDs:
- Product 1: `4615175066`
- Product 2: `4615174164`
- Product 3: `4609721506`
- Product 4: `4608984062`
- Product 5: `4608936708`
- Product 6: `4608848763`

## Success Indicators

You'll know the fix is working when:
- ✅ Webhook test returns 200 status
- ✅ Printful orders are created successfully
- ✅ Orders appear in Printful dashboard
- ✅ Live site purchases trigger webhooks
- ✅ No more "Sync variant not found" errors
