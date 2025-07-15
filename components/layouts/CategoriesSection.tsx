"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
// CategoriesSection displays a set of product categories as interactive cards with images and overlay titles.
// It uses framer-motion for entry animation and Next.js Image for optimized images.
// The design is modern, accessible, and responsive.

// Define the categories to display. Each has an id, name, image, and link.
const categories = [
  { id: 1, name: "Men", image: "/menfashion.jpg", href: "/products?category=Men" },
  { id: 2, name: "Women", image: "/womenfashion.jpg", href: "/products?category=Women" },
  { id: 3, name: "Accessories", image: "/accessories.jpg", href: "/products?category=Accessories" },
];

// Further improved CategoriesSection for premium, modern look with grid, larger images, tactile cards, and enhanced effects.
const CategoriesSection: React.FC = () => {
  return (
    <Section
      heading="Shop by Category"
      id="categories-section"
      ariaLabel="Product categories"
      backgroundClassName="bg-gradient-to-b from-peach-50 to-peach-100"
    >
      {/* Responsive grid layout for categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="flex"
          >
            {/* Card for each category, with accessible link and image */}
            <Card className="flex-1 overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 rounded-3xl border border-peach-200 bg-white/80 backdrop-blur-lg group focus-within:ring-4 focus-within:ring-peach-400">
              <Link href={category.href} aria-label={`Shop ${category.name} category`} tabIndex={0} className="block h-full">
                <CardContent className="p-0 relative h-full">
                  {/* Category image with alt text for accessibility */}
                  <Image
                    src={category.image}
                    alt={`${category.name} fashion category`}
                    width={800}
                    height={500}
                    className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105 rounded-t-3xl"
                    priority={index === 0}
                    style={{ filter: 'brightness(0.97) saturate(1.1)' }}
                  />
                  {/* Overlay with category name, improved contrast and focus/hover effect */}
                  <div className="absolute inset-0 bg-peach-900 bg-opacity-60 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-70 group-focus:bg-opacity-70 rounded-t-3xl">
                    <h3 className="text-white text-3xl md:text-4xl font-extrabold uppercase drop-shadow-lg tracking-wide">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default CategoriesSection;
