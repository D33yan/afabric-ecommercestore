// ProductList.tsx
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { products, Product } from "@/data/products"
import Image from 'next/image'

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
          />
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {product.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex-grow flex flex-col justify-between p-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">({product.rating.toFixed(1)})</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Button size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Men' | 'Women' | 'Accessories'>('All')

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Collection</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {['All', 'Men', 'Women', 'Accessories'].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category as typeof selectedCategory)}
            variant={selectedCategory === category ? "default" : "outline"}
          >
            {category}
          </Button>
        ))}
      </div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ProductList
