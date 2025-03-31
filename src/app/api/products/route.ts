import { NextResponse } from 'next/server';

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

// Fallback prices for specific products
const FALLBACK_PRICES: Record<string, number> = {
  'The Sailor Beanie': 249,
  'Mouse pad': 149,
  'The Sailor Mug': 139,
};

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id?: string;
  sync_product?: {
    variants?: Array<{
      retail_price: string | number;
    }>;
  };
  description?: string;
}

export async function GET() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
      // Add cache configuration
      next: {
        revalidate: CACHE_DURATION
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: response.status });
    }

    const data = await response.json();
    console.log('Raw API response structure:', JSON.stringify(data, null, 2));

    // Transform the data to ensure we have valid prices
    const transformedData = (data.result || []).map((product: PrintfulProduct) => {
      // Log sync_product and variants
      console.log('☀️Product sync_product:', product.sync_product);
      console.log('⏱️Product variants:', product.sync_product?.variants);

      // Use fallback price based on product name
      const price = FALLBACK_PRICES[product.name] || 0;
      
      return {
        ...product,
        price
      };
    });
    
    console.log('Transformed data:', transformedData);
    
    // Return response with cache headers
    return new NextResponse(JSON.stringify(transformedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}