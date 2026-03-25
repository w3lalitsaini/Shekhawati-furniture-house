import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/store/HomePage";
import { getHomeSettings } from "@/lib/getHomeSettings";

export default async function Home() {
  const homeSettings = await getHomeSettings();
  
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HomePage initialSettings={JSON.parse(JSON.stringify(homeSettings))} />
      </main>
      <Footer />
    </>
  );
}
