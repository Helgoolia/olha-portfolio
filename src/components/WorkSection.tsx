import { useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useInView } from "@/hooks/useInView";

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView(0.1);

  // Define cover images for each project
  const coverImages: Record<string, string> = {
    "book-and-bite": "/projects/book-and-bite/Book&Bite_Case-Cover.png",
    "lawyer-company": "/projects/LawyerLP/LawyerLP_Cover.png",
    metamorphosis: "/projects/Kafka/Kafka_Cover.png",
    "pure-hair-salon": "/projects/PureHair/PureHair_Cover.png",
  };

  const coverImage = coverImages[project.id];

  return (
    <div
      ref={ref}
      className={`h-full ${inView ? "animate-fade-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="group rounded-xl border border-border bg-[#1A1A1A] overflow-hidden card-hover cursor-pointer h-full flex flex-col"
        onClick={() => navigate(`/project/${project.id}`)}
      >
        {/* Project cover image */}
        {coverImage ? (
          <div className="aspect-video bg-[#1A1A1A] flex items-end justify-center overflow-hidden p-0">
            <img
              src={coverImage}
              alt={`${project.title} cover`}
              className="w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-body">
              Project Image
            </span>
          </div>
        )}
        <div className="p-8 flex flex-col flex-grow">
          <span className="text-xs font-body text-primary tracking-wide uppercase">
            {project.type}
          </span>
          <h3 className="text-2xl font-heading font-bold mt-3 mb-3 text-foreground">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 flex-grow">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium font-body group-hover:gap-2 transition-all duration-200">
            View Case Study
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

const WorkSection = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`mb-16 ${inView ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Selected Work
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
