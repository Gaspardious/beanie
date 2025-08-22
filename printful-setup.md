# Printful Integration Setup

## What's Already Implemented

✅ **Webhook Integration**: Orders are automatically created in Printful when Stripe payments succeed  
✅ **Product Metadata**: Products now include Printful IDs in Stripe metadata  
✅ **Order Creation**: Webhook creates orders with customer details and shipping info  

## What You Need to Do

### 1. Get Your Printful API Key

1. Go to your [Printful Dashboard](https://www.printful.com/dashboard)
2. Navigate to **Stores** → **API** → **Generate API Key**
3. Copy the API key
4. Add it to your Vercel environment variables:
   ```
   PRINTFUL_API_KEY=your_printful_api_key_here
   ```

### 2. Get Product and Variant IDs

You need to get the correct `sync_product_id` and `sync_variant_id` for each of your products:

#### Option A: Use Printful Dashboard
1. Go to your Printful Dashboard
2. Navigate to **Products**
3. Find your beanie products
4. Copy the **Product ID** and **Variant ID**

#### Option B: Use Printful API
```bash
# Get all your sync products
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.printful.com/sync/products

# Get specific product details
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.printful.com/sync/products/PRODUCT_ID
```

### 3. Update Your Product Data

Update your products in the code to include the correct Printful IDs:

```typescript
// Example product with Printful IDs
const product = {
  id: 1,
  name: "The Sailor Beanie",
  thumbnail_url: "/products/sailor-beanie.jpg",
  price: 249,
  quantity: 1,
  external_id: "sailor-beanie",
  printful_product_id: "12345", // Your Printful Product ID
  printful_variant_id: "67890"  // Your Printful Variant ID
}
```

### 4. Test the Integration

1. Make a test purchase
2. Check your Printful Dashboard for the new order
3. Verify the order details are correct

## Troubleshooting

### Orders Not Appearing in Printful
- Check that `PRINTFUL_API_KEY` is set correctly
- Verify the webhook is receiving `checkout.session.completed` events
- Check server logs for Printful API errors

### Wrong Products Being Ordered
- Verify `printful_product_id` and `printful_variant_id` are correct
- Make sure the IDs match your actual Printful products

### API Errors
- Check the Printful API response in server logs
- Verify your API key has the correct permissions
- Ensure product/variant IDs exist in your Printful account

## Next Steps

1. **Set up your Printful API key**
2. **Get the correct product/variant IDs**
3. **Update your product data**
4. **Test with a real purchase**
5. **Monitor orders in Printful Dashboard**

The integration is already working - you just need to provide the correct Printful product IDs!
