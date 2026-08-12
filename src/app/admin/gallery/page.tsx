"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2, Image as ImageIcon, Camera, X } from "lucide-react";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({ title: "", url: "", category: "Project" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url || !formData.title) return alert("Title and Image URL are required.");
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ title: "", url: "", category: "Project" });
        setShowAdd(false);
        fetchGallery();
      } else {
        alert("Failed to add to gallery");
      }
    } catch (error) {
      console.error("Add gallery error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this masterpiece from the gallery?")) return;
    
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchGallery();
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete gallery error:", error);
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-primary">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Gallery Management</h1>
          <p className="font-sans text-sm text-secondary mt-1">Showcase your finest handcrafted projects</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-accent text-white font-sans text-xs font-bold uppercase tracking-widest rounded-sm hover:ring-2 hover:ring-accent/50 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Add To Gallery
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-surface-low p-6 rounded-md border border-white/5 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-serif text-xl text-white font-bold">New Gallery Entry</h2>
              <button onClick={() => setShowAdd(false)} className="text-secondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Project Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Royal Jodhpur Suite"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-surface-high border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Image URL</label>
                <input 
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full bg-surface-high border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-surface-high border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-accent appearance-none"
                >
                  <option>Project</option>
                  <option>Bedroom</option>
                  <option>Living Room</option>
                  <option>Dining</option>
                  <option>Custom Work</option>
                </select>
              </div>
              <div className="md:col-span-3 flex justify-end">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-accent text-white font-sans text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {submitting ? "Adding..." : "Confirm & Add"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-surface-low rounded-md overflow-hidden border border-white/5 aspect-square shadow-lg"
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <h3 className="font-serif text-lg text-white font-bold leading-tight">{item.title}</h3>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{item.category}</p>
              
              <button 
                onClick={() => handleDelete(item._id)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-xl"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 group-hover:hidden transition-all">
               <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-widest rounded-full border border-white/10">
                 {item.category}
               </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-24 bg-surface-low rounded-md border border-white/10">
          <ImageIcon className="w-12 h-12 text-secondary mx-auto mb-4 opacity-20" />
          <h3 className="font-serif text-2xl text-white font-bold">No Projects Showcased</h3>
          <p className="text-secondary mt-2">Start adding curated visuals of your craftsmanship</p>
        </div>
      )}
    </div>
  );
}
