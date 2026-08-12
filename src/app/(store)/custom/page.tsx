"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ChevronDown, Ruler, Box, Sparkles, MessageSquare, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CustomFurniturePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", phone: "", email: "",
    productType: "", roomType: "", material: "", finish: "",
    dimensions: { length: "", width: "", height: "", depth: "", unit: "inch" },
    details: "", budget: "", timeline: "",
    referenceLinks: [""],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof typeof prev] as object, [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/custom-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) setSuccess(true);
      else throw new Error("Submission failed. Please try again.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-xl p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-4xl text-white font-bold mb-4 italic">Design Request Received</h2>
          <p className="text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-8">Reference ID: SF-{Math.floor(Math.random() * 90000 + 10000)}</p>
          <p className="text-gray-300 text-lg font-light italic mb-10 leading-relaxed">
            "Your vision is now in the hands of our master craftsmen. Expect a personal call from our head designer within 24 hours to begin the digital blueprint process."
          </p>
          <button onClick={() => setSuccess(false)} className="px-12 py-5 bg-primary text-white font-sans text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white hover:text-black transition-all shadow-2xl">
            View Collection
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pb-32 bg-[url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1920')] bg-fixed bg-cover">
        <div className="absolute inset-0 bg-black/95 z-0" />
        
        {/* Hero Section */}
        <section className="relative z-10 pt-20 pb-10 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-primary text-[10px] font-bold uppercase tracking-[0.5em]">The Atelier Experience</h2>
              <h1 className="font-serif text-5xl md:text-8xl font-bold text-white tracking-tight italic">
                Bespoke <span className="text-primary">Elegance</span>
              </h1>
              <p className="text-secondary text-sm font-bold uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                Step into the realm of custom craftsmanship. Where every fiber, grain, and angle is defined by you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Step Indicator */}
        <div className="relative z-10 max-w-lg mx-auto mb-16 px-4">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
            {[1, 2, 3].map(num => (
              <div key={num} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= num ? 'bg-primary border-primary border-shadow-glow' : 'bg-black border-white/20'}`}>
                <span className={`text-[10px] font-bold ${step >= num ? 'text-white' : 'text-secondary'}`}>{num}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <section className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-3xl rounded-2xl shadow-edge-glow p-8 md:p-16 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-12">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1" 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="p-3 bg-primary/10 rounded-sm">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-white font-bold tracking-tight">Personal Details</h3>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">How should we address our client?</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4 group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2 group-focus-within:text-primary transition-colors">
                          Full Name <span className="text-primary">*</span>
                        </label>
                        <input 
                          type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white text-lg placeholder:text-white/5" 
                          placeholder="Your identity..." 
                        />
                      </div>
                      <div className="space-y-4 group">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2 group-focus-within:text-primary transition-colors">
                          Phone Number <span className="text-primary">*</span>
                        </label>
                        <input 
                          type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white text-lg placeholder:text-white/5" 
                          placeholder="+91..." 
                        />
                      </div>
                      <div className="space-y-4 group md:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2 group-focus-within:text-primary transition-colors">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input 
                          type="email" name="email" required value={formData.email} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white text-lg placeholder:text-white/5" 
                          placeholder="professional@mail.com" 
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-8">
                      <button type="button" onClick={nextStep} className="flex items-center gap-4 px-12 py-5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white hover:text-black transition-all shadow-2xl">
                        Next Chapter <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2" 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="p-3 bg-primary/10 rounded-sm">
                        <Box className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-white font-bold tracking-tight">Dimensions & Room</h3>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Precision defines perfection</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Room Influence</label>
                        <select 
                          name="roomType" value={formData.roomType} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white appearance-none"
                        >
                          <option value="" className="bg-black">Select room</option>
                          <option value="living" className="bg-black">Living Room / Lounge</option>
                          <option value="bedroom" className="bg-black">Master Suite / Bedroom</option>
                          <option value="dining" className="bg-black">Grand Dining Area</option>
                          <option value="kitchen" className="bg-black">Culinary Space / Kitchen</option>
                          <option value="office" className="bg-black">Executive Office / Library</option>
                          <option value="outdoor" className="bg-black">Patio / Veranda</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Product Archetype</label>
                        <select 
                          name="productType" value={formData.productType} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white appearance-none"
                        >
                          <option value="" className="bg-black">Select piece</option>
                          <option value="sofa" className="bg-black">Sofa & Seating</option>
                          <option value="bed" className="bg-black">Premium Bedstead</option>
                          <option value="dining" className="bg-black">Bespoke Dining Table</option>
                          <option value="wardrobe" className="bg-black">Artisan Wardrobe</option>
                          <option value="cabinet" className="bg-black">Luxury Cabinetry</option>
                          <option value="aluminum" className="bg-black">Heritage Aluminum Work</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                           Detailed Blueprint Dimensions
                        </label>
                        <div className="flex bg-white/5 rounded-sm p-1">
                          {["inch", "cm"].map(u => (
                            <button 
                              key={u} type="button" 
                              onClick={() => setFormData(p => ({ ...p, dimensions: { ...p.dimensions, unit: u as "cm" | "inch" } }))}
                              className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-sm transition-all ${formData.dimensions.unit === u ? 'bg-primary text-white' : 'text-secondary hover:text-white'}`}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["length", "width", "height", "depth"].map(dim => (
                          <div key={dim} className="space-y-2">
                            <input 
                              type="number" 
                              placeholder={dim.toUpperCase()}
                              name={`dimensions.${dim}`}
                              value={formData.dimensions[dim as keyof typeof formData.dimensions]}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-white/5 rounded-sm py-4 text-center text-white font-bold focus:ring-1 focus:ring-primary outline-none transition-all" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-8">
                       <button type="button" onClick={prevStep} className="flex items-center gap-4 px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                      </button>
                      <button type="button" onClick={nextStep} className="flex items-center gap-4 px-12 py-5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white hover:text-black transition-all shadow-2xl">
                        Continue Creation <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3" 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                      <div className="p-3 bg-primary/10 rounded-sm">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-white font-bold tracking-tight">Material & Details</h3>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest">Finalizing the blueprint</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Material Preference</label>
                        <select 
                          name="material" value={formData.material} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white appearance-none"
                        >
                          <option value="" className="bg-black">Consult with master</option>
                          <option value="teak" className="bg-black">Premium Burma Teak Wood</option>
                          <option value="sheesham" className="bg-black">Hand-Picked Sheesham Wood</option>
                          <option value="mango" className="bg-black">Textured Mango Wood</option>
                          <option value="aluminum" className="bg-black">Architectural Aluminum</option>
                          <option value="mix" className="bg-black">Wood & Metal Hybrid</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Finish Selection</label>
                        <select 
                          name="finish" value={formData.finish} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white appearance-none"
                        >
                          <option value="" className="bg-black">Select finish</option>
                          <option value="natural" className="bg-black">Natural Lustre Oil</option>
                          <option value="honey" className="bg-black">Warm Honey Polish</option>
                          <option value="walnut" className="bg-black">Deep Walnut Gloss</option>
                          <option value="matte" className="bg-black">Sophisticated Matte Ebony</option>
                          <option value="powder" className="bg-black">Powder Coated (Metal/Alu)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Investment Range</label>
                        <select 
                          name="budget" value={formData.budget} onChange={handleChange}
                          className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white appearance-none"
                        >
                          <option value="" className="bg-black">Let's discuss</option>
                          <option value="under 50k" className="bg-black">Under ₹50,000</option>
                          <option value="50k-1.5l" className="bg-black">₹50,000 - ₹1.5 Lakh</option>
                          <option value="1.5l-3l" className="bg-black">₹1.5 Lakh - ₹3 Lakh</option>
                          <option value="above 3l" className="bg-black">Above ₹3 Lakh (Masterpiece)</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary text-primary">Target Delivery</label>
                        <div className="relative">
                          <Clock className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                          <select 
                            name="timeline" value={formData.timeline} onChange={handleChange}
                            className="w-full border-b border-white/10 py-4 outline-none focus:border-primary transition-all font-medium bg-transparent text-white appearance-none"
                          >
                            <option value="immediate" className="bg-black">As soon as possible (Rushed)</option>
                            <option value="1 month" className="bg-black">Within 30 Days</option>
                            <option value="2-3 months" className="bg-black">2-3 Months (Standard Crafting)</option>
                            <option value="ongoing" className="bg-black">Ongoing Project / Flexible</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Describe Your Dream Piece</label>
                      <textarea 
                        name="details" required rows={6} value={formData.details} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-6 outline-none focus:border-primary transition-all font-medium text-white placeholder:text-white/10 text-lg leading-relaxed"
                        placeholder="Detail every curve, every texture, every desire..."
                      ></textarea>
                    </div>

                    <div className="flex justify-between pt-8">
                       <button type="button" onClick={prevStep} className="flex items-center gap-4 px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                      </button>
                      <button type="submit" disabled={loading} className="flex items-center gap-4 px-16 py-6 bg-primary text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-white hover:text-black transition-all shadow-[0_20px_50px_rgba(255,191,0,0.3)] disabled:opacity-50">
                        {loading ? 'Transmitting blueprint...' : 'Request Craftsmanship'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </section>

        {/* Brand Promise */}
        <section className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-16">
            {[
              { icon: Ruler, title: "Precision Mapping", desc: "Our designers use high-fidelity 3D software to map every millimeter of your vision before the first chisel hits the wood." },
              { icon: Sparkles, title: "Artisan Selection", desc: "Only the top 5% of timber in the Thar region makes the cut for our bespoke furniture line." },
              { icon: MessageSquare, title: "Direct Link", desc: "Get bi-weekly video updates directly from our workshop, see your piece come to life layer by layer." }
            ].map((prop, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center space-y-6 lg:p-10 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <prop.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-serif text-2xl text-white font-bold tracking-tight italic">{prop.title}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
