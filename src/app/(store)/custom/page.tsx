"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CustomFurniturePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    productType: "",
    length: "",
    width: "",
    height: "",
    material: "",
    color: "",
    budget: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              Custom Furniture <span className="text-primary">Request</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-secondary text-lg font-medium uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed"
            >
              Tell us your dream, we'll craft it to perfection
            </motion.p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            <form className="space-y-10">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" name="fullName" required 
                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" name="phone" required 
                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" 
                    placeholder="+91 98765 43210" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" name="email" required 
                    className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      name="productType" required
                      className="w-full border-b border-gray-200 py-3 appearance-none focus:outline-none focus:border-primary transition-colors font-medium bg-transparent pr-10"
                    >
                      <option value="">Select type</option>
                      <option value="sofa">Sofa & Seating</option>
                      <option value="bed">Bed & Bedroom</option>
                      <option value="dining">Dining Table</option>
                      <option value="wardrobe">Wardrobe</option>
                      <option value="kitchen">Kitchen Cabinet</option>
                      <option value="aluminum">Aluminum Work</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="space-y-6">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">
                  Dimensions (cm)
                </label>
                <div className="grid grid-cols-3 gap-6">
                  <input type="number" placeholder="Length" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" />
                  <input type="number" placeholder="Width" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" />
                  <input type="number" placeholder="Height" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" />
                </div>
              </div>

              {/* Material & Budget */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Material</label>
                  <select className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent appearance-none">
                    <option value="">Any material</option>
                    <option value="teak">Teak Wood</option>
                    <option value="sheesham">Sheesham Wood</option>
                    <option value="aluminum">Premium Aluminum</option>
                    <option value="glass">Glass</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Color</label>
                  <input type="text" placeholder="e.g. Walnut brown" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Budget</label>
                  <select className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent appearance-none">
                    <option value="">Select budget</option>
                    <option value="low">Under ₹50,000</option>
                    <option value="mid">₹50,000 - ₹2,00,000</option>
                    <option value="high">Above ₹2,00,000</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Description <span className="text-red-500">*</span></label>
                <textarea 
                  rows={4} required
                  className="w-full border border-gray-200 rounded-sm p-4 focus:outline-none focus:border-primary transition-colors font-medium bg-gray-50/50"
                  placeholder="Describe your requirements in detail..."
                ></textarea>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Reference Image (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center space-y-4 hover:border-primary hover:bg-primary/[0.02] transition-all cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-secondary">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-black text-sm uppercase tracking-widest">Upload reference image or design sketch</p>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-6 bg-primary text-white font-serif text-xl font-bold rounded-xl shadow-2xl shadow-primary/30 hover:bg-black transition-all duration-500"
              >
                Submit Custom Furniture Request
              </motion.button>

              <p className="text-[10px] text-center text-secondary font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 pt-4">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Our designers will contact you within 24 hours
              </p>
            </form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
