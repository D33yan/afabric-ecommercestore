'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Twitter, Facebook, ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TeamMember = ({ name, role, image, bio }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-48 h-48 mx-auto mt-6 rounded-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-6 text-center">
        <h3 className="text-2xl font-black text-peach-900 mb-2">{name}</h3>
        <p className="text-peach-600 font-extrabold mb-4">{role}</p>
        <p className="text-peach-700 font-semibold">{bio}</p>
      </CardContent>
    </Card>
  </motion.div>
)

const Timeline = ({ events }: any) => (
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-peach-200"></div>
    {events.map((event: any, index: number) => (
      <motion.div
        key={index}
        className={`mb-8 flex justify-between items-center w-full ${
          index % 2 === 0 ? "flex-row-reverse" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="order-1 w-5/12"></div>
        <div className="z-20 flex items-center order-1 bg-peach-100 shadow-xl w-8 h-8 rounded-full">
          <h1 className="mx-auto font-black text-lg text-peach-800">{event.year}</h1>
        </div>
        <div className="order-1 bg-peach-50 rounded-lg shadow-xl w-5/12 px-6 py-4">
          <h3 className="mb-3 font-black text-peach-800 text-xl">{event.title}</h3>
          <p className="text-sm font-bold leading-snug tracking-wide text-peach-700 text-opacity-100">{event.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
)

export default function AboutPage() {
  const teamMembers = [
    { name: "Amarachi Nnaji", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", bio: "With over 10 years in the fashion industry, Amarachi brings her passion for African textiles and modern design to Afabric." },
    { name: "Divine Nnaji", role: "Head Software Developer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", bio: "Divine leads our tech team, ensuring Afabric's digital presence is as cutting-edge as our fashion." },
    { name: "Chioma Okafor", role: "Marketing Director", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", bio: "Chioma's innovative marketing strategies have put Afabric on the global fashion map." },
    { name: "Emeka Nwosu", role: "Fashion Curator", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", bio: "Emeka's keen eye for emerging trends keeps Afabric at the forefront of African fashion." },
  ]

  const timelineEvents = [
    { year: "2018", title: "Afabric Founded", description: "Amarachi Nnaji launches Afabric as a small blog showcasing Nigerian designers." },
    { year: "2019", title: "First Fashion Show", description: "Afabric hosts its first fashion show featuring emerging African designers." },
    { year: "2020", title: "E-commerce Launch", description: "The Afabric online store goes live, offering curated African fashion pieces." },
    { year: "2021", title: "International Recognition", description: "Afabric featured in Vogue as 'One to Watch' in the world of African fashion." },
    { year: "2022", title: "Afabric Academy", description: "Launch of Afabric Academy, providing mentorship to young African designers." },
    { year: "2023", title: "Global Expansion", description: "Afabric opens its first physical store in London, bringing African fashion to the global stage." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-peach-100">
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-peach-900 mb-6 tracking-tight">Our Story</h1>
              <p className="text-xl text-peach-700 max-w-3xl font-extrabold mx-auto">
                Afabric is more than just a fashion blog. We're a community dedicated to celebrating and elevating African fashion on the global stage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-black text-peach-900 mb-4">Our Mission</h2>
                <p className="text-lg font-extrabold text-peach-700 mb-6">
                  At Afabric, we believe in the power of African fashion to tell stories, preserve culture, and shape the future. Our mission is to showcase the diversity and creativity of African designers, while also educating our audience about the rich history and traditions behind each piece.
                </p>
                <p className="text-lg font-extrabold text-peach-700 mb-6">
                  We strive to be a platform where emerging designers can gain exposure, where fashion enthusiasts can discover unique pieces, and where the world can witness the evolution of African fashion.
                </p>
                <Button className="bg-peach-500 hover:bg-peach-600 text-white text-lg font-black px-6 py-3">
                  Join Our Community <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="African Fashion"
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-black text-peach-900 mb-8 text-center">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-black text-peach-900 mb-8 text-center">Our Journey</h2>
              <Timeline events={timelineEvents} />
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-black text-peach-900 mb-8 text-center">What We Do</h2>
              <Tabs defaultValue="blog" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
                  <TabsTrigger value="blog" className="font-extrabold">Fashion Blog</TabsTrigger>
                  <TabsTrigger value="ecommerce" className="font-extrabold">E-commerce</TabsTrigger>
                  <TabsTrigger value="events" className="font-extrabold">Fashion Events</TabsTrigger>
                  <TabsTrigger value="academy" className="font-extrabold">Afabric Academy</TabsTrigger>
                </TabsList>
                <TabsContent value="blog" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black mb-2">Cutting-Edge Fashion Blog</h3>
                      <p className="font-bold">Our blog showcases the latest trends in African fashion, designer interviews, and style guides. We bring you the best of African creativity, from traditional textiles to modern interpretations.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="ecommerce" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black mb-2">Curated Online Store</h3>
                      <p className="font-bold">Shop our carefully curated collection of African-inspired fashion pieces. From statement accessories to ready-to-wear garments, we bring you the best of African design right to your doorstep.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="events" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black mb-2">Spectacular Fashion Shows</h3>
                      <p className="font-bold">Experience the vibrancy of African fashion at our annual fashion shows. We provide a platform for both established and emerging designers to showcase their collections to a global audience.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="academy" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black mb-2">Nurturing Talent</h3>
                      <p className="font-bold">Afabric Academy offers mentorship programs, workshops, and resources for aspiring African designers. We're committed to fostering the next generation of fashion talent on the continent.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-peach-900 text-white rounded-lg p-12 text-center mb-20">
              <h2 className="text-3xl font-black mb-4">Join the Afabric Community</h2>
              <p className="text-lg font-extrabold mb-8">Stay updated with the latest trends, designer spotlights, and exclusive content.</p>
              <div className="flex justify-center space-x-4">
                <motion.a
                  href="#"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="h-6 w-6" />
                </motion.a>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Mail className="h-12 w-12 text-peach-500 mb-4" />
                  <h3 className="text-xl font-black text-peach-900 mb-2">Email Us</h3>
                  <p className="text-peach-700 font-bold">info@afabric.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <MapPin className="h-12 w-12 text-peach-500 mb-4" />
                  <h3 className="text-xl font-black text-peach-900 mb-2">Visit Us</h3>
                  <p className="text-peach-700 font-bold">123 Fashion Street, Lagos, Nigeria</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Phone className="h-12 w-12 text-peach-500 mb-4" />
                  <h3 className="text-xl font-black text-peach-900 mb-2">Call Us</h3>
                  <p className="text-peach-700 font-bold">+234 123 456 7890</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}