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
    <div className="min-h-screen bg-surface flex text-on-surface">
      {/* Left: Art panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-linear-to-br from-primary to-primary-container">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-12 space-y-6">
          <h2 className="font-serif text-5xl text-white leading-tight">Welcome<br />Back</h2>
          <div className="h-1 w-16 bg-accent mx-auto" />
          <p className="font-sans text-secondary text-lg max-w-sm mx-auto tracking-wide">Step into the manor of handcrafted elegance</p>
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
            <p className="font-sans text-sm text-secondary">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-primary">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-surface-low border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none transition-colors placeholder:text-secondary"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link href="/forgot-password" title="Forgot Password" className="text-sm text-accent hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-r from-primary to-primary-container text-white font-sans text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center font-sans text-sm text-secondary">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
