"use client"
import Hero  from "@/components/Hero";
import ProductServices from "@/components/ProductServices";
import Services from "@/components/Services";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="container mx-auto px-6 py-4">
      <Hero />
      <ProductServices />
      <Services />
      <Projects />
    </main>
  );
}