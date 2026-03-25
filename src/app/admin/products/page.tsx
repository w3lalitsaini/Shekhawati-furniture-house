"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Search, Filter, Loader2 } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/categories")
      ]);
      const [prods, cats] = await Promise.all([prodRes.json(), catRes.json()]);
      setProducts(prods);
      setCategories(cats);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : "/api/admin/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setShowForm(false);
        setEditingProduct(null);
        fetchData();
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this piece of heritage?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-primary">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Product Inventory</h1>
          <p className="font-sans text-sm text-secondary mt-1">Manage your catalog of handcrafted Shekhawati furniture</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-accent text-white font-sans text-xs font-bold uppercase tracking-widest rounded-sm hover:ring-2 hover:ring-accent/50 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add New Piece
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="min-h-screen py-10">
              <ProductForm 
                initialData={editingProduct} 
                categories={categories}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditingProduct(null); }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-surface-low rounded-lg shadow-sm border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-high/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-high border border-white/5 rounded-md text-sm text-white focus:outline-accent placeholder:text-secondary"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            Showing {filteredProducts.length} Products
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-surface-high border-b border-white/5 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Piece Details</th>
                <th className="px-6 py-4">Price / Stock</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Visuals</th>
                <th className="px-6 py-4 text-center">Settings</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="group hover:bg-surface-high/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-white group-hover:text-primary transition-colors">{p.name}</div>
                      <div className="text-[10px] text-secondary font-bold uppercase tracking-tight line-clamp-1">{p.material || "Genuine Sheesham Wood"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-bold text-white">₹{p.price.toLocaleString("en-IN")}</div>
                      <div className={`text-[10px] font-bold uppercase ${p.stock < 5 ? "text-red-400" : "text-green-500"}`}>
                        {p.stock} Units left
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-white/5 text-secondary rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {p.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-3 overflow-hidden">
                      {p.images.slice(0, 3).map((img: string, i: number) => (
                        <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-surface overflow-hidden bg-surface-high">
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </div>
                      ))}
                      {p.images.length > 3 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-surface bg-surface-high text-[10px] font-bold text-secondary">
                          +{p.images.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                       {p.isFeatured && <span className="w-2 h-2 rounded-full bg-accent" title="Featured" />}
                       {p.isNewItem && <span className="w-2 h-2 rounded-full bg-blue-400" title="New Arrival" />}
                       {p.isCustom && <span className="w-2 h-2 rounded-full bg-purple-400" title="Custom Piece" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingProduct(p); setShowForm(true); }}
                        className="p-2 hover:bg-white/5 hover:shadow-md rounded-full text-secondary hover:text-primary transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(p._id)}
                        className="p-2 hover:bg-white/5 hover:shadow-md rounded-full text-secondary hover:text-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
