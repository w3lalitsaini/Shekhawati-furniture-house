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
          <h1 className="font-serif text-3xl text-[#442a22]">Categories</h1>
          <p className="font-sans text-sm text-[#5e604d] mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#442a22] to-[#5d4037] text-white font-sans text-sm rounded-md hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#f5f5dc] p-6 rounded-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input placeholder="Name" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
            <input placeholder="Slug" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
            <input placeholder="Description" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
          </div>
          <button className="px-6 py-2.5 bg-[#cba72f] text-[#241a00] font-sans text-sm font-semibold rounded-md">Save</button>
        </motion.div>
      )}

      <div className="grid gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between bg-[#f5f5dc] p-5 rounded-md"
          >
            <div>
              <h3 className="font-serif text-lg text-[#442a22]">{cat.name}</h3>
              <p className="font-sans text-sm text-[#5e604d]">{cat.description}</p>
              <span className="font-sans text-xs text-[#827470]">/{cat.slug}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-[#e4e4cc] rounded-md"><Edit2 className="w-4 h-4 text-[#442a22]" strokeWidth={1.5} /></button>
              <button className="p-2 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4 text-red-400" strokeWidth={1.5} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
