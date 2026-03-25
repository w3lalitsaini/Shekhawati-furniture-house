"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { _id: "1", name: "Sheesham Wood Furniture", slug: "sheesham", description: "Premium Sheesham wood collections" },
  { _id: "2", name: "Handcrafted Beds", slug: "beds", description: "Hand-carved beds with royal designs" },
  { _id: "3", name: "Royal Sofas", slug: "sofas", description: "Velvet and wood royal sofa sets" },
  { _id: "4", name: "Dining Sets", slug: "dining", description: "Jali-patterned dining tables and chairs" },
  { _id: "5", name: "Home Decor", slug: "decor", description: "Traditional home accessories" },
];

export default function AdminCategoriesPage() {
  const [showAdd, setShowAdd] = useState(false);

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
            <input placeholder="Name" className="px-4 py-3 bg-white/5 border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none placeholder:text-secondary" />
            <input placeholder="Slug" className="px-4 py-3 bg-white/5 border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none placeholder:text-secondary" />
            <input placeholder="Description" className="px-4 py-3 bg-white/5 border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none placeholder:text-secondary" />
          </div>
          <button className="px-6 py-2.5 bg-accent text-white font-sans text-sm font-bold rounded-md hover:opacity-90 transition-opacity">Save</button>
        </motion.div>
      )}

      <div className="grid gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between bg-surface-low p-5 rounded-md border border-white/5"
          >
            <div>
              <h3 className="font-serif text-lg text-white font-bold">{cat.name}</h3>
              <p className="font-sans text-sm text-secondary">{cat.description}</p>
              <span className="font-sans text-xs text-primary font-bold">/{cat.slug}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/5 rounded-md"><Edit2 className="w-4 h-4 text-primary" strokeWidth={1.5} /></button>
              <button className="p-2 hover:bg-red-950/30 rounded-md"><Trash2 className="w-4 h-4 text-red-400" strokeWidth={1.5} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
