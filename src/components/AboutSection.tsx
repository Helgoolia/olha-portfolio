import { useInView } from "@/hooks/useInView";

const skills = [
  "Product Design",
  "Design Systems",
  "UI Design",
  "Visual Design",
  "User Flows",
  "Information Architecture",
  "Wireframing",
  "Prototyping",
  "Mobile Design",
  "SaaS Design",
  "Design QA",
  "Figma",
];

const AboutSection = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="about" className="py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-10 md:gap-10 items-center ${
            inView ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* Bio */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-[1.7] mb-8">
              <p>
                I'm Olha, a UX/UI designer based in Kyiv, Ukraine. I design
                mobile and web products end to end, from flows to
                production-ready UI and design systems.
              </p>
              <p>
                Most recently I spent eight months at MW MEDIA Global, a German
                startup, designing two AI SaaS products and their design system
                from scratch. That work is under NDA; happy to walk through it
                in an interview.
              </p>
              <p>
                Before UX, I spent years as a vector illustrator — that craft
                background shapes how I think about visual composition,
                attention to detail, and the emotional tone of every screen.
              </p>
              <p>
                I work closely with PMs and engineers, and I care deeply about
                organized Figma files and handoffs that actually make sense to
                developers.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 text-sm font-body rounded-full border border-primary/30 text-primary bg-primary/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Photo */}
          <div className="flex justify-center order-first md:order-none">
            <img
              src="/avatar.webp" 
              alt="Olha - UX/UI Designer"
              className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover border border-border/40"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
