import { useInView } from "@/hooks/useInView";

const skills = [
  "UX Research",
  "UI Design",
  "Design Systems",
  "Prototyping",
  "Figma",
  "User Testing",
  "Wireframing",
  "Information Architecture",
  "Mobile Design",
  "SaaS Design",
  "Interaction Design",
  "Visual Design",
];

const AboutSection = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="about" className="py-16 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`grid md:grid-cols-[280px_1fr] gap-16 items-start ${
            inView ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/avatar.png" /* Зміни на .png, якщо твоє фото у форматі PNG */
              alt="Olha - UX/UI Designer"
              className="w-56 h-56 rounded-full object-cover border border-border/40 shadow-xl"
            />
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-[1.7] mb-8">
              <p>
                I'm Olha, a UX/UI designer based in Kyiv, Ukraine. I specialize
                in scalable design systems, complex SaaS interfaces, and
                production-ready UI for web and mobile products.
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
