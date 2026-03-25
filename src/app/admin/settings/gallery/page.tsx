"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Loader2, Image as ImageIcon, X, Save } from "lucide-react";

export default function GalleryManagerPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Gallery fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      
      if (result.secure_url) {
        // Save to gallery database
        const saveRes = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            url: result.secure_url,
            title: file.name.split(".")[0],
            category: "Project" 
          }),
        });
        
        if (saveRes.ok) {
          fetchGallery();
          setMessage({ type: "success", text: "Image added to gallery!" });
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this masterpiece from the gallery?")) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) fetchGallery();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary font-bold">Gallery Manager</h1>
          <p className="text-secondary text-sm mt-1 uppercase tracking-widest font-bold">Showcase your best interior projects and craftsmanship</p>
        </div>
        <label className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-accent text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:ring-2 hover:ring-accent/50 transition-all cursor-pointer shadow-xl">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Upload New Project"}
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
        </label>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md text-sm ${message.type === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <motion.div 
            key={img._id}
            layoutId={img._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-low border border-white/5 hover:border-accent/30 transition-all"
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <h4 className="text-white font-serif text-lg truncate font-bold">{img.title}</h4>
              <p className="text-[10px] text-primary uppercase font-bold tracking-widest mb-4">{img.category}</p>
              <button 
                onClick={() => handleDelete(img._id)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          </motion.div>
        ))}
        
        {images.length === 0 && !loading && (
          <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl text-secondary">
            <ImageIcon className="w-12 h-12 mb-4 opacity-10" />
            <p className="font-serif italic text-lg text-secondary opacity-60">Your gallery is waiting for its first masterpiece</p>
          </div>
        )}
      </div>
    </div>
  );
}
