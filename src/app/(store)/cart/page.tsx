"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronLeft className="w-3 h-3 rotate-180" />
                <span className="text-black">Shopping Bag</span>
              </nav>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-black tracking-tight">Your Collection</h1>
              <p className="text-secondary text-sm font-medium uppercase tracking-[0.2em]">{items.length} items in your bag</p>
            </div>
          </div>

          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center py-32 space-y-8 bg-gray-50 rounded-sm border border-dashed border-gray-200"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShoppingBag className="w-10 h-10 text-gray-300" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-black">Your bag is empty</h2>
                <p className="text-secondary text-sm">Discover our latest handcrafted arrivals and premium pieces.</p>
              </div>
              <Link href="/products" className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-primary transition-all shadow-xl">
                Start Exploring
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              {/* Product List */}
              <div className="lg:col-span-2 space-y-8">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex flex-col sm:flex-row gap-8 pb-8 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-full sm:w-40 aspect-square rounded-sm overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative">
                        <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-serif text-xl font-bold text-black group-hover:text-primary transition-colors leading-tight">
                              <Link href={`/product/${item.productId}`}>{item.name}</Link>
                            </h3>
                            <button 
                              onClick={() => removeItem(item.productId)}
                              className="text-secondary hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-secondary text-xs font-bold uppercase tracking-widest">Premium Quality Wood</p>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center border border-gray-200 rounded-sm scale-90 -ml-2">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                              className="p-3 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                              className="p-3 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-serif font-bold text-black">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                              ${item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="pt-4">
                  <button 
                    onClick={clearCart}
                    className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-red-500 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Empty entire collection
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="space-y-8 sticky top-28">
                <div className="bg-gray-50 p-10 rounded-sm border border-gray-100 space-y-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-bold text-black border-b border-gray-200 pb-6 uppercase tracking-tight">Summary</h2>
                  
                  <div className="space-y-4 font-medium">
                    <div className="flex justify-between text-sm text-secondary uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-black font-bold">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-secondary uppercase tracking-widest">
                      <span>Shipping</span>
                      <span className="text-green-600 font-bold uppercase">Free</span>
                    </div>
                    <div className="flex justify-between text-sm text-secondary uppercase tracking-widest">
                      <span>Insurrance</span>
                      <span className="text-black font-bold">$0.00</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-200 flex justify-between items-baseline">
                    <span className="font-serif text-2xl font-bold text-black tracking-tight uppercase">Total</span>
                    <span className="font-serif text-3xl font-bold text-black">${totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="space-y-4 pt-10">
                    <Link 
                      href="/checkout" 
                      className="block w-full text-center py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-primary transition-all shadow-xl"
                    >
                      Checkout Now
                    </Link>
                    <p className="text-[10px] text-center text-secondary font-bold uppercase tracking-widest flex items-center justify-center gap-2 px-6">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      Secure payment verified
                    </p>
                  </div>
                </div>

                <div className="p-8 bg-black rounded-sm text-white space-y-4">
                  <h4 className="font-serif text-lg font-bold">Have a promo code?</h4>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="ENTER CODE" 
                      className="bg-white/10 border border-white/5 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-primary transition-colors flex-1 uppercase font-bold tracking-widest"
                    />
                    <button className="px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary hover:text-white transition-all">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
