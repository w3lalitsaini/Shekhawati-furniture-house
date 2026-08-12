"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";

export default function BlogClient({ posts }: { posts: any[] }) {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-surface py-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Blog & <span className="text-primary">Inspiration</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-lg font-medium uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed"
          >
            Furniture tips, design ideas, and home décor inspiration
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
        {posts?.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <h3 className="font-serif text-3xl font-bold text-black mb-4">No content found</h3>
            <p className="text-gray-500 font-medium">There are currently no blog posts available. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 mb-8 shadow-2xl transition-all duration-700 group-hover:shadow-primary/20">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-secondary overflow-hidden">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-primary" /> {post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                      <Tag className="w-3 h-3" /> {post.category}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-black group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-secondary text-sm leading-relaxed font-medium line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 overflow-hidden">
                    <Link href={`/blog/${post.slug || post.id}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black group-hover:text-primary transition-all group-hover:translate-x-2">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
