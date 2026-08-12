import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Product } from "@/lib/models/Product";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await connectDB();
    const product = await Product.findById(id).lean();
    if (!product) return { title: "Product Not Found" };
    
    return {
      title: `${product.name} | Shekhawati Furniture`,
      description: product.description,
    };
  } catch (error) {
    return { title: "Product Detail" };
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connectDB();
  let productDb: any = null;
  try {
    productDb = await Product.findById(id).populate('category', 'name').lean();
  } catch (err) {
    console.error("Invalid ID format or fetch failed:", err);
  }

  if (!productDb) {
    return notFound();
  }
  
  const product = {
    _id: productDb._id.toString(),
    name: productDb.name,
    price: productDb.price,
    oldPrice: productDb.oldPrice || null,
    description: productDb.description || "",
    images: productDb.images?.length ? productDb.images : ["https://via.placeholder.com/800"],
    category: productDb.category?.name || "Uncategorized",
    stock: productDb.stock || 0,
    sku: productDb.sku || `FC-SKU-${productDb._id.toString().slice(-6).toUpperCase()}`,
    features: productDb.isCustom ? ["Customizable design"] : ["Standard mastercraft", "Stain-Resistant Finish"],
    specifications: productDb.specifications || {}
  };

  return (
    <>
      <Navbar />
      <main className="pt-10 pb-24">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </>
  );
}

