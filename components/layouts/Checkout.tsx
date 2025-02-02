'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/components/layouts/CartContext'
import { useAuth } from '@/app/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'

export function CheckoutPage (){
  const { cartItems, totalAmount, clearCart } = useCart()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    phone: ''
  })

  useEffect(() => {
    if (cartItems.length === 0 && !paymentSuccess) {
      window.location.href = '/products'
    }
  }, [cartItems, paymentSuccess])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = async () => {
    if (!formData.email || !formData.address || !formData.city || !formData.state || !formData.phone) {
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)

    try {
      // Dynamically import Paystack only on client side
      const PaystackPop = (await import('@paystack/inline-js')).default
      const paystack = new PaystackPop()

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: formData.email,
        amount: totalAmount * 100,
        metadata: {
          cart_items: JSON.stringify(cartItems),
          shipping_address: JSON.stringify(formData)
        },
        onSuccess: (transaction) => {
          setPaymentSuccess(true)
          clearCart()
          toast.success('Payment successful! Order confirmed')
          setLoading(false)
        },
        onCancel: () => {
          toast.error('Payment cancelled')
          setLoading(false)
        }
      })
    } catch (error) {
      console.error('Payment initialization error:', error)
      toast.error('Failed to initialize payment gateway')
      setLoading(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#8B4513] mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We've sent a confirmation to {formData.email}
          </p>
          <Link href="/products">
            <Button className="bg-[#8B4513] hover:bg-[#A0522D] text-white">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/cart" className="inline-block mb-6">
          <Button variant="ghost" className="text-[#8B4513] hover:text-[#A0522D]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
        </Link>

        <motion.div
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-2xl font-bold text-[#8B4513] mb-8">Checkout</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                  required
                >
                  <option value="">Select State</option>
                  {['Lagos', 'Abuja', 'Rivers', 'Oyo', 'Kano', 'Edo'].map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                required
              />
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-[#8B4513]">₦{totalAmount.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white py-3"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

