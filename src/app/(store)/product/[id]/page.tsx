"use client";

import { useState, use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Star, Minus, Plus, ChevronLeft, ShieldCheck, Truck, RefreshCw, Share2 } from "lucide-react";
import Link from "next/link";

const SAMPLE_PRODUCT = {
  _id: "1",
  name: "Modern Velvet Royal Sofa",
  price: 1200,
  oldPrice: 1500,
  description: "Experience the pinnacle of luxury with our Modern Velvet Royal Sofa. Handcrafted with a solid seasoned wood frame and upholstered in premium high-density velvet fabric, this piece combines classical elegance with modern ergonomics.\n\nDesigned for sophisticated living spaces, it features reinforced joints, gold-finished metal legs, and premium pocket springs for unmatched durability and comfort.",
  images: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=80",
    "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=1000&q=80"
  ],
  category: "Living Room",
  material: "Solid Teak Wood, Sapphire Velvet, High-Resilience Foam",
  stock: 8,
  sku: "FC-SFA-001",
  features: ["Ergonomic Support", "Hand-Tufted Finish", "Stain-Resistant Fabric", "5-Year Frame Warranty"]
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = SAMPLE_PRODUCT;
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-10 pb-24">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <span className="text-black">{product.name}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Image Gallery */}
            <div className="space-y-6">
              <motion.div 
                layoutId="main-image"
                className="aspect-square rounded-sm overflow-hidden bg-gray-50 border border-gray-100 relative group"
              >
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`p-3 rounded-full shadow-xl backdrop-blur-md transition-all ${wishlisted ? "bg-primary text-white" : "bg-white/80 text-black hover:bg-white"}`}
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                  </button>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-sm overflow-hidden border-2 transition-all ${selectedImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Premium Collection</p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-black tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                    <span className="text-sm font-bold text-black ml-1">5.0</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">25 Reviews</span>
                  <div className="w-px h-4 bg-gray-200" />
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">SKU: {product.sku}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl font-bold text-black tracking-tight">${product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-xl text-secondary line-through">${product.oldPrice.toLocaleString()}</span>
                )}
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                  In Stock
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-black">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="font-medium">5 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="font-medium">Free Global Care</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span className="font-medium">30 Days Return</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-6 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center border border-gray-200 rounded-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => addItem({ productId: product._id, name: product.name, price: product.price, image: product.images[0] })}
                    className="flex-1 bg-black text-white font-bold py-4 px-8 uppercase tracking-widest text-xs rounded-sm hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add To Collection
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-secondary pt-2">
                  <button className="flex items-center gap-2 hover:text-black transition-colors">
                    <Heart className="w-4 h-4" /> Add to wishlist
                  </button>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <button className="flex items-center gap-2 hover:text-black transition-colors">
                    <Share2 className="w-4 h-4" /> Share product
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info Tabs */}
          <div className="mt-32">
            <div className="flex items-center gap-12 border-b border-gray-100 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {["Description", "Specifications", "Care Instructions", "Reviews (25)"].map((tab, i) => (
                <button 
                  key={tab} 
                  className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${i === 0 ? "text-black border-b-2 border-primary" : "text-secondary hover:text-black"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-8">
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                  <h3 className="font-serif text-2xl font-bold text-black mb-4">A Masterpiece of Craftsmanship</h3>
                  <p>
                    Every Modern Velvet Royal Sofa is a testament to our dedication to quality and design. We start with a kiln-dried hardwood frame, precision-engineered to withstand generations of use. The serpentine springs provide a foundation of enduring support, while the multi-density foam cushions offer a perfect balance of softness and resilience.
                  </p>
                  <p>
                    The upholstery is where the magic truly happens. Our signature velvet is woven with high-refractive fibers that catch the light beautifully, creating a depth of color that simpler fabrics cannot match. It's soft to the touch yet remarkably durable, treated with a subtle stain-repellent finish for practical everyday luxury.
                  </p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-50 border border-gray-100 rounded-sm">
                    <h4 className="font-serif text-lg font-bold text-black mb-4 underline decoration-primary/30 underline-offset-8">Materials</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Frame:</span> <span className="text-black font-medium">Solid Teak</span></li>
                      <li className="flex justify-between"><span>Fabric:</span> <span className="text-black font-medium">Premium Velvet</span></li>
                      <li className="flex justify-between"><span>Filling:</span> <span className="text-black font-medium">High-Resilience Foam</span></li>
                      <li className="flex justify-between"><span>Legs:</span> <span className="text-black font-medium">Gold Finished Metal</span></li>
                    </ul>
                  </div>
                  <div className="p-8 bg-gray-50 border border-gray-100 rounded-sm">
                    <h4 className="font-serif text-lg font-bold text-black mb-4 underline decoration-primary/30 underline-offset-8">Dimensions</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex justify-between"><span>Width:</span> <span className="text-black font-medium">210 cm</span></li>
                      <li className="flex justify-between"><span>Depth:</span> <span className="text-black font-medium">95 cm</span></li>
                      <li className="flex justify-between"><span>Height:</span> <span className="text-black font-medium">85 cm</span></li>
                      <li className="flex justify-between"><span>Weight:</span> <span className="text-black font-medium">58 kg</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-black p-10 rounded-sm text-white space-y-6 shadow-2xl">
                  <h4 className="font-serif text-xl font-bold">Customization Available</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Need this piece in a different size or fabric? We offer full personalization services to ensure your furniture fits your vision perfectly.
                  </p>
                  <Link href="/contact" className="block w-full py-4 border border-white/20 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Request Custom Quote
                  </Link>
                </div>
                
                <div className="p-8 border border-gray-100 rounded-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-black">Verified Authentic</h5>
                    <p className="text-xs text-gray-500">Each piece comes with a certificate of authenticity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
