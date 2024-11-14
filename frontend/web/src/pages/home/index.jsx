import React from "react";
import HeroSection from "./hero";
import AboutSection from "./about";
import Testimonials from "./testimonials";
import Footer from "../../components/footer";

export default function HomeScreen() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
