'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Cart = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    cartItems,
    removeItem,
    clearCart,
    totalAmount,
    totalItems,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const handleProceedToCheckout = () => {
    try {
      const queryParams = new URLSearchParams({
        amount: totalAmount.toFixed(2),
      });

      const redirectUrl = user
        ? `/checkout?${queryParams.toString()}`
        : `/signin?redirect=/checkout&${queryParams.toString()}`;

      router.push(redirectUrl);
    } catch (error) {
      console.error('Navigation error:', error);
      // Optional: Show an error message to the user here
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ShoppingCart className="w-6 h-6" />
            Your Cart
            {totalItems > 0 && (
              <span className="text-sm font-normal bg-white text-purple-500 px-2 py-1 rounded-full ml-2">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {cartItems.length === 0 ? (
          <Alert className="bg-purple-50 border-purple-200">
            <AlertDescription className="text-center py-12 text-purple-600 text-lg">
              Your cart is currently empty. Start shopping!
            </AlertDescription>
          </Alert>
        ) : (
          <AnimatePresence>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <motion.li
                  key={item.id}
                  className="flex gap-4 items-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-purple-100"
                          onClick={() => decrementQuantity(item.id)}
                        >
                          <MinusCircle className="h-4 w-4 text-purple-500" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-purple-100"
                          onClick={() => incrementQuantity(item.id)}
                        >
                          <PlusCircle className="h-4 w-4 text-purple-500" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-purple-600">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        )}
      </CardContent>

      {cartItems.length > 0 && (
        <CardFooter className="flex flex-col gap-4 border-t pt-6 bg-gray-50">
          <div className="w-full flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Subtotal ({totalItems} items)</p>
              <p className="text-3xl font-bold text-purple-600">${totalAmount.toFixed(2)}</p>
            </div>
            <Button
              variant="outline"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={handleProceedToCheckout}
          >
            {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Cart;
