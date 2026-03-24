"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-surface py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-secondary text-lg font-medium uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed"
            >
              Get in touch for quotes, custom orders, or any questions
            </motion.p>
          </div>
        </section>

        {/* Contact Actions Section */}
        <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary text-sm font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed"
          >
            Visit our homepage contact section or use the buttons below to reach us directly.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Call Button */}
            <motion.a 
              href="tel:+1234567890"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className="group flex flex-col items-center gap-6 p-10 bg-primary text-white rounded-xl shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-8 h-8" />
              </div>
              <span className="font-serif text-xl font-bold">Call Us Now</span>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a 
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group flex flex-col items-center gap-6 p-10 bg-whatsapp text-white rounded-xl shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <MessageCircle className="w-8 h-8" />
              </div>
              <span className="font-serif text-xl font-bold">WhatsApp</span>
            </motion.a>

            {/* Email Button */}
            <motion.a 
              href="mailto:info@furnicraft.com"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group flex flex-col items-center gap-6 p-10 bg-white border-2 border-primary text-primary rounded-xl shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Mail className="w-8 h-8" />
              </div>
              <span className="font-serif text-xl font-bold">Email Us</span>
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
