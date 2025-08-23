import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST() {
  try {
    // Invalidate the products cache
    revalidateTag('products');
    
    console.log('🔄 Products cache invalidated successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Products cache invalidated',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error invalidating products cache:', error);
    return NextResponse.json({ 
      error: 'Failed to invalidate cache' 
    }, { status: 500 });
  }
}
