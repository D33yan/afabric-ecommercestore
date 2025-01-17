'use client';

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, User, Lock } from 'lucide-react';

interface CheckoutProps {
  amount: number;
}

export function Checkout({ amount }: CheckoutProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
    throw new Error('Paystack public key is not defined');
  }

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !cardNumber || !expiryDate || !cvv || !address || !city || !state || !country) {
      setError('Please fill out all fields');
      return;
    }
    setError('');

    initializePayment({
      onSuccess: (reference) => {
        console.log('Payment successful', reference);
        setPaymentSuccess(true);
        // Notify backend
        fetch('/api/payment-success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference, email, amount, address, city, state, country }),
        }).then((response) => {
          if (response.ok) {
            console.log('Backend updated successfully');
          } else {
            console.error('Failed to update backend');
          }
        });
      },
      onClose: () => {
        console.log('Payment closed');
      },
    });
  };

  const maskCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  if (paymentSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/checkout-background.jpg')"}}>
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">Thank you for your purchase. Your order has been processed successfully.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => window.location.href = '/'}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{backgroundImage: "url('/checkout-background.jpg')"}}>
      <Card className="w-full max-w-2xl shadow-lg bg-white/80 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">ChecLout</CardTitle>
          <CardDescription className="text-center">Complete your order with confidence</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center"><User className="mr-2" /> Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center"><CreditCard className="mr-2" /> Payment Details</h3>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.replace(/[^\d/]/g, '').replace(/^(\d{2})(\d)$/g, '$1/$2').replace(/^(\d{2})\/(\d{2})(.+)$/g, '$1/$2'))}
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    required
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center"><MapPin className="mr-2" /> Billing Address</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="NY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={setCountry} required>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-peach-500">Total:</span>
                <span className="text-2xl font-extrabold text-peach-900">₦{amount.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full text-lg bg-peach-900 py-6 hover:bg-peach-500">
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}