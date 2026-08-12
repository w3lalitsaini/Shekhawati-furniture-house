"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function GalleryClient({ projects, categories }: { projects: any[], categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
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
            {categories.map((cat) => (
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
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <h3 className="font-serif text-3xl font-bold text-black mb-4">No projects found</h3>
            <p className="text-gray-500 font-medium">Check back soon for new additions to this category.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
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
        )}
      </section>
    </main>
  );
}
