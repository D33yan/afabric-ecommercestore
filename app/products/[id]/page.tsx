'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Star, Loader, ArrowLeft } from 'lucide-react';
import { useCart } from "@/components/layouts/CartContext";
import { useSearchParams } from 'next/navigation';

export default function ProductPage() {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { cartItems, addItem } = useCart();
  
  const searchParams = useSearchParams();
  
  const id = parseInt(searchParams.get('id') || "0", 10)
  const name = searchParams.get('name') || "Unknown Product";
  const description = searchParams.get('description') || "No description available.";
  const price = parseFloat(searchParams.get('price') || "0");
  const image = searchParams.get('image') || "/placeholder.svg";
  const category = searchParams.get('category') || "Uncategorized";
  const subcategory = searchParams.get('subcategory') || "Unknown";
  const rating = parseFloat(searchParams.get('rating') || "0");
  const stock = parseInt(searchParams.get('stock') || "0", 10);

  const isInCart = cartItems.some(item => item.id === id);
  const cartItem = cartItems.find(item => item.id === id);

  const handleAddToCart = () => {
    if (stock === 0) return;

    setLoading(true);

    const item = {
      id,
      name,
      price,
      image,
      quantity: 1
    };

    addItem(item);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const productImages = [image, "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <Link href="/" className="inline-flex items-center text-peach-600 hover:text-peach-800 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="text-sm font-extrabold">Back to Products</span>
      </Link>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded bg-gray-50">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md bg-gray-50 ${
                  selectedImage === index ? 'ring-2 ring-peach-500' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 25vw, 12.5vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <Badge
              variant="secondary"
              className="mb-3 text-xs bg-peach-50 text-peach-800 px-2 py-1 rounded-full font-extrabold"
            >
              {category}
            </Badge>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{name}</h1>
            <div className="flex items-center text-sm">
              <div className="flex items-center text-peach-500 mr-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.round(rating) ? "fill-current" : "stroke-current fill-transparent"}`}
                  />
                ))}
              </div>
              <span className="text-gray-500">({rating.toFixed(1)})</span>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-2xl font-extrabold text-gray-900 mb-4">${price.toFixed(2)}</p>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Availability</span>
              <span className={stock > 0 ? "text-green-600 font-extrabold" : "text-red-600 font-extrabold"}>
                {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                className="flex-grow bg-peach-800 hover:bg-peach-900 text-white transition-colors duration-200"
                disabled={stock === 0 || loading}
                onClick={handleAddToCart}
              >
                {loading ? (
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                {loading ? "Adding..." : isInCart ? `In Cart (${cartItem?.quantity})` : "Add to Cart"}
              </Button>
              <motion.button
                className="p-3 bg-white border border-peach-200 rounded-full shadow-sm hover:bg-peach-50 transition-colors duration-200"
                onClick={handleToggleFavorite}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-peach-600"}`}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-16" />
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Specifications</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><span className="font-extrabold">Category:</span> {category}</li>
              <li><span className="font-extrabold">Subcategory:</span> {subcategory}</li>
              <li><span className="font-extrabold">Material:</span> Premium Quality</li>
              <li><span className="font-extrabold">Dimensions:</span> 10 x 20 x 5 cm</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2">Reviews</h3>
            <div className="flex items-center mb-4">
              <div className="flex items-center text-peach-500 mr-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.round(rating) ? "fill-current" : "stroke-current fill-transparent"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">Based on 24 reviews</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">Read all reviews</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}