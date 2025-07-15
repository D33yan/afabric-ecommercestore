'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight, Loader, CheckCircle, XCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'


export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle')
  // Add error and success feedback for form submission
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('submitted');
    } catch (err) {
      setFormError('Failed to send message. Please try again.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 to-peach-200">
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-peach-900 mb-6 tracking-tight">Get in Touch</h1>
              <p className="text-xl font-bold font-sans text-peach-700 max-w-2xl mx-auto">
                Have questions about African fashion? Want to collaborate? We &apos d love to hear from you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="relative overflow-hidden rounded">
                <Image
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050"
                  alt="Contact Image"
                  layout="fill"
                  objectFit="cover"
                  className="brightness-75"
                />
                <div className="relative z-10 p-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent h-full flex flex-col justify-end text-white">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Visit Our Studio</h2>
                      <div className="space-y-4">
                        <div className="flex items-center font-extrabold  space-x-3">
                          <MapPin className="h-5 w-5 text-peach-300" />
                          <span>123 Fashion Avenue, Lagos, Nigeria</span>
                        </div>
                        <div className="flex items-cente font-extrabold r space-x-3">
                          <Phone className="h-5 w-5 text-peach-300" />
                          <span>+234 810 689 0380</span>
                        </div>
                        <div className="flex items-center font-extrabold  space-x-3">
                          <Mail className="h-5 w-5 text-peach-300" />
                          <span>dnnaji26@gmail.com</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Follow Us</h2>
                      <div className="flex space-x-4">
                        <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Office Hours</h2>
                      <div className="space-y-2 font-extrabold text-white/80">
                        <p>Monday - Friday: 9am - 6pm</p>
                        <p>Saturday: 10am - 4pm</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-2 bg-peach-100 backdrop-blur-md border-peach-100 rounded-2xl shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-first-name" className="text-sm font-bold text-peach-900">First Name</Label>
                      <Input 
                        id="contact-first-name"
                        type="text" 
                        required 
                        autoComplete="given-name"
                        className="bg-white/80 border-peach-200 focus:border-peach-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-last-name" className="text-sm font-bold text-peach-900">Last Name</Label>
                      <Input 
                        id="contact-last-name"
                        type="text" 
                        required 
                        autoComplete="family-name"
                        className="bg-white/80 border-peach-200 focus:border-peach-500" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-sm font-bold text-peach-900">Email</Label>
                    <Input 
                      id="contact-email"
                      type="email" 
                      required 
                      autoComplete="email"
                      className="bg-white/80 border-peach-200 focus:border-peach-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject" className="text-sm font-bold text-peach-900">Subject</Label>
                    <Input 
                      id="contact-subject"
                      type="text" 
                      required 
                      className="bg-white/80 border-peach-200 focus:border-peach-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-sm font-bold text-peach-900">Message</Label>
                    <Textarea 
                      id="contact-message"
                      required 
                      rows={6}
                      className="bg-white/80 border-peach-200 focus:border-peach-500" 
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className="w-full bg-peach-700 hover:bg-peach-700 font-extrabold text-white h-12 rounded-lg shadow-lg transition-all duration-300"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 
                     formStatus === 'submitted' ? 'Message Sent!' : 
                     'Send Message'} 
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  {/* Animated feedback for loading, error, and success states */}
                  <AnimatePresence>
                    {formStatus === 'submitting' && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-center gap-2 text-peach-700 font-bold"
                        aria-live="polite"
                      >
                        <Loader className="h-5 w-5 animate-spin" /> Sending...
                      </motion.div>
                    )}
                    {formStatus === 'submitted' && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-center gap-2 text-green-600 font-bold"
                        aria-live="polite"
                      >
                        <CheckCircle className="h-5 w-5" /> Message Sent!
                      </motion.div>
                    )}
                    {formError && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-center gap-2 text-red-600 font-bold"
                        aria-live="assertive"
                        role="alert"
                      >
                        <XCircle className="h-5 w-5" /> {formError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}