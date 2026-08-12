"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Loader2, Edit3 } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
// Removed react-hot-toast import

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/admin/products/${productId}`),
          fetch("/api/categories")
        ]);
        
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        
        setProduct(prodData);
        setCategories(catData);
      } catch (error) {
        console.error("Failed to fetch data");
        alert("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchData();
  }, [productId]);

  const handleSave = async (formData: any) => {
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Design refined successfully!");
        router.push("/admin/products");
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to update product");
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

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl text-white font-serif italic mb-6">Product Not Found</h2>
        <Link href="/admin/products" className="text-primary font-bold uppercase tracking-widest text-[10px]">Return to Collection</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1920')] bg-fixed bg-cover opacity-10 pointer-events-none" />
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
                <Edit3 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-5xl text-white font-bold tracking-tight italic">Refine <span className="text-primary italic">Design</span></h1>
                <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.4em] mt-2">Editing: {product.name}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <ProductForm 
            initialData={product}
            categories={categories}
            onSave={handleSave}
            onCancel={() => router.push("/admin/products")}
          />
        </div>
      </div>
    </div>
  );
}
