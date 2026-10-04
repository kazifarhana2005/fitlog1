import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Library from "@/components/Library";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <Library />
      </main>
    </>
  );
}