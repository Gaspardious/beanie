// Simple test to check cart data structure
console.log('🔍 Testing cart data structure...');

// Simulate what the cart data should look like
const expectedCartData = [
  {
    id: 390606094,
    name: "Salt and Storms",
    price: 349,
    quantity: 1,
    printful_variant_id: "4938455141",
    printful_product_id: "390606094"
  },
  {
    id: 366639172,
    name: "The Sailor Beanie", 
    price: 249,
    quantity: 1,
    printful_variant_id: "4615175066",
    printful_product_id: "366639172"
  }
];

console.log('✅ Expected cart data structure:');
console.log(JSON.stringify(expectedCartData, null, 2));

console.log('\n📋 Check your browser localStorage for beanie-cart key');
console.log('The cart data should include printful_variant_id and printful_product_id fields');
