import { useInView } from "@/hooks/useInView";

const Hero = () => {
  const [ref, inView] = useInView(0.1);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-40">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] glow-orb animate-pulse-glow pointer-events-none opacity-50 md:opacity-100" />

      <div
        ref={ref}
        className={`relative z-10 max-w-3xl mx-auto px-6 text-center ${
          inView ? "animate-fade-up" : "opacity-0"
        }`}
      >
        <p className="text-[12px] md:text-sm font-body tracking-[0.2em] uppercase text-primary mb-6 md:mb-8">
          UX/UI Designer
        </p>

        {/* Адаптивний заголовок: менший на мобільних, великий на десктопі */}
        <h1 className="text-[42px] sm:text-[64px] md:text-[96px] font-heading font-bold leading-[1.1] mb-6 md:mb-8">
          Olha
          <br />
          Zadnieprian
        </h1>

        {/* Опис з обмеженою шириною на мобільних для кращих падінгів */}
        <p className="text-base md:text-[20px] text-muted-foreground font-body leading-relaxed max-w-[280px] sm:max-w-xl mx-auto mb-10 md:mb-12">
          I design scalable digital products — SaaS interfaces, design systems,
          and mobile experiences.
        </p>

        <button
          onClick={scrollToWork}
          className="inline-flex items-center gap-2.5 px-8 md:px-10 py-3.5 md:py-4 rounded-full bg-primary text-primary-foreground font-heading font-medium text-sm md:text-base tracking-wide hover:opacity-90 transition-opacity duration-200"
        >
          View My Work
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            className="mt-0.5"
          >
            <path
              d="M8 3v10M8 13l4-4M8 13L4 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
