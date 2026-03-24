"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbe2] flex">
      {/* Left: Art panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-gradient-to-br from-[#442a22] to-[#5d4037]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-12 space-y-6">
          <h2 className="font-serif text-5xl text-white leading-tight">Join the<br />Heritage</h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto" />
          <p className="font-sans text-[#e7bdb1] text-lg max-w-sm mx-auto">Begin your journey with royal Rajasthani craftsmanship</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left space-y-2">
            <Link href="/" className="inline-block">
              <h1 className="font-serif text-2xl text-[#442a22]">Shekhawati Furniture House</h1>
            </Link>
            <p className="font-sans text-sm text-[#5e604d]">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md font-sans">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-[#442a22]">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#f5f5dc] border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm text-[#1b1d0e] focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-[#827470]"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-[#442a22]">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#f5f5dc] border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm text-[#1b1d0e] focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-[#827470]"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-[#442a22]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-[#f5f5dc] border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm text-[#1b1d0e] focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-[#827470]"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#827470]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#442a22] to-[#5d4037] text-white font-sans text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center font-sans text-sm text-[#5e604d]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#735c00] font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
