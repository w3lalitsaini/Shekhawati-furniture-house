"use client";

import { useState, useEffect } from "react";
import { X, Upload, Plus, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, categories, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    description: "",
    price: 0,
    category: "",
    material: "",
    woodType: "",
    warranty: "",
    stock: 0,
    isFeatured: false,
    isNewItem: true,
    isCustom: false,
    dimensions: { width: 0, height: 0, depth: 0, unit: "cm" },
    weight: 0,
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === "number" ? Number(value) : value }
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value)
      }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);

    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.secure_url) {
        setFormData((prev: any) => ({
          ...prev,
          images: [...prev.images, result.secure_url]
        }));
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-2xl p-8 border border-gray-100 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">{initialData ? "Edit Product" : "New Heritage Piece"}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Product Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-primary focus:outline-none transition-all rounded-t-md font-sans" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-primary focus:outline-none transition-all rounded-t-md font-sans">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Price (₹)</label>
            <input name="price" type="number" value={formData.price} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-primary focus:outline-none transition-all rounded-t-md font-sans" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Stock Units</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-primary focus:outline-none transition-all rounded-t-md font-sans" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-primary focus:outline-none transition-all rounded-t-md font-sans resize-none" />
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Wood Type</label>
            <input name="woodType" value={formData.woodType} onChange={handleChange} placeholder="e.g. Sheesham" className="w-full px-4 py-2 bg-gray-50 border-b focus:border-primary focus:outline-none transition-all font-sans" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Material Extra</label>
            <input name="material" value={formData.material} onChange={handleChange} placeholder="e.g. Velvet" className="w-full px-4 py-2 bg-gray-50 border-b focus:border-primary focus:outline-none transition-all font-sans" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Warranty</label>
            <input name="warranty" value={formData.warranty} onChange={handleChange} placeholder="e.g. 5 Years" className="w-full px-4 py-2 bg-gray-50 border-b focus:border-primary focus:outline-none transition-all font-sans" />
          </div>
        </div>

        {/* Dimensions */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Physical Dimensions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input name="dimensions.width" type="number" value={formData.dimensions.width} onChange={handleChange} placeholder="Width" className="px-4 py-2 bg-white border rounded focus:outline-primary font-sans text-sm" />
            <input name="dimensions.height" type="number" value={formData.dimensions.height} onChange={handleChange} placeholder="Height" className="px-4 py-2 bg-white border rounded focus:outline-primary font-sans text-sm" />
            <input name="dimensions.depth" type="number" value={formData.dimensions.depth} onChange={handleChange} placeholder="Depth" className="px-4 py-2 bg-white border rounded focus:outline-primary font-sans text-sm" />
            <select name="dimensions.unit" value={formData.dimensions.unit} onChange={handleChange} className="px-4 py-2 bg-white border rounded focus:outline-primary font-sans text-sm">
              <option value="cm">cm</option>
              <option value="inch">inch</option>
              <option value="feet">feet</option>
            </select>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Product Gallery (Cloudinary)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {formData.images.map((url: string, i: number) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-gray-100 group border">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removeImage(i)} className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
            <label className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
              {uploading ? <Loader2 className="w-6 h-6 text-primary animate-spin" /> : <Plus className="w-6 h-6 text-gray-400" />}
              <span className="text-[8px] font-bold text-gray-400 uppercase">Upload</span>
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
            </label>
          </div>
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-8 pt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 accent-primary" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">Featured Item</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" name="isNewItem" checked={formData.isNewItem} onChange={handleChange} className="w-5 h-5 accent-primary" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">New Arrival</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" name="isCustom" checked={formData.isCustom} onChange={handleChange} className="w-5 h-5 accent-primary" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">Custom Project</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-primary transition-all shadow-xl disabled:opacity-50"
        >
          {initialData ? "Update Specification" : "Add to Catalog"}
        </button>
      </form>
    </motion.div>
  );
}
