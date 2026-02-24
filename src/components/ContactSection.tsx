import { useInView } from "@/hooks/useInView";
import { Mail, Linkedin, Globe } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "zadnipr92@gmail.com",
    href: "mailto:zadnipr92@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/helgoolia",
    href: "https://www.linkedin.com/in/helgoolia/",
  },
  {
    icon: Globe,
    label: "Behance",
    value: "behance.net/helgoolia",
    href: "https://www.behance.net/helgoolia",
  },
];

const ContactSection = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="contact" className="py-16 md:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div ref={ref} className={inView ? "animate-fade-up" : "opacity-0"}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-12">
            Open to full-time product design roles at startups and tech
            companies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors duration-200 group"
              >
                <c.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-body text-muted-foreground group-hover:text-foreground transition-colors">
                  {c.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
