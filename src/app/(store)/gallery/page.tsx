"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  "All",
  "Home Furniture",
  "Office Furniture",
  "Kitchen Furniture",
  "Aluminum Work",
  "Interior Projects",
];

const PROJECTS = [
  { id: 1, title: "Modern Green Sofa", category: "Home Furniture", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Glass Office Partition", category: "Office Furniture", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Corporate Meeting Space", category: "Office Furniture", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Luxury Dining Area", category: "Kitchen Furniture", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Contemporary Bedroom", category: "Home Furniture", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Kitchen Island Design", category: "Kitchen Furniture", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" },
  { id: 7, title: "Precision Aluminum Work", category: "Aluminum Work", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" },
  { id: 8, title: "Minimalist Master Suite", category: "Interior Projects", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-surface py-10 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Project <span className="text-primary">Gallery</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-secondary text-lg font-medium uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed"
            >
              Browse our completed projects and find inspiration for your space
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-12 bg-gray-50 border-b border-gray-100 sticky top-20 z-40 backdrop-blur-md bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "bg-white text-secondary hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`relative group rounded-xl overflow-hidden shadow-xl aspect-square cursor-pointer ${
                    i % 5 === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{project.category}</p>
                    <h3 className="font-serif text-xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
