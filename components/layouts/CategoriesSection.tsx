"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
const categories = [
  { id: 1, name: "Men", image: "/menfashion.jpg", href: "products/" },
  { id: 2, name: "Women", image: "/womenfashion.jpg", href: "products/" },
  { id: 3, name: "Accessories", image: "/accessories.jpg", href: "products/" },
];

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-16 bg-peach-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-peach-900">
          Shop by Category
        </h2>
        <div className="flex flex-col space-y-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 max-w-4xl mx-auto">
                <Link href={category.href}>
                  <CardContent className="p-0 relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-peach-900 bg-opacity-40 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-60">
                      <h3 className="text-white text-2xl font-extrabold uppercase">
                        {category.name}
                      </h3>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
