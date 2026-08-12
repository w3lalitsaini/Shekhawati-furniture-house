"use client";

import { useState } from "react";
import { X, Upload, Plus, Trash2, Loader2, Info, Ruler, Image as ImageIcon, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

const TABS = [
  { id: "basic", label: "Basic Info", icon: Info },
  { id: "specs", label: "Specifications", icon: Ruler },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProductForm({ initialData, categories, onSave, onCancel }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Product Name *</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" placeholder="e.g. Royal Oxford Sofa" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Category *</label>
                <select name="category" value={initialData && typeof formData.category === 'object' ? formData.category._id : formData.category} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm appearance-none">
                  <option value="" className="bg-surface-high">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id} className="bg-surface-high">{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Price (₹) *</label>
                <input name="price" type="number" min="0" value={formData.price} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Stock Units *</label>
                <input name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Full Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} required className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm resize-none" placeholder="Elaborate on the craftsmanship, design, and comfort..." />
            </div>
          </motion.div>
        );
      case "specs":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Wood Type</label>
                <input name="woodType" value={formData.woodType} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" placeholder="e.g. Solid Teak Wood" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Material Details</label>
                <input name="material" value={formData.material} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" placeholder="e.g. Sapphire Velvet, Brass Accents" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Warranty Information</label>
                <input name="warranty" value={formData.warranty} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" placeholder="e.g. 5 Years Wood Warranty" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Total Weight (kg)</label>
                <input name="weight" type="number" min="0" value={formData.weight} onChange={handleChange} className="w-full px-4 py-3 bg-surface border border-white/5 rounded-md focus:border-primary focus:outline-none transition-all text-white font-sans text-sm" placeholder="0" />
              </div>
            </div>

            <div className="p-5 bg-surface-high/30 rounded-md border border-white/5 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Physical Dimensions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-secondary">Width</label>
                  <input name="dimensions.width" type="number" value={formData.dimensions.width} onChange={handleChange} placeholder="W" className="w-full px-3 py-2 bg-surface border border-white/5 rounded focus:border-primary focus:outline-none text-white text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-secondary">Height</label>
                  <input name="dimensions.height" type="number" value={formData.dimensions.height} onChange={handleChange} placeholder="H" className="w-full px-3 py-2 bg-surface border border-white/5 rounded focus:border-primary focus:outline-none text-white text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-secondary">Depth</label>
                  <input name="dimensions.depth" type="number" value={formData.dimensions.depth} onChange={handleChange} placeholder="D" className="w-full px-3 py-2 bg-surface border border-white/5 rounded focus:border-primary focus:outline-none text-white text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-secondary">Unit</label>
                  <select name="dimensions.unit" value={formData.dimensions.unit} onChange={handleChange} className="w-full px-3 py-2 bg-surface border border-white/5 rounded focus:border-primary focus:outline-none text-white text-sm appearance-none">
                    <option value="cm" className="bg-surface-high">cm</option>
                    <option value="inch" className="bg-surface-high">inch</option>
                    <option value="feet" className="bg-surface-high">feet</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "media":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="p-5 bg-surface-high/30 rounded-md border border-white/5 space-y-6">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Product Gallery</h4>
                <p className="text-secondary text-xs">Upload high-quality images. The first image will be used as the primary thumbnail.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                {formData.images.map((url: string, i: number) => (
                  <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-surface group border border-white/10 shadow-lg">
                    <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => removeImage(i)} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-all backdrop-blur-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {i === 0 && <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary/80 backdrop-blur-md text-[8px] font-bold uppercase text-white rounded-sm">Primary</span>}
                  </div>
                ))}
                
                <label className="aspect-square rounded-md border-2 border-dashed border-white/10 hover:border-primary flex flex-col items-center justify-center gap-2 cursor-pointer bg-surface/50 hover:bg-surface transition-all duration-300">
                  {uploading ? (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  ) : (
                    <>
                      <div className="p-3 bg-surface-high rounded-full shadow-inner"><Plus className="w-5 h-5 text-primary" /></div>
                      <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">Upload Photo</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                </label>
              </div>
            </div>
          </motion.div>
        );
      case "settings":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="flex justify-between items-center p-5 bg-surface-high/30 rounded-md border border-white/5 shadow-sm hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleChange({ target: { name: 'isFeatured', type: 'checkbox', checked: !formData.isFeatured } })}>
              <div>
                <h4 className="text-sm font-bold text-white">Featured Product</h4>
                <p className="text-xs text-secondary mt-1">Display this piece prominently on the homepage and hero sections.</p>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${formData.isFeatured ? 'bg-primary justify-end' : 'bg-surface-high justify-start border border-white/10'}`}>
                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-5 bg-surface-high/30 rounded-md border border-white/5 shadow-sm hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleChange({ target: { name: 'isNewItem', type: 'checkbox', checked: !formData.isNewItem } })}>
              <div>
                <h4 className="text-sm font-bold text-white">New Arrival</h4>
                <p className="text-xs text-secondary mt-1">Badge this product as newly arrived to attract attention.</p>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${formData.isNewItem ? 'bg-primary justify-end' : 'bg-surface-high justify-start border border-white/10'}`}>
                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-5 bg-surface-high/30 rounded-md border border-white/5 shadow-sm hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleChange({ target: { name: 'isCustom', type: 'checkbox', checked: !formData.isCustom } })}>
              <div>
                <h4 className="text-sm font-bold text-white">Customizable</h4>
                <p className="text-xs text-secondary mt-1">Indicate that this product's dimensions or materials can be altered on request.</p>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex ${formData.isCustom ? 'bg-primary justify-end' : 'bg-surface-high justify-start border border-white/10'}`}>
                <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-surface-low rounded-xl shadow-2xl overflow-hidden border border-white/10 max-w-4xl mx-auto flex flex-col max-h-[90vh]"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-surface-high border-b border-white/5 shrink-0">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white">{initialData ? "Refine Creation" : "Register a Masterpiece"}</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mt-1">Total Instance Product Manager</p>
        </div>
        <button onClick={onCancel} className="p-2 bg-surface hover:bg-red-500/20 text-secondary hover:text-red-400 rounded-full transition-all border border-transparent hover:border-red-500/30">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-surface-high/50 border-r border-white/5 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto shrink-0 scrollbar-hide">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 md:py-6 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap md:whitespace-normal border-b md:border-b-0 md:border-r-2 ${
                  isActive 
                    ? "text-primary border-primary bg-surface/50" 
                    : "text-secondary hover:text-white border-transparent hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-secondary"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-surface-low scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-6 bg-surface-high border-t border-white/5 shrink-0 flex justify-end gap-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-3 bg-surface border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:border-white/30 transition-all"
        >
          Cancel
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); onSave(formData); }}
          disabled={uploading || !formData.name || !formData.category || !formData.price || !formData.description}
          className="px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-primary/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {initialData ? "Commit Changes" : "Forge Product"}
        </button>
      </div>
    </motion.div>
  );
}
