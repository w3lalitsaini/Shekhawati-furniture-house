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
    <div className="min-h-screen bg-surface flex text-on-surface">
      {/* Left: Art panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-linear-to-br from-primary to-primary-container">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-12 space-y-6">
          <h2 className="font-serif text-5xl text-white leading-tight">Join the<br />Heritage</h2>
          <div className="h-1 w-16 bg-accent mx-auto" />
          <p className="font-sans text-secondary text-lg max-w-sm mx-auto tracking-wide">Begin your journey with royal Rajasthani craftsmanship</p>
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
              <h1 className="font-serif text-2xl text-primary">Shekhawati Furniture House</h1>
            </Link>
            <p className="font-sans text-sm text-secondary">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md font-sans">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-primary">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-surface-low border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none transition-colors placeholder:text-secondary"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-primary">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-surface-low border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none transition-colors placeholder:text-secondary"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-primary">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-surface-low border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none transition-colors placeholder:text-secondary"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-r from-primary to-primary-container text-white font-sans text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center font-sans text-sm text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
