"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/store/ProductCard";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import { Search, ChevronDown, SlidersHorizontal, ArrowRight, Loader2, Filter } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: {
    _id: string;
    name: string;
  } | string;
  material: string;
  rating: number;
  isNewItem?: boolean;
  isFeatured?: boolean;
  isCustom?: boolean;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All Categories"]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          let prods: Product[] = [];
          if (Array.isArray(data)) {
            prods = data;
          } else if (data.data && Array.isArray(data.data)) {
            prods = data.data;
          } else {
            console.error("Unexpected products format:", data);
          }
          setProducts(prods);

          // Extract unique categories for dropdown
          const uniqueCats = Array.from(new Set(prods.map(p => getCategoryName(p.category))));
          setCategories(["All Categories", ...uniqueCats]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const getCategoryName = (cat: any) => {
    if (!cat) return "Uncategorized";
    if (typeof cat === 'object') return cat.name || "Uncategorized";
    return cat;
  };

  const filteredProducts = products
    .filter((p) => {
      const catName = getCategoryName(p.category);
      // Category filter
      if (selectedCategory !== "All Categories" && catName !== selectedCategory) return false;
      
      // Search filter
      const s = search.toLowerCase();
      return p.name.toLowerCase().includes(s) || catName.toLowerCase().includes(s);
    })
    .sort((a, b) => {
      if (sortBy === "Price Low-High") return a.price - b.price;
      if (sortBy === "Price High-Low") return b.price - a.price;
      // Default to Newest (we assume order from API or `CreatedAt`)
      return 0;
    });

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
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-primary/20 rounded-sm pl-12 pr-4 py-3 text-sm focus:outline-none transition-all font-medium text-black"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-[220px]">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm font-bold tracking-tight text-black focus:outline-none cursor-pointer pr-10 hover:border-black transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                </div>

                <div className="relative w-full sm:w-[180px]">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm font-bold tracking-tight text-black focus:outline-none cursor-pointer pr-10 hover:border-black transition-colors"
                  >
                    <option>Sort: Newest</option>
                    <option>Sort: Price Low-High</option>
                    <option>Sort: Price High-Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              <p>{loading ? "Loading..." : `${filteredProducts.length} products found`}</p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 pt-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">Fetching Collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif text-black mb-2">No masterpieces found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter to see what we have in store.</p>
              <button onClick={() => { setSearch(""); setSelectedCategory("All Categories"); }} className="mt-6 px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  id={p._id}
                  name={p.name}
                  price={p.price}
                  image={p.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop"}
                  category={getCategoryName(p.category)}
                  material={p.material || "Premium Quality"}
                  rating={5}
                  isNew={p.isNewItem}
                  isCustom={p.isCustom}
                  onAddToCart={() => addItem({ productId: p._id, name: p.name, price: p.price, image: p.images?.[0] || "" })}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredProducts.length > 0 && (
            <div className="mt-24 flex justify-center items-center gap-3">
              {[1].map(page => (
                <button 
                  key={page}
                  className={`w-12 h-12 flex items-center justify-center font-bold text-xs border ${page === 1 ? "bg-black text-white border-black shadow-xl" : "bg-white text-secondary border-gray-100 hover:border-black hover:text-black"} transition-all duration-300`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
