import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import CreativeExperiments from "@/components/CreativeExperiments";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <CreativeExperiments />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
