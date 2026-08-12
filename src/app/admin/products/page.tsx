"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Search, Edit2, Trash2, ExternalLink, 
  Package, IndianRupee, Layers, ShoppingBag,
  Filter, ChevronRight, MoreVertical, Star,
  AlertCircle, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/categories")
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      setProducts(prodData);
      setCategories(catData);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this masterpiece from the collection?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p: any) => p._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category._id === selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen bg-black text-white ${geist.className}`}>
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4">
            <h2 className="text-primary text-[10px] font-bold uppercase tracking-[0.5em] flex items-center gap-3">
              <span className="w-10 h-px bg-primary/30" />
              Administrative Atelier
            </h2>
            <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tight italic">
              Product <span className="text-secondary opacity-50">Curated</span> <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-secondary text-xs font-bold uppercase tracking-[0.3em] max-w-xl">
              Manage the digital representation of our heritage craftsmanship. Real-time synchronization active.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-sm border border-white/10 flex items-center gap-6">
               <div className="text-center">
                 <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Total Pieces</p>
                 <p className="text-xl font-serif font-bold italic">{products.length}</p>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="text-center">
                 <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Categories</p>
                 <p className="text-xl font-serif font-bold italic">{categories.length}</p>
               </div>
            </div>
            
            <Link 
              href="/admin/products/new"
              className="group relative px-10 py-5 bg-primary overflow-hidden rounded-sm transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/20"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative flex items-center gap-3">
                <Plus className="w-5 h-5 text-white" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Forge New Piece</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Toolbar */}
        <div className="mb-10 flex flex-col md:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-sm focus:border-primary/50 focus:outline-none transition-all placeholder:text-secondary/50 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest font-medium text-white"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
            <Filter className="w-4 h-4" />
            Current Exhibition: {filteredProducts.length} Pieces
          </div>
        </div>

        <div className="overflow-x-auto bg-white/5 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-white/5 border-b border-white/5 text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">
                <th className="px-8 py-6">Masterpiece Details</th>
                <th className="px-8 py-6">Investment / Stock</th>
                <th className="px-8 py-6">Collection</th>
                <th className="px-8 py-6">Media Gallery</th>
                <th className="px-8 py-6 text-center">Attributes</th>
                <th className="px-8 py-6 text-right">Curation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="group hover:bg-white/[0.04] transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="font-serif text-lg font-bold text-white group-hover:text-primary transition-colors tracking-tight italic">{p.name}</div>
                      <div className="text-[10px] text-secondary font-bold uppercase tracking-widest opacity-60">{p.material || "Artisan Craftsmanship"}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-white italic">₹{p.price.toLocaleString("en-IN")}</div>
                      <div className={`text-[9px] font-black uppercase tracking-widest ${p.stock < 10 ? "text-red-400" : "text-primary"}`}>
                        {p.stock <= 0 ? "Exhausted" : `${p.stock} Units Remaining`}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-sm text-[8px] font-black uppercase tracking-[0.2em] border border-primary/20">
                      {p.category?.name || "Global Collection"}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex -space-x-3 transition-transform group-hover:translate-x-1">
                      {p.images.slice(0, 3).map((img: string, i: number) => (
                        <div key={i} className="h-10 w-10 rounded-sm ring-2 ring-black overflow-hidden bg-white/5 border border-white/10">
                          <img src={img} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                       {p.isFeatured && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,191,0,0.8)]" title="Featured" />}
                       {p.isNewItem && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" title="New Arrival" />}
                       {p.isCustom && <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" title="Custom Support" />}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      <Link 
                        href={`/admin/products/${p._id}/edit`}
                        className="p-3 bg-white/5 hover:bg-primary hover:text-white rounded-sm text-secondary transition-all border border-white/10 hover:border-primary shadow-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p._id)}
                        className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-sm text-secondary transition-all border border-white/10 hover:border-red-500 shadow-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center space-y-4">
              <Package className="w-12 h-12 text-white/5 mx-auto" />
              <p className="font-serif text-xl text-secondary italic">No pieces found in this view...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
