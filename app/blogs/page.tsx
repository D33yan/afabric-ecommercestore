'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Mail, ArrowUpRight } from 'lucide-react'

interface BlogPostProps {
  title: string
  excerpt: string
  image: string
  author: string
  category: string
  date: string
  readTime: string
}

const BlogPost: React.FC<BlogPostProps> = ({ title, excerpt, image, author, category }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-white/90 font-extrabold text-peach-900 hover:bg-white">
              {category}
            </Badge>
          </div>
        </div>
        <CardHeader className="relative z-10">
          
          <CardTitle className="text-xl font-extrabold text-peach-900 group-hover:text-peach-700 transition-colors duration-300">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-peach-700 font-semibold mb-6 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                  alt={author}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <span className="text-sm font-bold text-peach-900">{author}</span>
            </div>
            <Button variant="ghost" className="group/btn font-bold hover:bg-peach-100 text-peach-700">
              Read More 
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface TrendProps {
  image: string
  title: string
  description: string
}

const TrendCard: React.FC<TrendProps> = ({ image, title, description }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div 
      ref={ref}
      className="relative h-[500px] rounded-2xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t font-extrabold  from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h3 className="text-2xl font-extrabold mb-3">{title}</h3>
        <p className="text-white/90 font-bold">{description}</p>
      </div>
    </motion.div>
  )
}



const BlogHero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  
  return (
    <div className="relative h-[95vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b"
          alt="Fashion Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-peach-500/30 to-peach-900/50 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <motion.h1 
            className="text-7xl md:text-9xl font-extrabold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Afabric
          </motion.h1>
          <motion.p 
            className="text-2xl md:text-3xl font-extrabold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where African Heritage Meets Modern Fashion
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default function AfabricFashionBlog() {
  const blogPosts: BlogPostProps[] = [
    {
      title: "The Evolution of Ankara in Contemporary Fashion",
      excerpt: "Discover how traditional Ankara prints are revolutionizing modern African street fashion, creating an exciting fusion of heritage and contemporary style.",
      image: "https://images.pexels.com/photos/14764328/pexels-photo-14764328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      author: "Chioma Eze",
      category: "Style",
      date: "Jan 14, 2024",
      readTime: "5 min read"
    },
    {
      title: "Sustainable Fashion: A Nigerian Perspective",
      excerpt: "Explore how Nigerian designers are leading the charge in sustainable fashion, incorporating traditional techniques with eco-friendly materials.",
      image: "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb",
      author: "Oluwaseun Adebayo",
      category: "Sustainability",
      date: "Jan 13, 2024",
      readTime: "4 min read"
    },
    {
      title: "Modern African Accessories",
      excerpt: "Learn how contemporary African designers are reimagining traditional accessories for the modern fashion landscape.",
      image: "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Amina Ibrahim",
      category: "Accessories",
      date: "Jan 12, 2024",
      readTime: "6 min read"
    }
  ]

  const trends = [
    {
      title: "Digital Fashion Revolution",
      description: "Exploring how technology is transforming African fashion through AR and VR experiences.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e"
    },
    {
      title: "Sustainable Luxury",
      description: "Traditional craftsmanship meets environmental consciousness in modern African luxury.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
    },
    {
      title: "Street Style Evolution",
      description: "How urban African fashion is influencing global street style trends.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae"
    }
  ]

  const categories = [
    "All",
    "Street Style",
    "Traditional",
    "Contemporary",
    "Accessories"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-peach-100">
      <BlogHero />
      
      <main className="container mx-auto px-4 py-16">
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-peach-900 tracking-tight">Latest Stories</h2>
            <Tabs defaultValue="All" className="w-full max-w-[600px]">
              <TabsList className="bg-white/50 p-1 font-bold ">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-white font-bold"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPost key={index} {...post} />
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-peach-900 mb-12 tracking-tight">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trends.map((trend, index) => (
              <TrendCard key={index} {...trend} />
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0">
            <Image
              src="/nexsletterbg.jpg"
              alt="Newsletter Background"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
          </div>
          <div className="relative z-10 p-12 md:p-20 text-white">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Join Our Fashion Community</h2>
            <p className="text-xl font-bold text-white/90 mb-8 max-w-2xl">
              Subscribe to our newsletter and be part of a growing community celebrating African fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 font-bold border-white/20 text-white placeholder:text-white/60 focus:border-white h-12" 
              />
              <Button className="bg-peach-50 text-peach-900 font-extrabold hover:bg-white/90 transition-all duration-300 transform hover:scale-105 h-12 px-8">
                Subscribe <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}