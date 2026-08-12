import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogClient from "./BlogClient";
import connectDB from "@/lib/db";
import { Blog } from "@/lib/models/Blog";

export const revalidate = 60; // Cache for 60 seconds

export default async function BlogPage() {
  await connectDB();

  // Fetch only published blogs, latest first
  const blogsDb = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean() as any[];

  const posts = blogsDb.map((b) => ({
    id: b._id.toString(),
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt || "Click to read more about this topic.",
    date: new Date(b.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }),
    category: b.tags && b.tags.length > 0 ? b.tags[0] : "General",
    image: b.coverImage || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
  }));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BlogClient posts={posts} />
      <Footer />
    </div>
  );
}
