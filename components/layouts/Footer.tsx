"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'
import { motion } from "framer-motion"

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <footer className="bg-peach-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <path d="M0 0h80v80H0z" fill="#fff"/>
          <path d="M0 0h10v10H0zm20 20h10v10H20zm20 20h10v10H40zM60 0h10v10H60zM40 40h10v10H40zM20 60h10v10H20z" fill="#000"/>
        </svg>
      </div>
      <motion.div
        className="container mx-auto px-6 py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <motion.div variants={itemVariants}>
            <Link href="/" className="flex items-center">
              <svg
                className="h-10 w-auto text-peach-100"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                <path d="M12 3v6" />
              </svg>
              <span className="ml-2 text-2xl font-extrabold tracking-tight">A Fabrics</span>
            </Link>
            <p className="mt-4 text-sm font-medium text-peach-200">
              Crafting bold, elegant fabrics for a vibrant world.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4 text-peach-100">Quick Links</h2>
            <ul className="space-y-3">
              {["About", "Products", "Blog", "Contact"].map((item) => (
                <motion.li key={item} variants={itemVariants}>
                  <Link href={`/${item.toLowerCase()}`} className="text-peach-200 hover:text-white transition-colors text-lg font-semibold active:underline  focus:ring-peach-400 focus:text-white rounded">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold mb-6 text-peach-100">Stay Connected</h2>
            <p className="text-base text-peach-200 mb-4">
              Join our newsletter for exclusive updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-l-md border-2 border-peach-700 bg-peach-800 text-white placeholder-peach-400 focus:outline-none focus:ring-2 focus:ring-peach-500"
              />
              <button
                type="submit"
                className="bg-peach-500 text-peach-900 px-6 py-3 rounded-r-md font-bold hover:bg-peach-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
        <motion.hr
          className="my-10 border-peach-700"
          variants={itemVariants}
        />
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
          variants={itemVariants}
        >
          <motion.span className="text-sm font-medium text-peach-300" variants={itemVariants}>
            © 2023 A Fabrics™. All Rights Reserved.
          </motion.span>
          <motion.div className="flex space-x-8" variants={itemVariants}>
            {[
              { Icon: Facebook, name: 'Facebook', href: '/facebook' },
              { Icon: Twitter, name: 'Twitter', href: '/twitter' },
              { Icon: Instagram, name: 'Instagram', href: '/instagram' },
              { Icon: Linkedin, name: 'LinkedIn', href: '/linkedin' },
              { Icon: Github, name: 'GitHub', href: '/github' },
            ].map(({ Icon, name, href }, index) => (
              <Link key={index} href={href} className="text-peach-300 hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
                <span className="sr-only">{name} page</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}