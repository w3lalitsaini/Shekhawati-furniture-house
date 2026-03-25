"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const e = searchParams.get("email");
    if (e) setEmail(e);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("Password reset successfully! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbe2] flex">
      {/* Left: Art panel */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-gradient-to-br from-[#442a22] to-[#5d4037]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1200&h=900&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="relative z-10 text-center px-12 space-y-6">
          <h2 className="font-serif text-5xl text-white leading-tight">Secure<br />Reset</h2>
          <div className="h-1 w-16 bg-[#D4AF37] mx-auto" />
          <p className="font-sans text-[#e7bdb1] text-lg max-w-sm mx-auto">Locking away the old, unveiling the new</p>
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
            <p className="font-sans text-sm text-[#5e604d]">Verify OTP and set a new password</p>
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
              <label className="font-sans text-sm font-medium text-[#442a22]">Verification OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                className="w-full px-4 py-3 bg-[#f5f5dc] border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm text-[#1b1d0e] tracking-[1em] text-center focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:tracking-normal"
                placeholder="000000"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-sans text-sm font-medium text-[#442a22]">New Password</label>
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

              <div className="space-y-2">
                <label className="font-sans text-sm font-medium text-[#442a22]">Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#f5f5dc] border-b-2 border-[#d4c3be]/30 rounded-t-md font-sans text-sm text-[#1b1d0e] focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-[#827470]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#442a22] to-[#5d4037] text-white font-sans text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Resetting..." : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Reset Password
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fbfbe2] flex items-center justify-center">
        <div className="font-serif text-xl text-[#442a22]">Loading Secure Gate...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
