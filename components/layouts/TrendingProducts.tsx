'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '@/data/products'
import useEmblaCarousel from 'embla-carousel-react'
import Section from "@/components/ui/Section";

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

// TrendingProducts displays a carousel of trending product cards with modern, accessible, and responsive design.
// Uses embla-carousel for smooth sliding and framer-motion for animation.
// Section heading and navigation are visually modern and accessible.

const TrendingProducts: React.FC = () => {
  // State for favorite products
  const [favorites, setFavorites] = useState<number[]>([])
  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false
  })

  // Toggle favorite state for a product
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  // Limit to 6 trending products for the carousel
  const trendingProducts = products.slice(7, 12)

  return (
    <Section
      heading="Trending Products"
      id="trending-products-section"
      ariaLabel="Trending products carousel"
      backgroundClassName="bg-gradient-to-b from-peach-200 via-peach-50 to-peach-100 relative"
    >
      {/* Carousel of product cards */}
      <div className="relative">
        <div ref={emblaRef} className="embla">
          <div className="embla__container flex">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="embla__slide flex-none w-full sm:w-1/2 lg:w-1/3 px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
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
        {/* Carousel navigation buttons, visually modern and accessible */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 z-10 pointer-events-none">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="bg-peach-700 text-white p-3 rounded-full shadow-lg hover:bg-peach-900 focus:bg-peach-900 focus:outline-none focus:ring-2 focus:ring-peach-500 pointer-events-auto transition-all duration-300"
            aria-label="Previous"
            tabIndex={0}
          >
            &#10094;
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="bg-peach-700 text-white p-3 rounded-full shadow-lg hover:bg-peach-900 focus:bg-peach-900 focus:outline-none focus:ring-2 focus:ring-peach-500 pointer-events-auto transition-all duration-300"
            aria-label="Next"
            tabIndex={0}
          >
            &#10095;
          </button>
        </div>
      </div>
    </Section>
  )
}

export default TrendingProducts
