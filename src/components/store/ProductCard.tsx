"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  material?: string;
  rating?: number;
  isNew?: boolean;
  isCustom?: boolean;
  inStock?: boolean;
  onAddToCart?: () => void;
  onWishlist?: () => void;
}

export default function ProductCard({ 
  id, name, price, image, category, material, rating = 5, 
  isNew, isCustom, inStock = true, onAddToCart, onWishlist 
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-sm overflow-hidden border border-black/5 hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-[#f9f9f9]">
        <Link href={`/product/${id}`}>
          <img
            src={image || "/placeholder-furniture.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-whatsapp text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-lg">
              New
            </span>
          )}
          {isCustom && (
            <span className="bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-lg">
              Custom
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={onWishlist}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-black hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 shadow-lg"
        >
          <Heart className="w-3.5 h-3.5" strokeWidth={2} />
        </button>

        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-black text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-secondary uppercase tracking-widest font-bold">
            {category || "Furniture"}
          </span>
          <Link href={`/product/${id}`}>
            <h3 className="font-serif text-lg font-bold text-black mt-1 hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
          </Link>
          <span className="text-xs text-secondary mt-1">
            {material || "Premium Quality Wood"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < rating ? "fill-primary text-primary" : "text-gray-300"}`} 
            />
          ))}
          <span className="text-[10px] text-secondary ml-1">(25)</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-xl text-black">
            ${price.toLocaleString()}
          </span>
          <button
            onClick={onAddToCart}
            disabled={!inStock}
            className="p-2.5 bg-black text-white rounded-sm hover:bg-primary transition-colors disabled:opacity-50 disabled:hover:bg-black"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
