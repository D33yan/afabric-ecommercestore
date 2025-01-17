"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star, Loader, Eye } from "lucide-react";
import { Product } from "./FeaturedProducts";
import { useCart } from "./CartContext";

interface ProductCardProps {
  className?: string;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartItems, addItem } = useCart();

  const isInCart = cartItems.some((item) => item.id === product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);

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
    }, 1000);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl group bg-white border-none p-0 rounded ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="relative p-0">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 " />
          <motion.div
            className="absolute top-2 right-2 z-10 flex flex-col gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
              onClick={() => onToggleFavorite(product.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
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
            >
              <motion.button
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </motion.button>
            </Link>
          </motion.div>
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 text-xs bg-peach-800 text-white px-3 py-1 rounded]font-bold"
          >
            {product.category}
          </Badge>
          {product.stock === 0 && (
            <Badge
              variant="destructive"
              className="absolute bottom-2 left-2 font-bold text-xs px-3 py-1 rounded-full "
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 bg-gray-50">
        <Link
          href={`/product/${product.id}`}
          className="hover:underline hover:text-pretty"
        >
          <h3 className="text-lg font-extrabold text-peach-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-peach-500 mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < Math.round(product.rating)
                  ? "fill-current"
                  : "stroke-current fill-transparent"
              }`}
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
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="sm"
                  className="transition-all duration-300 bg-peach-800 hover:bg-peach-900 text-white rounded-full px-4 py-2"
                  disabled={product.stock === 0 || loading}
                  onClick={handleAddToCart}
                >
                  {loading ? (
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                  )}
                  {loading
                    ? "Adding..."
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
