"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, CreditCard, Truck, ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, totalAmount } = useCart();
  const [step, setStep] = useState(1);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-32 pb-24 text-center space-y-8">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-gray-200" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-black">Your bag is empty</h1>
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-all">
            Return to shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">
              <Link href="/cart" className="hover:text-primary transition-colors flex items-center gap-1">
                <ChevronLeft className="w-3 h-3" /> Back to Bag
              </Link>
            </nav>
            <h1 className="font-serif text-4xl font-bold text-black tracking-tight">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
            {/* Left: Forms */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Shipping Info */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="font-serif text-2xl font-bold text-black">Shipping Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">First Name</label>
                    <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Last Name</label>
                    <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Email Address</label>
                    <input type="email" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Shipping Address</label>
                    <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="Street Address, Apartment, etc." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">City</label>
                    <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Postal Code</label>
                    <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium" placeholder="10001" />
                  </div>
                </div>
              </section>

              {/* Shipping Method */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="font-serif text-2xl font-bold text-black">Shipping Method</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="relative flex items-center p-6 border-2 border-primary rounded-sm cursor-pointer bg-primary/[0.02]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">Standard Delivery</span>
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-secondary text-xs mt-1">3 - 5 business days</p>
                    </div>
                    <span className="font-bold text-black font-serif uppercase tracking-widest text-xs">Free</span>
                  </label>
                  
                  <label className="relative flex items-center p-6 border border-gray-100 rounded-sm cursor-pointer hover:border-primary transition-colors">
                    <div className="flex-1">
                      <span className="font-bold text-black">Express Shipping</span>
                      <p className="text-secondary text-xs mt-1">Next day delivery</p>
                    </div>
                    <span className="font-bold text-black font-serif uppercase tracking-widest text-xs">$25.00</span>
                  </label>
                </div>
              </section>

              {/* Payment */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="font-serif text-2xl font-bold text-black">Payment Details</h2>
                </div>
                
                <div className="p-8 border border-gray-100 rounded-sm bg-gray-50 space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 border-2 border-black rounded-sm bg-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Credit Card
                    </button>
                    <button className="px-6 py-3 border border-gray-200 rounded-sm bg-white font-bold text-[10px] uppercase tracking-widest text-secondary hover:border-black hover:text-black transition-all">
                      PayPal
                    </button>
                    <button className="px-6 py-3 border border-gray-200 rounded-sm bg-white font-bold text-[10px] uppercase tracking-widest text-secondary hover:border-black hover:text-black transition-all">
                      Razorpay
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Card Number</label>
                      <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Expiry Date</label>
                      <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">CVC</label>
                      <input type="text" className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-primary transition-colors font-medium bg-transparent" placeholder="123" />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: Summary */}
            <div className="space-y-8 sticky top-28">
              <div className="bg-gray-50 border border-gray-100 rounded-sm p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-black border-b border-gray-200 pb-4 mb-6 uppercase tracking-tight">In Your Bag</h3>
                
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="w-16 h-16 rounded-sm overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <h4 className="text-sm font-bold text-black truncate">{item.name}</h4>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">QTY: {item.quantity}</p>
                        <p className="text-xs font-serif font-bold text-black mt-2">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                    <span>Subtotal</span>
                    <span className="text-black">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                    <span>Estimated Tax</span>
                    <span className="text-black">$0.00</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-gray-200">
                    <span className="font-serif text-xl font-bold text-black uppercase">Total</span>
                    <span className="font-serif text-2xl font-bold text-black">${totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-10">
                  <button className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-3">
                    <Lock className="w-4 h-4" />
                    Place Order
                  </button>
                  <p className="text-[10px] text-center text-secondary font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    Secure encrypted transaction
                  </p>
                </div>
              </div>

              {/* Mini Features */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Truck, text: "Fast Global Delivery" },
                  { icon: CheckCircle2, text: "Authenticity Guaranteed" },
                  { icon: ShieldCheck, text: "5 Year Warranty" }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-sm">
                    <f.icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
