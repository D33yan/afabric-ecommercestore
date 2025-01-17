"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, Volume2, VolumeX, LoaderPinwheel } from 'lucide-react'
import Link from 'next/link'


const HeroSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 2000) // Simulating a 2-second loading time

    return () => clearTimeout(timer)
  }, [])

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <motion.div 
      ref={sectionRef}
      style={{ opacity, scale }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-peach-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <LoaderPinwheel className="w-24 h-24 text-peach-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6 relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 5, delay: 5, ease: "easeOut" }}
        >
          <span className=" bg-clip-text text-transparent font-extrabold bg-[url('/artpic2.jpg')] animate-text-shine">
            A Fabric
          </span>
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl md:text-3xl mb-10 max-w-3xl mx-auto font-extrabold"
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
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        onClick={handleScrollClick}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>

      {/* Mute/Unmute Button */}
      <motion.button
        className="absolute bottom-8 right-8 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
        onClick={toggleMute}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
      >
        {isMuted ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-peach-bg-peach-700 opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-peach-bg-peach-700 opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
      />
    </motion.div>
  )
}

export default HeroSection
