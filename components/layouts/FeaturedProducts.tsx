'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '@/data/products'
import useEmblaCarousel from 'embla-carousel-react'

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Men' | 'Women' | 'Accessories';
  subcategory: string;
  rating: number;
  stock: number;
}

const FeaturedProducts: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: false
  })

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  // Limit to 6 products
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-b  from-peach-200 via-peach-100 to-peach-400">
      <div className="container overflow-x-auto mx-auto px-0">
        <motion.h2 
          className="text-4xl font-extrabold mb-12 text-center text-peach-900"
          style={{ textShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>
        
        <div className="relative">
          <div ref={emblaRef} className="embla">
            <div className="embla__container flex">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="embla__slide flex-none w-full sm:w-1/2 lg:w-1/3 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="bg-peach-500 text-white p-2 rounded-full hover:bg-peach-600"
              aria-label="Previous"
            >
              &#10094;
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="bg-peach-500 text-white p-2 rounded-full hover:bg-peach-600"
              aria-label="Next"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
