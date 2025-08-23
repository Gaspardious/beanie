import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is just for debugging - in a real app you'd get this from the request
    return NextResponse.json({
      message: 'Debug endpoint - check your browser localStorage for beanie-cart',
      instructions: [
        '1. Open browser dev tools (F12)',
        '2. Go to Application/Storage tab',
        '3. Look for localStorage',
        '4. Find beanie-cart key',
        '5. Check if products have printful_variant_id fields'
      ],
      expected_fields: [
        'id',
        'name', 
        'price',
        'quantity',
        'printful_variant_id', // This should be present
        'printful_product_id'  // This should be present
      ]
    });
  } catch {
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 });
  }
}
