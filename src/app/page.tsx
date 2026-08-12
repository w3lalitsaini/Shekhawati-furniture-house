import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/store/HomePage";
import { getHomeSettings } from "@/lib/getHomeSettings";
import connectDB from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { Product } from "@/lib/models/Product";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const homeSettings = await getHomeSettings();
  
  await connectDB();
  
  const categoriesDb = await Category.find({}).lean() as any[];
  const featuredProductsDb = await Product.find({ isFeatured: true })
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .limit(4)
    .lean() as any[];

  const categories = categoriesDb.map(cat => ({
     _id: cat._id.toString(),
     name: cat.name,
     image: cat.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400",
     count: 0
  }));

  const featuredProducts = featuredProductsDb.map(p => ({
     id: p._id.toString(),
     name: p.name,
     price: p.price,
     category: p.category?.name || "Uncategorized",
     rating: 5,
     reviews: Math.floor(Math.random() * 50) + 10,
     image: p.images?.[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
     isNew: p.isNewItem || false,
     isCustom: p.isCustom || false
  }));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HomePage 
          initialSettings={JSON.parse(JSON.stringify(homeSettings))} 
          categories={categories}
          featuredProducts={featuredProducts}
        />
      </main>
      <Footer />
    </>
  );
}
