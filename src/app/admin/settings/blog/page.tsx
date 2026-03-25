"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Search, Loader2, Save, Upload, Calendar } from "lucide-react";

export default function BlogManagerPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingBlog?._id ? "PUT" : "POST";
    const url = editingBlog?._id ? `/api/admin/blogs/${editingBlog._id}` : "/api/admin/blogs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog)
      });

      if (res.ok) {
        setShowForm(false);
        setEditingBlog(null);
        fetchBlogs();
      }
    } catch (error) {
      console.error("Save failed:", error);
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
        setEditingBlog({ ...editingBlog, coverImage: result.secure_url });
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-8 text-white">Loading insights...</div>;

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-primary font-bold">Editorial Manager</h1>
          <p className="text-secondary text-sm mt-1 uppercase tracking-widest font-bold">Share the stories behind your craftsmanship</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setEditingBlog({ title: "", content: "", excerpt: "", tags: [], isPublished: false }); setShowForm(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-accent text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:ring-2 hover:ring-accent/50 transition-all shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Write New Story
          </button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface-low border border-white/5 p-8 rounded-xl space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif text-white font-bold">{editingBlog?._id ? "Edit Story" : "New Story"}</h2>
              <button onClick={() => { setShowForm(false); setEditingBlog(null); }} className="text-secondary hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Story Title</label>
                  <input 
                    type="text" 
                    value={editingBlog?.title} 
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-") })}
                    className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-3 focus:border-accent focus:outline-none font-serif text-xl text-white placeholder:text-secondary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">Content (Markdown supported)</label>
                  <textarea 
                    rows={12}
                    value={editingBlog?.content}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full bg-surface-high border border-white/5 rounded-md px-4 py-3 focus:border-accent focus:outline-none font-sans leading-relaxed text-sm text-white placeholder:text-secondary"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-surface-high p-6 rounded-lg border border-white/5 space-y-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] border-b border-white/5 pb-2">Cover Image</h4>
                  {editingBlog?.coverImage ? (
                    <div className="relative aspect-video rounded overflow-hidden">
                      <img src={editingBlog.coverImage} className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setEditingBlog({ ...editingBlog, coverImage: "" })}
                        className="absolute top-1 right-1 p-1 bg-red-600 rounded-full"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="aspect-video rounded border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                      {uploading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <Upload className="w-6 h-6 text-secondary" />}
                      <span className="text-[8px] font-bold text-secondary uppercase tracking-widest">Upload Header</span>
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  )}
                </div>

                <div className="bg-surface-high p-6 rounded-lg border border-white/5 space-y-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] border-b border-white/5 pb-2">Settings</h4>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingBlog?.isPublished}
                      onChange={(e) => setEditingBlog({ ...editingBlog, isPublished: e.target.checked, publishedAt: e.target.checked ? new Date() : null })}
                      className="w-4 h-4 accent-accent"
                    />
                    <span className="text-sm">Published & Public</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Tags (comma separated)"
                    value={editingBlog?.tags?.join(", ")}
                    onChange={(e) => setEditingBlog({ ...editingBlog, tags: e.target.value.split(",").map(t => t.trim()) })}
                    className="w-full bg-black/20 border border-white/5 rounded px-3 py-2 text-xs text-secondary focus:border-accent outline-none placeholder:text-secondary/50"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-linear-to-r from-primary to-accent text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded hover:ring-2 hover:ring-accent/50 transition-all shadow-xl"
                >
                  Confirm & Save Story
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-surface-low border border-white/5 rounded-xl overflow-hidden group hover:border-accent/30 transition-all">
            <div className="aspect-video relative overflow-hidden bg-black/40">
              <img src={blog.coverImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              {!blog.isPublished && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-accent/80 text-white text-[8px] font-bold uppercase rounded tracking-widest">Draft</div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-white font-serif text-xl line-clamp-1 font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
              <div className="flex items-center justify-between text-[10px] text-secondary font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-accent" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                <span className="text-primary">{blog.author}</span>
              </div>
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button 
                  onClick={() => { setEditingBlog(blog); setShowForm(true); }}
                  className="flex-1 py-2 bg-white/5 hover:bg-primary text-secondary hover:text-white text-[10px] font-bold uppercase border border-white/5 transition-all rounded tracking-widest"
                >
                  Edit
                </button>
                <button className="p-2 border border-white/5 rounded text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
