"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const SAMPLE_PRODUCTS = [
  { _id: "1", name: "The Maharaja Royal Sofa", price: 125000, stock: 5, category: "Royal Sofas", isFeatured: true },
  { _id: "2", name: "Sheesham Jali Dining Table", price: 85000, stock: 12, category: "Dining Sets", isFeatured: true },
  { _id: "3", name: "Heritage Carved King Bed", price: 175000, stock: 3, category: "Handcrafted Beds", isFeatured: true },
  { _id: "4", name: "Rajwadi Armchair", price: 45000, stock: 8, category: "Home Decor", isFeatured: false },
  { _id: "5", name: "Haveli Coffee Table", price: 32000, stock: 15, category: "Home Decor", isFeatured: false },
  { _id: "6", name: "Palace Wardrobe", price: 95000, stock: 4, category: "Sheesham Wood", isFeatured: false },
];

export default function AdminProductsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#442a22]">Products</h1>
          <p className="font-sans text-sm text-[#5e604d] mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#442a22] to-[#5d4037] text-white font-sans text-sm rounded-md hover:opacity-90 transition-opacity"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-[#f5f5dc] p-6 rounded-md space-y-4">
          <h3 className="font-serif text-lg text-[#442a22]">New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Product Name" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
            <input placeholder="Price (₹)" type="number" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
            <input placeholder="Material" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
            <input placeholder="Stock" type="number" className="px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
          </div>
          <textarea placeholder="Description" rows={3} className="w-full px-4 py-3 bg-white border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm focus:border-[#D4AF37] focus:outline-none" />
          <button className="px-6 py-2.5 bg-[#cba72f] text-[#241a00] font-sans text-sm font-semibold rounded-md hover:opacity-90">Save Product</button>
        </motion.div>
      )}

      <div className="bg-[#f5f5dc] rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left font-sans text-xs text-[#5e604d] uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Featured</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_PRODUCTS.map((p) => (
                <tr key={p._id} className="border-t border-[#d4c3be]/10 font-sans text-sm">
                  <td className="px-6 py-4 text-[#442a22] font-semibold">{p.name}</td>
                  <td className="px-6 py-4 text-[#5e604d]">{p.category}</td>
                  <td className="px-6 py-4 text-[#735c00] font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${p.stock < 5 ? "text-red-500" : "text-green-600"}`}>{p.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    {p.isFeatured && <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#735c00] text-xs rounded">Featured</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-[#e4e4cc] rounded"><Edit2 className="w-4 h-4 text-[#442a22]" strokeWidth={1.5} /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-red-400" strokeWidth={1.5} /></button>
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
