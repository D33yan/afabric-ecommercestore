'use client'

import { Checkout } from '@/components/layouts/Checkout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import { useCart } from '@/components/layouts/CartContext';

export default function CheckoutPage() {
  const { totalAmount } = useCart();
  
  return (
    <ProtectedRoute>
      <Checkout amount={totalAmount} />
    </ProtectedRoute>
  );
}