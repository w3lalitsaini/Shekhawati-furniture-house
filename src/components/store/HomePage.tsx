"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  MessageCircle, 
  ChevronRight, 
  Search, 
  User, 
  Menu, 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  Armchair,
  Home,
  Layout,
  Sun,
  Layers,
  Sparkles,
  PenTool,
  Settings,
  Globe,
  Award
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import ProductCard from "./ProductCard";

const CATEGORIES = [
  { name: "Living Room", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400", count: 24 },
  { name: "Bedroom", image: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=400", count: 18 },
  { name: "Dining Room", image: "https://images.unsplash.com/photo-1524758631624-624a10e4708a?auto=format&fit=crop&q=80&w=400", count: 12 },
  { name: "Office", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400", count: 9 },
  { name: "Aluminum", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400", count: 15 },
];

const BEST_SELLERS = [
  { id: 1, name: "Modern Sofa", price: 1200, category: "Living Room", rating: 5, reviews: 48, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", isNew: true },
  { id: 2, name: "Dining Table", price: 850, category: "Dining", rating: 4, reviews: 32, image: "https://images.unsplash.com/photo-1524758631624-624a10e4708a?auto=format&fit=crop&q=80&w=800", isCustom: true },
  { id: 3, name: "King Bed", price: 1500, category: "Bedroom", rating: 5, reviews: 29, image: "https://images.unsplash.com/photo-1505671811165-0200670594d3?auto=format&fit=crop&q=80&w=800", isNew: true },
  { id: 4, name: "Office Desk", price: 450, category: "Office", rating: 4, reviews: 15, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
];

const floatingAnimation = (delay = 0) => ({
  y: [0, -20, 0],
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export default function HomePage() {
  const containerRef = useRef(null);

  return (
    <div className="bg-white overflow-x-hidden" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 z-10 hidden lg:block pointer-events-none">
          {/* Main Floating Icons */}
          <motion.div animate={floatingAnimation(0)} className="absolute top-[18%] left-[12%] p-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <Armchair className="w-10 h-10 text-primary" strokeWidth={1.5} />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </motion.div>
          
          <motion.div animate={floatingAnimation(1.2)} className="absolute top-[30%] right-[8%] p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <Layout className="w-12 h-12 text-primary" strokeWidth={1} />
            <p className="text-[8px] font-bold text-white mt-1 uppercase tracking-tighter">Aluminum</p>
          </motion.div>
          
          <motion.div animate={floatingAnimation(0.6)} className="absolute bottom-[28%] left-[20%] p-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <Home className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </motion.div>
          
          <motion.div animate={floatingAnimation(1.8)} className="absolute bottom-[35%] right-[18%] p-5 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
            <Sun className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </motion.div>

          {/* Smaller Particles */}
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }} 
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-1/4 left-1/2 w-4 h-4 bg-primary/20 blur-xl rounded-full" 
          />
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.5, 1] }} 
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-primary/10 blur-2xl rounded-full" 
          />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-serif text-5xl md:text-8xl text-white font-bold leading-tight tracking-tighter">
              Premium Furniture & <br/>
              <span className="text-primary italic">Aluminum Work</span>
            </h1>
            <p className="text-secondary text-lg md:text-xl font-medium tracking-[0.2em] uppercase max-w-3xl mx-auto">
              Masterpieces crafted for modern living and architectural excellence
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/products" className="group px-10 py-5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-3">
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/custom" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white/20 transition-all flex items-center gap-3">
                Custom Orders
              </Link>
              <Link href="https://wa.me/1234567890" className="px-10 py-5 bg-whatsapp text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:scale-105 transition-all flex items-center gap-3">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black to-transparent py-14">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Clients", value: "500+" },
              { label: "Years Experience", value: "10+" },
              { label: "Projects Done", value: "1000+" },
              { label: "Expert Team", value: "50+" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center space-y-1"
              >
                <p className="text-2xl md:text-3xl font-serif font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-secondary font-bold tracking-widest uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em]">Explore By Room</h2>
            <h3 className="font-serif text-4xl font-bold text-black tracking-tight">Our Collections</h3>
          </div>
          <Link href="/products" className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-black transition-colors flex items-center gap-2">
            View All Rooms <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={cat.name}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-xl">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-6 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest">Explore</span>
                </div>
              </div>
              <h4 className="font-serif text-xl font-bold text-black">{cat.name}</h4>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">{cat.count} items</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-primary text-[10px] font-bold uppercase tracking-[0.5em]">Fan Favorites</h2>
            <h3 className="font-serif text-5xl font-bold text-black tracking-tight">Best Selling Masterpieces</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BEST_SELLERS.map((product, i) => (
              <ProductCard 
                key={product.id} 
                id={product.id.toString()} 
                name={product.name} 
                price={product.price} 
                image={product.image} 
                category={product.category} 
                rating={product.rating}
                isNew={product.isNew} 
                isCustom={product.isCustom}
              />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/products" className="inline-flex px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-primary transition-all shadow-2xl">
              Discover Full Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em]">The Journey</h2>
          <h3 className="font-serif text-5xl font-bold text-black tracking-tight">How we create perfection</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />
          
          {[
            { step: "01", title: "Consultation", desc: "Share your vision with our expert designers", icon: MessageCircle },
            { step: "02", title: "Digital Blueprint", desc: "Detailed 3D design of your custom piece", icon: PenTool },
            { step: "03", title: "Craftsmanship", desc: "Precise manufacturing in our workshop", icon: Settings },
            { step: "04", title: "Global Delivery", desc: "Professional installation at your space", icon: Truck },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-full bg-white border border-gray-100 flex items-center justify-center mx-auto shadow-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                <span className="absolute -top-4 -right-4 text-[10px] font-bold text-secondary">{item.step}</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-black">{item.title}</h4>
                <p className="text-secondary text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-primary text-[10px] font-bold uppercase tracking-[0.5em]">Testimonials</h2>
              <h3 className="font-serif text-5xl font-bold leading-tight tracking-tight">What our premium <br/> clients say</h3>
              <p className="text-secondary text-base leading-relaxed max-w-md">
                We've spent a decade perfecting the art of furniture making. Join our community of 500+ satisfied homeowners.
              </p>
              <div className="flex gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-surface overflow-hidden bg-gray-200">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-1">4.9/5 stars rating</p>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md p-12 rounded-2xl border border-white/10 space-y-8"
            >
              <Star className="w-10 h-10 text-primary" strokeWidth={1} />
              <p className="font-serif text-2xl leading-relaxed italic">
                "The custom mahogany dining table they created for us is truly a work of art. The attention to detail and the quality of finish are beyond what we expected."
              </p>
              <div>
                <h5 className="font-bold text-lg">Vikram Singh</h5>
                <p className="text-secondary text-xs font-bold uppercase tracking-widest">Architectural Firm CEO</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leads Form Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-12 lg:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 text-black/5 pointer-events-none">
            <h4 className="font-serif text-[15rem] leading-none select-none">FC</h4>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-6">
              <h3 className="font-serif text-5xl font-bold leading-tight">Request a free <br/> consultation</h3>
              <p className="text-white/80 text-sm font-medium leading-relaxed max-w-md uppercase tracking-wider">
                Speak with our design experts today and get a personalized quote for your project. No commitment required.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "5-Year Heritage Warranty" },
                  { icon: Truck, text: "Complimentary White Glove Delivery" },
                  { icon: Clock, text: "Production Updates Every 48h" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-3xl space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <input type="text" placeholder="FULL NAME" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-xs font-bold tracking-widest" />
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-xs font-bold tracking-widest" />
              </div>
              <textarea rows={4} placeholder="TELL US ABOUT YOUR PROJECT..." className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-xs font-bold tracking-widest"></textarea>
              <button className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-primary transition-all shadow-xl">
                Send Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-5 gap-12 items-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex justify-center">
              <img src={`https://via.placeholder.com/150x50/FFFFFF/000000?text=PARTNER+${i}`} alt="Partner" className="h-8 md:h-12 w-auto" />
            </div>
          ))}
        </div>
      </section>

      {/* Map & Final Contact */}
      <section className="grid lg:grid-cols-2">
        <div className="h-[400px] lg:h-auto bg-gray-200 relative group overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113942.15570258169!2d75.71391696071725!3d26.881338006830582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63404c004a43!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" 
            className="w-full h-full border-0 absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          ></iframe>
        </div>
        <div className="bg-gray-50 p-12 lg:p-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-secondary text-[10px] font-bold uppercase tracking-[0.5em]">Visit Our Atelier</h2>
            <h3 className="font-serif text-4xl font-bold text-black tracking-tight">Come find us</h3>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-black">Location</h4>
                <p className="text-secondary text-sm mt-1 font-medium italic">123 Furniture Street, Industrial Design District, <br/> Jaipur, Rajasthan 302001</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-black">Connect</h4>
                <p className="text-secondary text-sm mt-1 font-medium">+91 141 234 5678</p>
                <p className="text-secondary text-sm font-medium">info@furnicraft.com</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-black">Opening Hours</h4>
                <p className="text-secondary text-sm mt-1 font-medium">Monday - Saturday: 10:00 AM - 08:00 PM</p>
                <p className="text-secondary text-sm font-medium italic text-red-400">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
