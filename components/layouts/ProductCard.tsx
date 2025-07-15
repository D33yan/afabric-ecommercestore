"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Loader, Eye, CheckCircle } from "lucide-react";
import { Product } from "./FeaturedProducts";
import { useCart } from "./CartContext";

interface ProductCardProps {
  className?: string;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

// ProductCard displays a single product with image, name, price, rating, and interactive actions (favorite, view, add to cart).
// Modern, accessible, and responsive design with clear hover/focus states and ARIA labels.

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  className = "",
}) => {
  // State for hover and loading animation
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartItems, addItem } = useCart();
  // Add animated success feedback for add-to-cart
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if product is in cart
  const isInCart = cartItems.some((item) => item.id === product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);

  // Handle add to cart logic
  const handleAddToCart = () => {
    if (product.stock === 0) return;
    setLoading(true);
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image.toString(),
      quantity: 1,
    };
    addItem(item);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1200);
    }, 1000);
  };

  return (
    // Card container with premium glassmorphism, border, and shadow
    <Card
      className={`overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group bg-white/70 backdrop-blur-lg border border-peach-200 p-0 rounded-3xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
    >
      <CardContent className="relative p-0">
        {/* Product image with overlay and action buttons */}
        <div className="relative w-full min-h-[320px] md:min-h-[400px] overflow-hidden rounded-t-3xl">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-focus:scale-110"
            priority={isHovered}
            style={{ filter: 'brightness(0.98) saturate(1.1)' }}
          />
          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-peach-900/60 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 rounded-t-3xl" />
          {/* Action buttons: favorite and view */}
          <motion.div
            className="absolute top-3 right-3 z-10 flex flex-col gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-peach-100 focus:bg-peach-200 border border-peach-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-peach-500"
              onClick={() => onToggleFavorite(product.id)}
              aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-peach-700"
                }`}
                aria-hidden="true"
              />
            </motion.button>
            <Link
              href={{
                pathname: `/products/${product.id}`,
                query: {
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  subcategory: product.subcategory,
                  rating: product.rating.toString(),
                  stock: product.stock,
                },
              }}
              aria-label={`View details for ${product.name}`}
            >
              <motion.button
                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-peach-100 focus:bg-peach-200 border border-peach-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-peach-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="h-5 w-5 text-peach-700" aria-hidden="true" />
              </motion.button>
            </Link>
          </motion.div>
          {/* Category badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 text-xs bg-peach-900 text-white px-3 py-1 rounded font-bold shadow-lg border border-peach-200"
          >
            {product.category}
          </Badge>
          {/* Out of stock badge */}
          {product.stock === 0 && (
            <Badge
              variant="destructive"
              className="absolute bottom-3 left-3 font-bold text-xs px-3 py-1 rounded-full shadow-lg border border-peach-200 bg-red-700 text-white"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>
      {/* Card footer with product info and add to cart */}
      <CardFooter className="flex flex-col items-start p-5 bg-white/90 rounded-b-3xl">
        <Link
          href={`/product/${product.id}`}
          className="hover:underline hover:text-peach-700 focus:text-peach-700 focus:underline"
        >
          <h3 className="text-lg font-extrabold text-peach-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        {/* Product rating as stars */}
        <div className="flex items-center text-sm text-peach-500 mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < Math.round(product.rating)
                  ? "fill-current" : "stroke-current fill-transparent"
              }`}
              aria-hidden="true"
            />
          ))}
          <span className="ml-1 text-gray-600">
            ({product.rating.toFixed(1)})
          </span>
        </div>
        <div className="flex justify-between items-center w-full mt-2">
          <span className="text-xl font-bold text-peach-900">
            ${product.price.toFixed(2)}
          </span>
          {/* Add to cart button with loading and in-cart state, plus animated success feedback */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Button
                  size="sm"
                  className="transition-all duration-300 bg-peach-800 hover:bg-peach-900 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-500 shadow-lg"
                  disabled={product.stock === 0 || loading}
                  onClick={handleAddToCart}
                  aria-label={
                    product.stock === 0
                      ? `Out of stock: ${product.name}`
                      : isInCart
                      ? `In cart: ${product.name}`
                      : `Add ${product.name} to cart`
                  }
                >
                  {loading ? (
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                  ) : showSuccess ? (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="inline-flex items-center text-green-400"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                    </motion.span>
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                  )}
                  {loading
                    ? "Adding..."
                    : showSuccess
                    ? "Added!"
                    : isInCart
                    ? `In Cart (${cartItem?.quantity})`
                    : "Add to Cart"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
