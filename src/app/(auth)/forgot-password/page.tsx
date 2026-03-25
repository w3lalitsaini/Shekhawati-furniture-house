"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage(data.message);
      // Redirect to reset password page after a short delay
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex text-on-surface">
      {/* Left: Art panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-gradient-to-br from-[#442a22] to-[#5d4037]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=1200&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-12 space-y-6">
          <h2 className="font-serif text-5xl text-white leading-tight">Recover<br />Access</h2>
          <div className="h-1 w-16 bg-accent mx-auto" />
          <p className="font-sans text-secondary text-lg max-w-sm mx-auto tracking-wide">We'll help you find your way back to handcrafted elegance</p>
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
            <p className="font-sans text-sm text-secondary">Enter your email for a reset OTP</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md font-sans">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-md font-sans">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-sm font-medium text-primary">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-low border-b-2 border-white/10 rounded-t-md font-sans text-sm text-white focus:border-accent focus:outline-none transition-colors placeholder:text-secondary"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-r from-primary to-primary-container text-white font-sans text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : (
                <>
                  <Send className="w-4 h-4" />
                  Send OTP
                </>
              )}
            </button>
          </form>

          <p className="text-center font-sans text-sm text-secondary">
            <Link href="/login" className="text-primary hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
