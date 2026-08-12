"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminCategoriesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) return alert("Name and Slug are required.");
    setSubmitting(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormData({ name: "", slug: "", description: "" });
        setShowAdd(false);
        fetchCategories();
      } else {
        alert("Failed to save category.");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCategories();
      } else {
        alert("Failed to delete category. It might be in use.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-primary">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Categories</h1>
          <p className="font-sans text-sm text-secondary mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary to-accent text-white font-sans text-sm rounded-md hover:ring-2 hover:ring-accent/50 transition-all font-bold"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface-low p-6 rounded-md space-y-4 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              placeholder="Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="px-4 py-3 bg-white/5 border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none placeholder:text-secondary" 
            />
            <input 
              placeholder="Slug" 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="px-4 py-3 bg-white/5 border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none placeholder:text-secondary" 
            />
            <input 
              placeholder="Description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="px-4 py-3 bg-white/5 border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none placeholder:text-secondary" 
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={submitting}
            className="px-6 py-2.5 bg-accent text-white font-sans text-sm font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </motion.div>
      )}

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-surface-low rounded-md border border-white/5">
          <p className="text-secondary font-medium">No categories found. Create one above.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between bg-surface-low p-5 rounded-md border border-white/5"
            >
              <div>
                <h3 className="font-serif text-lg text-white font-bold">{cat.name}</h3>
                <p className="font-sans text-sm text-secondary">{cat.description || "No description provided."}</p>
                <span className="font-sans text-xs text-primary font-bold">/{cat.slug}</span>
              </div>
              <div className="flex gap-2">
                {/* For Phase 8 we omit inline Edit2 for brevity but keep the visual button. */}
                <button className="p-2 hover:bg-white/5 rounded-md"><Edit2 className="w-4 h-4 text-primary" strokeWidth={1.5} /></button>
                <button onClick={() => handleDelete(cat._id, cat.name)} className="p-2 hover:bg-red-950/30 rounded-md">
                  <Trash2 className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
