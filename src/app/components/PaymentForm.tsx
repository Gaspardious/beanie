"use client";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Make sure the key exists and is a string before trying to initialize Stripe
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripeKey);

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentFormContent = ({ amount, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (data.error) {
        onError(data.error);
        return;
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (paymentError) {
        onError(paymentError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch {
      onError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Details
        </label>
        <div className="p-4 bg-gray-100 rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000',
                  '::placeholder': {
                    color: '#6B7280',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={processing || !stripe}
          className="w-full bg-black text-white py-4 uppercase text-sm disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : `Pay SEK ${amount.toFixed(2)}`}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4">
        <img src="/visa.svg" alt="Visa" className="h-6" />
        <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
        <img src="/amex.svg" alt="American Express" className="h-6" />
      </div>
    </form>
  );
};

const PaymentForm = (props: PaymentFormProps) => (
  <Elements stripe={stripePromise}>
    <PaymentFormContent {...props} />
  </Elements>
);

export default PaymentForm; 