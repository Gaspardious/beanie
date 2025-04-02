interface PrintfulProduct {
  id: string;
  name: string;
  quantity: number;
  price: number; 
  variant_id: number;
  retail_price: string;
  files: { url: string }[];
  thumbnail_url: string;
}

interface PrintfulOrderItem {
  variant_id: number;
  quantity: number;
  retail_price: string;
}

interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  email: string;
  phone: string;
}

interface PrintfulOrder {
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
}

interface PrintfulOrderResponse {
  id: number;
  status: string;
  shipping: string;
  created: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  confirmed?: string;
}

// Comment out this line to avoid "assigned but never used" error
// const PRINTFUL_API_URL = 'https://api.printful.com';

export async function createPrintfulOrder(
  products: PrintfulProduct[],
  recipient: {
    firstName: string;
    lastName: string;
    street: string;
    apartment?: string;
    city: string;
    country: string;
    postalCode: string;
    email: string;
    phone: string;
  }
): Promise<PrintfulOrderResponse> {
  // Convert country name to country code (simplified for example)
  const countryCodeMap: Record<string, string> = {
    "Sweden": "SE",
    "Germany": "DE",
    "France": "FR",
    "United Kingdom": "GB",
    "United States": "US",
    "Denmark": "DK",
    "Finland": "FI",
    "Norway": "NO",
    // Add more countries as needed
  };
  
  const countryCode = countryCodeMap[recipient.country] || "SE"; // Default to Sweden if not found
  
  const orderItems: PrintfulOrderItem[] = products.map(product => ({
    variant_id: product.variant_id,
    quantity: product.quantity,
    retail_price: product.price.toString()
  }));

  const orderData: PrintfulOrder = {
    recipient: {
      name: `${recipient.firstName} ${recipient.lastName}`,
      address1: recipient.street,
      address2: recipient.apartment,
      city: recipient.city,
      country_code: countryCode,
      zip: recipient.postalCode,
      email: recipient.email,
      phone: recipient.phone
    },
    items: orderItems
  };

  // For now, we're just mocking the API call and returning a success response
  // In a real implementation, you would make an actual API call to Printful
  console.log('Sending order to Printful:', JSON.stringify(orderData, null, 2));
  
  // Mock successful response
  return {
    id: Math.floor(Math.random() * 1000000),
    status: 'draft',
    shipping: '41.00',
    created: new Date().toISOString(),
    recipient: orderData.recipient,
    items: orderData.items
  };

  /* Uncomment this to use actual API when ready:
  
  const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create order with Printful');
  }

  return await response.json();
  */
}

export async function confirmPrintfulOrder(orderId: number): Promise<PrintfulOrderResponse> {
  // Mock successful confirmation
  console.log(`Confirming Printful order: ${orderId}`);
  
  // Add missing properties required by PrintfulOrderResponse
  return {
    id: orderId,
    status: 'pending',
    shipping: '41.00',
    created: new Date().toISOString(),
    confirmed: new Date().toISOString(),
    recipient: {
      name: 'Mock Customer',
      address1: 'Mock Address',
      city: 'Mock City',
      country_code: 'SE',
      zip: '12345',
      email: 'mock@example.com',
      phone: '123456789'
    },
    items: []
  };
  
  /* Uncomment this to use actual API when ready:
  
  const response = await fetch(`${PRINTFUL_API_URL}/orders/${orderId}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to confirm order with Printful');
  }

  return await response.json();
  */
} 