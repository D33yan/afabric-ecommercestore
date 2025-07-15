"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, Volume2, VolumeX, LoaderPinwheel } from 'lucide-react'
import Link from 'next/link'
import Section from "@/components/ui/Section";
import BrandLoader from "@/components/ui/BrandLoader";


// HeroSection is the main landing section with a video background, animated text, and call-to-action buttons.
// It uses framer-motion for smooth animations and handles video mute/unmute, loading state, and scroll indicator.
// The design is modern, accessible, and responsive.

const HeroSection: React.FC = () => {
  // State for loading animation, visibility, and video mute
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Animate opacity and scale on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Simulate loading state for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to next section on indicator click
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  // Toggle video mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <Section
      id="hero-section"
      ariaLabel="Hero section with video background and call to action"
      backgroundClassName="relative h-screen bg-black"
      className="flex items-center justify-center overflow-hidden"
    >
      {/* Loading spinner overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-peach-100"
            aria-live="polite"
            aria-busy="true"
          >
            <BrandLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background with dark overlay for contrast */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="./bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Main hero content: animated heading, subheading, and buttons */}
      <motion.div
        ref={sectionRef}
        style={{ opacity, scale }}
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
      >
        <motion.h1 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 text-peach-900 drop-shadow-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 5, delay: 5, ease: "easeOut" }}
        >
          <span className="bg-clip-text text-transparent font-black bg-[url('/artpic2.jpg')] animate-text-shine">
            A Fabric
          </span>
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-12 max-w-3xl mx-auto font-bold text-peach-700 drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          Let&apos;s show you why we are different
        </motion.p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="space-x-4"
        >
          {/* Shop Now and Learn More buttons */}
          <Link href={`/products`}>
            <Button 
              size="lg" 
              className="bg-peach-700 text-white hover:bg-peach-200 transition-colors duration-300 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Shop Now
            </Button>
          </Link>
          <Link href={`/about`}>
            <Button 
              size="lg" 
              variant="outline"
              className="text-peach-900 bg-peach-200 border-peach-bg-peach-700 hover:bg-peach-700 hover:text-black transition-colors duration-300 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll down indicator for accessibility */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        onClick={handleScrollClick}
        tabIndex={0}
        aria-label="Scroll to next section"
        role="button"
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>

      {/* Mute/Unmute Button for video accessibility */}
      <motion.button
        className="absolute bottom-8 right-8 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
        onClick={toggleMute}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>

      {/* Decorative gradient and border elements for modern look */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-peach-bg-peach-700 opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-peach-bg-peach-700 opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
        aria-hidden="true"
      />
    </Section>
  )
}

export default HeroSection
