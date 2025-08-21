This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stripe Integration

This project includes Stripe checkout integration. To set up Stripe:

1. Create a Stripe account and get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Create a `.env.local` file in the root directory with the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Printful Configuration (for products)
PRINTFUL_API_KEY=your_printful_api_key_here
```

3. Replace the placeholder values with your actual API keys
4. The checkout flow will automatically use the products from your cart

### Features
- Embedded Stripe checkout
- Automatic product data integration
- Swedish Krona (SEK) currency
- Nordic country shipping support
- Secure payment processing
- **Automatic Printful order creation** when payment succeeds
- **Webhook integration** for real-time order processing

### Setup Instructions

#### 1. Stripe Webhook Setup
1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`
5. Copy the webhook signing secret and add to `.env.local`

#### 2. Printful API Key
1. Go to [Printful Dashboard > API](https://www.printful.com/dashboard/api)
2. Generate a new API key
3. Add to `.env.local` as `PRINTFUL_API_KEY`
