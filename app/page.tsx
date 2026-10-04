import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Library from "@/components/Library";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <Library />
        <Footer/>
      </main>
    </>
  );
}