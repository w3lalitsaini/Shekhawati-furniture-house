"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Users, Calendar, CheckSquare, Award } from "lucide-react";

export default function AboutPage() {
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
              About <span className="text-primary">FurniCraft</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-secondary text-lg font-medium uppercase tracking-[0.3em]"
            >
              Crafting premium furniture for over a decade
            </motion.p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-4xl font-bold text-black tracking-tight">Our Story</h2>
              <div className="space-y-6 text-secondary text-sm leading-relaxed font-medium">
                <p>
                  FurniCraft was founded in 2014 with a simple mission: to make premium, custom furniture accessible to everyone. What started as a small workshop with 5 craftsmen has grown into a full-service furniture and aluminum work company with over 50 skilled professionals.
                </p>
                <p>
                  We specialize in custom furniture design, premium aluminum doors and windows, and complete interior furniture solutions. Every piece we create is a testament to our commitment to quality, craftsmanship, and customer satisfaction.
                </p>
                <p>
                  From ready-made collections to fully custom pieces, we work closely with our clients to bring their vision to life. Our state-of-the-art workshop is equipped with modern machinery alongside traditional woodworking skills.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Happy Clients", value: "500+", icon: Users },
              { label: "Years Experience", value: "10+", icon: Calendar },
              { label: "Projects Done", value: "1000+", icon: CheckSquare },
              { label: "Expert Team", value: "50+", icon: Award },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl text-center space-y-2 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <h3 className="font-serif text-3xl font-bold text-black tracking-tight">{stat.value}</h3>
                <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
