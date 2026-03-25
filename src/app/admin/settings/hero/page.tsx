"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Image as ImageIcon, Type, Plus, X, Loader2, Link as LinkIcon, Sparkles } from "lucide-react";

export default function HeroManagerPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/home-settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/home-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setMessage({ type: "success", text: "Hero section updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update hero settings" });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (result.secure_url) {
        setSettings({
          ...settings,
          hero: { ...settings.hero, images: [...settings.hero.images, result.secure_url] }
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-primary">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary font-bold">Hero Manager</h1>
          <p className="text-secondary text-sm mt-1 uppercase tracking-widest font-bold">Design the first impression of Shekhawati Furniture House</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-linear-to-r from-primary to-accent text-white font-sans text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:ring-2 hover:ring-accent/50 transition-all shadow-xl disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Deploying..." : "Update Hero"}
        </button>
      </div>

      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-md text-xs font-bold uppercase tracking-widest ${message.type === "success" ? "bg-green-900/20 text-green-400 border border-green-500/20" : "bg-red-900/20 text-red-400 border border-red-500/20"}`}
        >
          {message.text}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Content */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-low border border-white/5 p-6 rounded-xl space-y-6">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-accent" /> Background Showcase
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence>
                {settings.hero.images.map((img: string, i: number) => (
                  <motion.div 
                    key={i} 
                    layout 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-lg overflow-hidden group border border-white/5"
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => {
                        const newImgs = settings.hero.images.filter((_: string, idx: number) => idx !== i);
                        setSettings({ ...settings, hero: { ...settings.hero, images: newImgs }});
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-600/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <label className="aspect-square rounded-lg border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 transition-colors">
                {uploading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <Plus className="w-6 h-6 text-secondary" />}
                <span className="text-[8px] font-bold text-secondary uppercase tracking-widest">Add Media</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
              </label>
            </div>
            <p className="text-[10px] text-secondary italic leading-relaxed">Images will be used for floating animations and background layers on the home page.</p>
          </div>
        </div>

        {/* Textual Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-low border border-white/5 p-8 rounded-xl space-y-8">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-2">
              <Type className="w-3 h-3 text-accent" /> Editorial Content
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Hero Headline</label>
                <input 
                  type="text" 
                  value={settings.hero.title} 
                  onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value }})}
                  className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-4 text-white focus:border-accent focus:outline-none font-serif text-2xl placeholder:text-secondary"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Sub-Headline</label>
                <input 
                  type="text" 
                  value={settings.hero.subtitle} 
                  onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value }})}
                  className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-3 text-white focus:border-accent focus:outline-none font-sans text-sm placeholder:text-secondary"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Brand Story / Description</label>
                <textarea 
                  rows={4}
                  value={settings.hero.description} 
                  onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, description: e.target.value }})}
                  className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-3 text-white focus:border-accent focus:outline-none font-sans text-sm leading-relaxed placeholder:text-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Primary CTA</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    value={settings.hero.primaryBtnText} 
                    onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, primaryBtnText: e.target.value }})}
                    className="w-full bg-black/50 border border-white/10 rounded-md pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none text-xs font-bold uppercase tracking-widest"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Secondary CTA</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    value={settings.hero.secondaryBtnText} 
                    onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, secondaryBtnText: e.target.value }})}
                    className="w-full bg-black/50 border border-white/10 rounded-md pl-10 pr-4 py-3 text-white focus:border-primary focus:outline-none text-xs font-bold uppercase tracking-widest"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
