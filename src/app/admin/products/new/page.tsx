"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
// Removed react-hot-toast import

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories");
        alert("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async (formData: any) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Masterpiece forged successfully!");
        router.push("/admin/products");
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to save product");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=1920')] bg-fixed bg-cover opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link 
              href="/admin/products" 
              className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Collection
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-sm border border-primary/20">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-5xl text-white font-bold tracking-tight italic">New <span className="text-primary italic">Creation</span></h1>
                <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mt-2">Product Forge Terminal v2.0</p>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <ProductForm 
            categories={categories}
            onSave={handleSave}
            onCancel={() => router.push("/admin/products")}
          />
        </div>
      </div>
    </div>
  );
}
