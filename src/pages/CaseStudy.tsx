import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const [heroRef, heroInView] = useInView(0.1);
  const [contentRef, contentInView] = useInView(0.1);
  const [decisionsRef, decisionsInView] = useInView(0.1);
  const [galleryRef, galleryInView] = useInView(0.1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  // Оголошення змінних для ідентифікації проектів
  const isBookAndBite = id === "book-and-bite";
  const isLawyerLP = id === "lawyer-company";
  const isKafka = id === "metamorphosis";
  const isPureHair = id === "pure-hair-salon";

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Кнопка "Назад" */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* 1. HERO СЕКЦІЯ */}
        <div
          ref={heroRef}
          className={`max-w-6xl mx-auto px-6 mb-24 ${heroInView ? "animate-fade-up" : "opacity-0"}`}
        >
          {isBookAndBite && (
            <div className="rounded-2xl bg-secondary/50 p-8 md:p-12">
              <img
                src="/projects/book-and-bite/Book&Bite_User Flow.png"
                alt="Hero"
                className="w-full h-auto"
              />
            </div>
          )}
          {isLawyerLP && (
            <div className="rounded-2xl overflow-hidden border border-border/40">
              <img
                src="/projects/LawyerLP/LawyerLP_Hero-Nav.png"
                alt="Hero"
                className="w-full h-auto"
              />
            </div>
          )}
          {isKafka && (
            <div className="rounded-2xl overflow-hidden border border-border/40">
              <img
                src="/projects/Kafka/Kafka_Hero.png"
                alt="Hero"
                className="w-full h-auto"
              />
            </div>
          )}
          {isPureHair && (
            <div className="rounded-2xl overflow-hidden border border-border/40">
              <img
                src="/projects/PureHair/PureHair_Hero.png"
                alt="Hero"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>

        {/* Заголовок та Теги */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-body rounded-full border border-primary/30 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Проблема / Рішення */}
        <div
          ref={contentRef}
          className={`max-w-6xl mx-auto px-6 mb-20 ${contentInView ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
                Problem
              </h3>
              <p className="text-muted-foreground font-body text-lg leading-[1.6] mb-8">
                {project.problem}
              </p>
              <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
                Role
              </h3>
              <p className="text-muted-foreground font-body text-lg mb-8">
                {project.role}
              </p>
              <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
                Tools
              </h3>
              <p className="text-muted-foreground font-body text-lg">
                {project.tools.join(" · ")}
              </p>
            </div>
            <div>
              <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
                Solution
              </h3>
              <p className="text-muted-foreground font-body text-lg leading-[1.6]">
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* ДИНАМІЧНА ГАЛЕРЕЯ */}
        <div
          ref={galleryRef}
          className={`max-w-6xl mx-auto px-6 mb-20 space-y-12 ${galleryInView ? "animate-fade-up" : "opacity-0"}`}
        >
          {/* LAWYER LP */}
          {isLawyerLP && (
            <>
              <div className="rounded-xl bg-secondary/50 p-12 flex justify-center border border-border/40">
                <img
                  src="/projects/LawyerLP/LawyerLP_Our-Services.png"
                  className="w-full h-auto max-w-4xl shadow-lg rounded-md"
                  alt="Services"
                />
              </div>
              <div className="rounded-xl bg-secondary/50 p-12 flex justify-center border border-border/40">
                <img
                  src="/projects/LawyerLP/LawyerLP_CTA-Steps.png"
                  className="w-full h-auto max-w-4xl shadow-lg rounded-md"
                  alt="CTA Steps"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/LawyerLP/LawyerLP_Hero-Nav-Mobile.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Mobile Hero"
                  />
                </div>
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/LawyerLP/LawyerLP_Experts-Mobile.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Mobile Experts"
                  />
                </div>
              </div>
            </>
          )}

          {/* KAFKA */}
          {isKafka && (
            <>
              <div className="rounded-xl bg-secondary/50 p-12 flex justify-center border border-border/40">
                <img
                  src="/projects/Kafka/Kafka_Illustration-Detail.png"
                  className="w-full h-auto max-w-5xl shadow-xl rounded-md"
                  alt="Detail"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/Kafka/Kafka_Hero-Mobile.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Mobile Hero"
                  />
                </div>
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/Kafka/Kafka_Story-Mobile.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Mobile Story"
                  />
                </div>
              </div>
            </>
          )}

          {/* PURE HAIR */}
          {isPureHair && (
            <>
              <div className="rounded-xl bg-secondary/50 p-12 flex justify-center border border-border/40">
                <img
                  src="/projects/PureHair/PureHair_Services.png"
                  className="w-full h-auto max-w-4xl shadow-lg rounded-md"
                  alt="Services"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/PureHair/PureHair_Services-Mobile.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Mobile Services"
                  />
                </div>
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/PureHair/PureHair_How-It-Works-Mobile.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Mobile How It Works"
                  />
                </div>
              </div>
            </>
          )}

          {/* BOOK & BITE */}
          {isBookAndBite && (
            <>
              {/* Два перші екрани (Home та Restaurant) */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/book-and-bite/Book&Bite_Home.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Home"
                  />
                </div>
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/book-and-bite/Book&Bite_Restaurant-Page.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Restaurant"
                  />
                </div>
              </div>

              {/* 1. Booking Flow: без падінгів (на всю ширину) */}
              <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                <img
                  src="/projects/book-and-bite/Book&Bite_Booking-Flow.png"
                  className="w-full h-auto"
                  alt="Booking Flow"
                />
              </div>

              {/* 2. Layout Selection та Confirmation: два мобільні екрани поруч */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/book-and-bite/Book&Bite_Layout-Selection.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Layout Selection"
                  />
                </div>
                <div className="rounded-xl bg-secondary/50 p-10 flex items-center justify-center border border-border/40">
                  <img
                    src="/projects/book-and-bite/Book&Bite_Confirmation.png"
                    className="w-auto h-auto max-h-[600px] drop-shadow-2xl"
                    alt="Confirmation"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* СЕКЦІЯ РІШЕНЬ (DECISIONS) */}
        <div
          ref={decisionsRef}
          className={`max-w-6xl mx-auto px-6 mb-20 ${decisionsInView ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            Key Design Decisions
          </h2>
          <div className="space-y-4 mb-20">
            {project.decisions.map((decision, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-5 rounded-xl bg-card border border-border"
              >
                <span className="text-primary font-heading font-bold text-sm mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {decision}
                </p>
              </div>
            ))}
          </div>

          {/* ФІНАЛЬНІ ЗОБРАЖЕННЯ (ПІСЛЯ ТЕКСТУ) */}
          <div className="space-y-12">
            {isLawyerLP && (
              <div className="rounded-xl overflow-hidden border border-border/40 animate-fade-up">
                <img
                  src="/projects/LawyerLP/LawyerLP_Components.png"
                  className="w-full h-auto"
                  alt="UI Kit"
                />
              </div>
            )}

            {isKafka && (
              <div className="rounded-xl bg-secondary/50 px-12 py-0 flex justify-center border border-border/40 overflow-hidden animate-fade-up">
                <img
                  src="/projects/Kafka/Kafka_Overview.png"
                  className="w-full h-auto"
                  alt="Overview"
                />
              </div>
            )}

            {isPureHair && (
              <>
                <div className="rounded-xl bg-secondary/50 p-12 flex justify-center border border-border/40 animate-fade-up">
                  <img
                    src="/projects/PureHair/PureHair_CTA-Section.png"
                    className="w-full h-auto max-w-4xl shadow-lg rounded-md"
                    alt="CTA Section"
                  />
                </div>
                <div className="rounded-xl bg-secondary/50 px-0 pt-0 pb-12 flex justify-center border border-border/40 overflow-hidden animate-fade-up">
                  <img
                    src="/projects/PureHair/PureHair_Mobile-Overview.png"
                    className="w-full h-auto"
                    alt="Mobile Overview"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* НАВІГАЦІЯ ВНИЗУ */}
        <div className="max-w-6xl mx-auto px-6 pb-20 border-t border-border pt-10 flex justify-between">
          {prevProject ? (
            <button
              onClick={() => navigate(`/project/${prevProject.id}`)}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border hover:border-primary/50 transition-all font-body text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> {prevProject.title}
            </button>
          ) : (
            <div />
          )}
          {nextProject ? (
            <button
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border hover:border-primary/50 transition-all font-body text-sm text-muted-foreground hover:text-foreground"
            >
              {nextProject.title} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudy;
