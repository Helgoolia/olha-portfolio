import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseGallery from "@/components/CaseGallery";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return null;


  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Кнопка "Назад" */}
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>

        {/* Заголовок та Теги */}
        <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] md:text-xs font-body rounded-full border border-primary/30 text-primary uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* HERO: Behance cover, same as the home card */}
        <div
          ref={heroRef}
          className={`max-w-7xl mx-auto px-6 mb-16 md:mb-24 ${heroInView ? "animate-fade-up" : "opacity-0"}`}
        >
          <img
            src={project.cover}
            alt={`${project.title} cover`}
            className="w-full h-auto aspect-[1920/1500] object-cover rounded-xl md:rounded-2xl border border-border/40"
          />
        </div>

        {/* Секція Проблема / Рішення */}
        <div
          ref={contentRef}
          className={`max-w-7xl mx-auto px-6 mb-16 md:mb-20 ${contentInView ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
                  Problem
                </h3>
                <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div className="col-span-2">
                  <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-2">
                    Scope
                  </h3>
                  <p className="text-muted-foreground font-body text-sm md:text-base">
                    {project.scope}
                  </p>
                </div>
                {project.timeline && (
                  <div>
                    <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-2">
                      Timeline
                    </h3>
                    <p className="text-muted-foreground font-body text-sm md:text-base">
                      {project.timeline}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
                Solution
              </h3>
              <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery: flow, pages, sections, states, phone rows */}
        {project.gallery && <CaseGallery flow={project.flow} flowCaption={project.flowCaption} groups={project.gallery} title={project.title} />}

        {/* СЕКЦІЯ РІШЕНЬ + ФІНАЛЬНІ ОГЛЯДИ */}
        <div
          ref={decisionsRef}
          className={`max-w-7xl mx-auto px-6 mb-20 ${decisionsInView ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            Key Design Decisions
          </h2>
          <div className="space-y-4">
            {project.decisions.map((decision, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 md:p-5 rounded-xl bg-card border border-border"
              >
                <span className="text-primary font-heading font-bold text-sm mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
                  {decision}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* НАВІГАЦІЯ ВНИЗУ */}
        <div className="max-w-7xl mx-auto px-6 pb-20 pt-4 flex justify-between gap-4">
          {prevProject ? (
            <button
              onClick={() => navigate(`/project/${prevProject.id}`)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-primary/50 transition-all font-body text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />{" "}
              <span className="hidden sm:inline">Previous Project</span>
              <span className="sm:hidden">Prev</span>
            </button>
          ) : (
            <div />
          )}
          {nextProject ? (
            <button
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-primary/50 transition-all font-body text-xs md:text-sm text-muted-foreground hover:text-foreground"
            >
              <span className="hidden sm:inline">Next Project</span>
              <span className="sm:hidden">Next</span>{" "}
              <ArrowRight className="w-4 h-4" />
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
