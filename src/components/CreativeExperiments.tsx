import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

const monsters = [
  "/monsters/monster-1.png",
  "/monsters/monster-2.png",
  "/monsters/monster-3.png",
  "/monsters/monster-4.png",
  "/monsters/monster-5.png",
  "/monsters/monster-6.png",
  "/monsters/monster-7.png",
  "/monsters/monster-8.png",
  "/monsters/monster-9.png",
  "/monsters/monster-10.png",
  "/monsters/monster-11.png",
  "/monsters/monster-12.png",
];

const CreativeExperiments = () => {
  const [ref, inView] = useInView(0.1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % monsters.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + monsters.length) % monsters.length);
    }
  };

  return (
    /* ПРАВКА 1: Адаптивні падінги py-16 md:py-32 */
    <section
      className="py-16 md:py-32 px-6"
      style={{ backgroundColor: "#0D0D12" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div
          className={`mb-10 md:mb-16 max-w-3xl ${inView ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
            Creative Experiments
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            My foundation in complex vector illustration heavily influences my
            approach to digital product design. Creating these highly detailed
            characters taught me the importance of pixel-perfect precision,
            visual balance, and intentional color theory.
          </p>
        </div>

        {/* ПРАВКА 2: Горизонтальний скрол на мобільці, сітка на десктопі */}
        <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-3 gap-6 md:gap-10 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
          {monsters.map((src, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={`
                aspect-[4/3] rounded-xl overflow-hidden border border-border/40 bg-[#1A1A1A] group cursor-pointer 
                flex-shrink-0 w-[85vw] sm:w-[45vw] md:w-full snap-center
                ${inView ? "animate-fade-up" : "opacity-0"}
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={src}
                alt={`Creative Illustration ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX залишаємо без змін, він чудовий */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 md:px-10 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <img
              src={monsters[selectedIndex]}
              alt={`Creative Illustration ${selectedIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      )}
    </section>
  );
};

export default CreativeExperiments;
