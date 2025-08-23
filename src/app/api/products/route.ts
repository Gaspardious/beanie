import { NextResponse } from 'next/server';

// Cache duration in seconds (5 minutes for faster updates)
const CACHE_DURATION = 300;

// Fallback prices for specific products
const FALLBACK_PRICES: Record<string, number> = {
  'The Sailor Beanie': 249,
  'Salt and Storms': 349,
  'Mouse pad': 149,
  'The Sailor Mug': 139,
};

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  external_id?: string;
  variants: number;
  synced: number;
  is_ignored: boolean;
  description?: string;
}

export async function GET() {
  try {
    const response = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
      // Use stale-while-revalidate for better performance and freshness
      next: {
        revalidate: CACHE_DURATION,
        tags: ['products'] // Add cache tag for manual invalidation
      }
    });


    
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: response.status });
    }

    const data = await response.json();
    console.log('Raw API response structure:', JSON.stringify(data, null, 2));

    // Transform the data to ensure we have valid prices and variant IDs
    const transformedData = (data.result || []).map((product: PrintfulProduct) => {
      // Log product data
      console.log('📦 Product:', product.name);
      console.log("Fetched Products:", data);

      // Use fallback price based on product name
      const price = FALLBACK_PRICES[product.name] || 0;
      
      // Map product IDs to their correct variant IDs
      const variantIdMap: Record<number, string> = {
        366639172: '4615175066',
        366639101: '4615174164',
        366062229: '4609721506',
        366026939: '4608984062',
        366025292: '4608936708',
        366022204: '4608848763',
        390606094: '4615175066' // Salt and Storms - need to get correct variant ID
      };
      
      const printfulVariantId = variantIdMap[product.id] || '4615175066';
      
      return {
        ...product,
        price,
        printful_variant_id: printfulVariantId,
        printful_product_id: product.id.toString()
      };
    });
    
    console.log('Transformed data:', transformedData);
    
    // Return response with optimized cache headers
    return new NextResponse(JSON.stringify(transformedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
        'Vary': 'Accept-Encoding'
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}