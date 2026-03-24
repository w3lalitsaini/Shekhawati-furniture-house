import Link from "next/link";
import { Phone, Mail, MapPin, Camera, Globe, MessageCircle, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface text-secondary pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
                <span className="text-white font-serif text-lg font-bold">F</span>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">FurniCraft</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Premium furniture & aluminum work for modern homes. Custom designs, professional installation, and quality craftsmanship.
            </p>
            <div className="flex items-center gap-3">
              {[Camera, Globe, MessageCircle].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/custom" className="hover:text-white transition-colors">Custom Furniture</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Our Products</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Beds & Bedroom</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sofas & Living Room</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dining Tables</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wardrobes</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kitchen Cabinets</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Office Furniture</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Aluminum Doors</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Aluminum Windows</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Glass Partitions</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">W</span>
                <span>WhatsApp Us</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@furnicraft.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>123 Furniture Street, Design District, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-surface-low border border-white/5 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-white rounded-sm hover:bg-accent transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider uppercase">
          <p>© {new Date().getFullYear()} FurniCraft. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p>Premium Furniture & Aluminum Works</p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
      >
        <span className="absolute right-full mr-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us!
        </span>
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
