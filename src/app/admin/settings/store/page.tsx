"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Phone, Mail, MapPin, Search } from "lucide-react";

export default function StoreConfigPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/store-settings")
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
      const res = await fetch("/api/admin/store-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setMessage({ type: "success", text: "Settings updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update settings" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading configuration...</div>;

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary font-bold">Store Configuration</h1>
          <p className="text-secondary text-sm mt-1 uppercase tracking-widest font-bold">Manage global contact info and SEO settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-primary to-accent text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] rounded-md hover:ring-2 hover:ring-accent/50 transition-all disabled:opacity-50 shadow-xl"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md text-sm ${message.type === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <section className="space-y-6 bg-surface-low p-6 rounded-lg border border-white/5">
          <h2 className="text-xl font-serif text-white flex items-center gap-2 font-bold">
            <Phone className="w-5 h-5 text-accent" />
            Contact Info
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-accent">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">Physical Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={3}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">WhatsApp Number</label>
              <input
                type="text"
                value={settings.socialLinks.whatsapp}
                onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, whatsapp: e.target.value } })}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="space-y-6 bg-surface-low p-6 rounded-lg border border-white/5">
          <h2 className="text-xl font-serif text-white flex items-center gap-2 font-bold">
            <Globe className="w-5 h-5 text-accent" />
            SEO & Branding
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">Site Title</label>
              <input
                type="text"
                value={settings.seo.title}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">Meta Description</label>
              <textarea
                value={settings.seo.description}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                rows={4}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-secondary uppercase tracking-widest mb-1.5">Keywords (comma separated)</label>
              <input
                type="text"
                value={settings.seo.keywords.join(", ")}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value.split(",").map(k => k.trim()) } })}
                className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-2 text-white focus:border-accent focus:outline-none text-sm placeholder:text-secondary"
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
