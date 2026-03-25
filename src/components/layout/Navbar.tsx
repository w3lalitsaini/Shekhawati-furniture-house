"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Menu, X, Search, User, LayoutDashboard, LogOut } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const { settings, loading } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Custom Furniture", href: "/custom" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-white/5 ${
        scrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-black py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm transition-transform group-hover:scale-105">
              <span className="text-white font-serif text-2xl font-bold">
                {settings?.seo.title.charAt(0) || "S"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-white tracking-tight leading-none">
                {settings?.seo.title.split(" ").slice(0, 2).join(" ") || "Shekhawati"}
              </span>
              <span className="text-[10px] text-secondary uppercase tracking-[0.2em] mt-0.5">
                {settings?.seo.title.split(" ").slice(2).join(" ") || "Furniture House"}
              </span>
            </div>
          </Link>

          {/* Desktop Links - Centered */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-secondary hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button className="text-secondary hover:text-white transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link href="/wishlist" className="text-secondary hover:text-white transition-colors hidden sm:block">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="relative group text-secondary hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-4">
                {(session.user as any).role === "admin" && (
                  <Link href="/admin/dashboard" className="text-primary hover:text-accent transition-colors">
                    <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-secondary hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-sm hover:bg-accent transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-black border-t border-white/5 py-6 space-y-4 absolute left-0 right-0 top-full px-4 shadow-xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="block text-lg text-secondary hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!session?.user && (
              <Link 
                href="/login" 
                className="block py-3 bg-primary text-white text-center rounded-sm"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
