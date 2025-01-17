'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/layouts/ProductCard';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const categories = ['All', 'Men', 'Women', 'Accessories'];
const subcategories = ['All', 'Shirts', 'Pants', 'Shoes', 'Bags', 'Hats'];

const BlogHero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="relative h-[95vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <motion.h1
            className="text-6xl sm:text-8xl font-extrabold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Afabric
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl font-semibold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where African Heritage Meets Modern Fashion
          </motion.p>
          <motion.button
            className="bg-white text-[#8B4513] px-6 py-3 rounded-lg font-bold shadow-md hover:bg-[#F5E6D3] transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchSubcategory =
      selectedSubcategory === 'All' || product.subcategory === selectedSubcategory;
    return matchCategory && matchSubcategory;
  });

  return (
    <div>
      <BlogHero />
      <div className="container mx-auto px-5 py-10">
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-[#8B4513]">
          Our Products
        </h1>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex flex-col items-center">
            <label
              htmlFor="category"
              className="font-extrabold mb-2 text-[#8B4513] text-lg"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#8B4513] rounded-lg px-4 py-2 bg-[#F5E6D3] text-[#8B4513] hover:border-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#8B4513] transition"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="subcategory"
              className="font-extrabold mb-2 text-[#8B4513] text-lg"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="border border-[#8B4513] rounded-lg px-4 py-2 bg-[#F5E6D3] text-[#8B4513] hover:border-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#8B4513] transition"
            >
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-16">
            <Image
              src="/icons/empty-box.svg"
              alt="No Products"
              width={100}
              height={100}
            />
            <p className="mt-4 text-lg">No products found. Please try a different filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
