import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  GitPullRequest,
  Lightbulb,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

/**
 * Tool logos. Put the official monochrome SVGs into /public/logos/
 * (from the Figma and Anthropic brand pages) and set the paths here.
 * While a path is empty, the chip shows a neutral dot instead.
 */
const toolLogos: Record<string, string> = {
  Claude: "",
  Figma: "",
};

type Tool = { name: string; icon?: LucideIcon };

type ProjectTag = {
  name: string;
  meta: string;
  /** Route of the case on this site; no link when the case isn't public. */
  to?: string;
};

type Item = { tag?: ProjectTag; text: string };

type Card = { title: string; tools: Tool[]; items: Item[] };

const steps: { icon: LucideIcon; label: string }[] = [
  { icon: Lightbulb, label: "I define the problem" },
  { icon: Sparkles, label: "AI drafts and builds" },
  { icon: CircleCheck, label: "I review and approve" },
];

const cards: Card[] = [
  {
    title: "Flows and content",
    tools: [{ name: "Claude" }],
    items: [
      {
        tag: { name: "Nava", meta: "mobile app", to: "/project/nava" },
        text: "User flows, UI copy, component structure and visual exploration.",
      },
      {
        tag: { name: "MW MEDIA", meta: "AI SaaS · NDA" },
        text: "UI copy and realistic job-ad images for mockups and prototypes.",
      },
    ],
  },
  {
    title: "Design production",
    tools: [{ name: "Claude" }, { name: "Figma" }],
    items: [
      {
        tag: { name: "Nava", meta: "mobile app", to: "/project/nava" },
        text: "Portfolio version: with Claude connected to Figma, I translated the interface and renamed and restructured components and layouts.",
      },
    ],
  },
  {
    title: "AI as the production team",
    tools: [{ name: "Claude" }, { name: "Figma" }],
    items: [
      {
        tag: { name: "My Daily", meta: "web app · in progress" },
        text: "Claude builds frames, components, tokens and prototypes in Figma. I own the scope, layout, themes and typography, and review every step.",
      },
    ],
  },
  {
    title: "Building, not just designing",
    tools: [{ name: "Claude" }, { name: "GitHub → Vercel", icon: GitPullRequest }],
    items: [
      {
        text: "This site: Claude prepares changes as pull requests on GitHub, I review and merge, and Vercel deploys. The rebrand and case updates shipped this way.",
      },
    ],
  },
];

const ToolChip = ({ tool }: { tool: Tool }) => {
  const logo = toolLogos[tool.name];
  const Icon = tool.icon;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-body text-muted-foreground">
      {Icon ? (
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      ) : logo ? (
        <img src={logo} alt="" className="h-3.5 w-3.5 opacity-60" />
      ) : (
        <span className="h-2 w-2 rounded-full bg-muted-foreground/50" aria-hidden="true" />
      )}
      {tool.name}
    </span>
  );
};

const Tag = ({ tag }: { tag: ProjectTag }) => {
  const content = (
    <>
      <span>{tag.name}</span>
      <span className="text-muted-foreground">· {tag.meta}</span>
      {tag.to && <ArrowUpRight className="h-3 w-3" aria-hidden="true" />}
    </>
  );
  const base =
    "inline-flex items-center gap-1.5 self-start rounded-md border px-2 py-0.5 text-xs font-body";
  return tag.to ? (
    <Link
      to={tag.to}
      className={`${base} border-primary/35 bg-primary/5 text-primary transition-colors hover:bg-primary/10`}
    >
      {content}
    </Link>
  ) : (
    <span className={`${base} border-border text-foreground/80`}>{content}</span>
  );
};

const AiWorkflowSection = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="ai-workflow" className="py-16 md:py-24 px-6">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto ${inView ? "animate-fade-up" : "opacity-0"}`}
      >
        <h2 className="text-2xl md:text-4xl font-heading font-bold mb-3">
          How I work with AI
        </h2>
        <p className="text-muted-foreground font-body leading-[1.7] mb-8 md:mb-10 max-w-2xl">
          AI is part of every stage of my process. I make the decisions — AI
          speeds up the execution.
        </p>

        {/* Process strip */}
        <ol className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 md:mb-10">
          {steps.map(({ icon: Icon, label }, i) => (
            <li key={label} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:flex-1">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-border px-4 py-3">
                <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm font-body text-foreground">{label}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="hidden sm:block h-4 w-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-[#1A1A1A] p-5 md:p-7"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {card.tools.map((tool) => (
                  <ToolChip key={tool.name} tool={tool} />
                ))}
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold mb-4 text-foreground">
                {card.title}
              </h3>
              <div className="space-y-4">
                {card.items.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    {item.tag && <Tag tag={item.tag} />}
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiWorkflowSection;
