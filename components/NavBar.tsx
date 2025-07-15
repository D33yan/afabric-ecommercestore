'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, AlignRight, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/layouts/CartContext'
import { useAuth } from '@/app/contexts/AuthContext'
import { toast } from 'react-hot-toast'
import Image from 'next/image'



type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/products', label: 'PRODUCTS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/blogs', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT' },
]
// Add this new component above your NavBar component

const CheckoutSection = memo(({ 
    totalAmount,
    user,
    handleCheckout,
    clearCart
  }: {
    totalAmount: number;
    user: any;
    handleCheckout: () => void;
    clearCart: () => void;
  }) => (
    <div className="border-t p-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Total:</span>
        <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
      </div>
      <Button 
        className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
        onClick={handleCheckout}
      >
        {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
      </Button>
      <Button 
        variant="outline" 
        className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
        onClick={() => {
          if (confirm('Are you sure you want to clear your cart?')) {
            clearCart()
          }
        }}
      >
        Clear Cart
      </Button>
    </div>
  ));
// Further improved NavBar for premium, professional look with glassmorphism, shadow, and enhanced effects.
const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)
  const { cartItems, totalItems, totalAmount, removeItem, clearCart } = useCart()
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleCartSidebar = useCallback(() => {
    setIsCartSidebarOpen(prev => !prev)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await signOut()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to log out. Please try again.')
    }
  }, [signOut, router])

  const handleCheckout = useCallback(() => {
    if (user) {
      router.push('/checkout')
      setIsCartSidebarOpen(false)
    } else {
      router.push('/signin?redirect=/checkout')
      setIsCartSidebarOpen(false)
    }
  }, [user, router])

  return (
    <motion.nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-peach-200 shadow-xl rounded-b-2xl transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-2xl py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left links */}
          <div className="hidden md:flex space-x-4">
            {navItems.slice(0, 2).map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
          {/* Center logo - visually prominent, no pill/glass background */}
          <div className="flex items-center justify-center flex-grow md:flex-grow-0">
            <Link href="/">
              <motion.span
                className="text-4xl font-extrabold text-peach-900 tracking-wide drop-shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                AFabric
              </motion.span>
            </Link>
          </div>
          {/* Right links */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.slice(2).map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <div className="flex items-center space-x-2 relative">
              {user ? (
                <>
                  <IconButton
                    icon={<User className="h-5 w-5" />}
                    label="User account"
                    onClick={() => router.push('/account')}
                  />
                  <IconButton
                    icon={<LogOut className="h-5 w-5" />}
                    label="Logout"
                    onClick={handleLogout}
                  />
                </>
              ) : (
                <IconButton
                  icon={<User className="h-5 w-5" />}
                  label="Sign in"
                  onClick={() => router.push('/signin')}
                />
              )}
              <IconButton
                icon={<ShoppingCart className="h-5 w-5" />}
                label="Shopping cart"
                onClick={toggleCartSidebar}
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md border border-white">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
              className="text-peach-900 hover:text-peach-700 bg-white/80 border border-peach-200 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-peach-500"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <AlignRight className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#F5E6D3]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} mobile />
              ))}
              {user ? (
                <>
                  <NavLink href="/account" label="Account" icon={<User className="h-4 w-4 mr-2" />} mobile />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-[#8B4513] font-extrabold text-sm tracking-wide px-4 py-2 rounded-full hover:bg-[#8B4513] hover:text-[#F5E6D3] transition-all duration-300 ease-in-out"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline-block" />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink href="/signin" label="Sign In" icon={<User className="h-4 w-4 mr-2" />} mobile />
              )}
              <NavLink 
                href="/cart" 
                label={`Cart (${totalItems})`} 
                icon={<ShoppingCart className="h-4 w-4 mr-2" />} 
                mobile 
                onClick={toggleCartSidebar}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      {/* Cart Sidebar */}
<AnimatePresence>
  {isCartSidebarOpen && (
    <motion.div
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Your Cart ({totalItems})</h3>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close cart"
            onClick={toggleCartSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3 pb-3 border-b">
                  <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <CheckoutSection 
            totalAmount={totalAmount}
            user={user}
            handleCheckout={handleCheckout}
            clearCart={clearCart}
          />
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.nav>
  )
}

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink = memo(({ href, label, icon, mobile = false, onClick }: NavLinkProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <motion.span
        className={`
          inline-block text-[#8B4513] font-extrabold text-sm tracking-wide
          px-4 py-2 rounded-full transition-all duration-300 ease-in-out
          ${mobile ? 'block w-full text-left' : ''}
          hover:bg-[#8B4513] hover:text-[#F5E6D3]
          active:bg-[#A0522D] active:text-[#F5E6D3]
          focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-opacity-50
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon && <span className="inline-block align-middle mr-2">{icon}</span>}
        {label}
      </motion.span>
    </Link>
  )
})

NavLink.displayName = 'NavLink'

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const IconButton = memo(({ icon, label, onClick }: IconButtonProps) => {
  return (
    <motion.button
      className={`
        text-[#8B4513] p-2 rounded-full transition-all duration-300 ease-in-out
        hover:bg-[#8B4513] hover:text-[#F5E6D3]
        active:bg-[#A0522D] active:text-[#F5E6D3]
        focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-opacity-50
    `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  )
})

IconButton.displayName = 'IconButton'
NavBar.displayName = 'NavBar'
CheckoutSection.displayName = 'Checkout'

export default NavBar