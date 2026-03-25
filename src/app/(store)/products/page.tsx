"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/store/ProductCard";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import { Search, ChevronDown, SlidersHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  rating: number;
  isNew?: boolean;
  isCustom?: boolean;
}

const SAMPLE_PRODUCTS: Product[] = [
  { _id: "1", name: "Modern Sofa", price: 1200, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop"], category: "Sofas", material: "Solid Wood", isNew: true, rating: 5 },
  { _id: "2", name: "King Bed", price: 850, images: ["https://images.unsplash.com/photo-1505671811165-0200670594d3?w=600&h=800&fit=crop"], category: "Beds", material: "Engineered Wood", isNew: true, rating: 5 },
  { _id: "3", name: "Dining Table", price: 950, images: ["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=800&fit=crop"], category: "Dining", material: "Teak Wood", isNew: true, rating: 4 },
  { _id: "4", name: "Wardrobe", price: 1100, images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=800&fit=crop"], category: "Wardrobes", material: "MDF", isNew: true, isCustom: true, rating: 5 },
  { _id: "5", name: "TV Unit", price: 450, images: ["https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&h=800&fit=crop"], category: "TV Units", material: "Particle Board", rating: 4 },
  { _id: "6", name: "Office Desk", price: 680, images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=800&fit=crop"], category: "Office", material: "Metal & Wood", rating: 5 },
  { _id: "7", name: "Aluminum Door", price: 1500, images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&h=800&fit=crop"], category: "Aluminum", material: "Aluminum", isCustom: true, rating: 4 },
  { _id: "8", name: "Kitchen Cabinet", price: 2200, images: ["https://images.unsplash.com/photo-1556912177-c54030639a09?w=600&h=800&fit=crop"], category: "Kitchen", material: "Plywood", rating: 5 },
  { _id: "9", name: "Coffee Table", price: 320, images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=800&fit=crop"], category: "Tables", material: "Glass & Wood", rating: 5 },
  { _id: "10", name: "Bookshelf", price: 480, images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&h=800&fit=crop"], category: "Storage", material: "Solid Wood", isCustom: true, rating: 4 },
  { _id: "11", name: "Study Table", price: 560, images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=800&fit=crop"], category: "Office", material: "Metal", rating: 5 },
  { _id: "12", name: "Side Table", price: 280, images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=800&fit=crop"], category: "Tables", material: "Wood", rating: 4 },
];

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-surface py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-5xl font-bold text-white tracking-tight">Our Products</h1>
              <p className="text-secondary text-base font-medium">Premium furniture & aluminum work for modern homes</p>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary/20 rounded-sm pl-12 pr-4 py-3 text-sm focus:outline-none transition-all font-medium"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-[180px]">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm font-bold tracking-tight focus:outline-none cursor-pointer pr-10 hover:border-black transition-colors"
                  >
                    <option>Sort: Newest</option>
                    <option>Sort: Price Low-High</option>
                    <option>Sort: Price High-Low</option>
                    <option>Sort: Popularity</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                </div>

                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-sm hover:border-black transition-all text-sm font-bold tracking-tight w-full md:w-auto">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              <p>{filteredProducts.length} products found</p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p._id}
                id={p._id}
                name={p.name}
                price={p.price}
                image={p.images[0]}
                category={p.category}
                material={p.material}
                rating={p.rating}
                isNew={p.isNew}
                isCustom={p.isCustom}
                onAddToCart={() => addItem({ productId: p._id, name: p.name, price: p.price, image: p.images[0] })}
              />
            ))}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="mt-24 flex justify-center items-center gap-3">
              {[1, 2, 3].map(page => (
                <button 
                  key={page}
                  className={`w-12 h-12 flex items-center justify-center font-bold text-xs border ${page === 1 ? "bg-black text-white border-black shadow-xl" : "bg-white text-secondary border-gray-100 hover:border-black hover:text-black"} transition-all duration-300`}
                >
                  {page}
                </button>
              ))}
              <button className="w-12 h-12 flex items-center justify-center text-secondary border border-gray-100 hover:border-black hover:text-black transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
