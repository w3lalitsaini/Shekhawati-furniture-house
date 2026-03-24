import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/store/HomePage";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
