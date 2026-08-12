import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryClient from "./GalleryClient";
import connectDB from "@/lib/db";
import { Gallery } from "@/lib/models/Gallery";

export const revalidate = 60; // Cache for 60 seconds

export default async function GalleryPage() {
  await connectDB();
  const galleryDb = await Gallery.find({}).sort({ createdAt: -1 }).lean() as any[];

  const projects = galleryDb.map((p) => ({
    id: p._id.toString(),
    title: p.title,
    category: p.category || "Project",
    image: p.url || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
  }));

  // Automatically extract unique categories plus "All"
  const categoriesDb = Array.from(new Set(projects.map(p => p.category)));
  const categories = ["All", ...categoriesDb].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <GalleryClient projects={projects} categories={categories} />
      <Footer />
    </div>
  );
}
