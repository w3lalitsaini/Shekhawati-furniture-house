"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbe2] flex">
      {/* Left: Art panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-gradient-to-br from-[#442a22] to-[#5d4037]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-12 space-y-6">
          <h2 className="font-serif text-5xl text-white leading-tight">Welcome<br />Back</h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto" />
          <p className="font-sans text-[#e7bdb1] text-lg max-w-sm mx-auto">Step into the manor of handcrafted elegance</p>
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
            <p className="font-sans text-sm text-[#5e604d]">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-[#442a22]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#f5f5dc] border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm text-[#1b1d0e] focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-[#827470]"
                  placeholder="••••••••"
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center font-sans text-sm text-[#5e604d]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#735c00] font-semibold hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
