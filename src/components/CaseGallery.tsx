import type { GalleryGroup } from "@/data/projects";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Phone screens are exported flat (1179×2556, no corners, no shadow).
 * Corners are added here so every case uses the same rounding:
 * 55 px radius on a 393×852 screen → 14% of width / 6.46% of height.
 */
const PHONE_RADIUS = "14% / 6.46%";

/** Desktop pages and sections: same soft corner as the responsive lineup panels. */
const PAGE_RADIUS = "rounded-md md:rounded-[10px]";

const Phone = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className="block w-full h-auto ring-1 ring-white/10"
    style={{ borderRadius: PHONE_RADIUS }}
  />
);

const Caption = ({ text }: { text?: string }) =>
  text ? (
    <h3 className="text-[11px] font-body uppercase tracking-[0.2em] text-primary mb-4">
      {text}
    </h3>
  ) : null;

/** Same inner padding for every card: 20px on phones, 48px from tablet up. */
const PAD = "p-5 md:p-12";

const cardClass =
  "rounded-xl md:rounded-2xl bg-secondary/50 border border-border/40";

/** Several phones in one row, on one background. Scrolls sideways on mobile. */
const PhoneRow = ({ group, title }: { group: GalleryGroup; title: string }) => {
  // Up to 3 phones share the row; 4–5 get narrower so they still fit on one line on desktop.
  const many = group.images.length > 3;
  return (
    <div>
      <Caption text={group.caption} />
      <div className={`${cardClass} md:p-12`}>
        <div
          className={`flex md:justify-center overflow-x-auto md:overflow-visible p-5 md:p-0 snap-x snap-mandatory scrollbar-hide ${
            many ? "gap-6 md:gap-5 lg:gap-8" : "gap-6 md:gap-12 lg:gap-16"
          }`}
        >
          {group.images.map((src, i) => {
            const label = group.labels?.[i];
            return (
              <div
                key={src}
                className={`flex-shrink-0 snap-center w-[62vw] sm:w-[40vw] ${
                  many ? "md:w-[18%] md:max-w-[210px]" : "md:w-[30%] md:max-w-[300px]"
                }`}
              >
                <Phone src={src} alt={`${title} — ${label?.after ?? group.caption ?? "screen"} ${i + 1}`} />
                {label && (
                  <div className="mt-4 text-center font-body leading-snug">
                    {label.before && (
                      <p className="text-xs text-muted-foreground/70 line-through decoration-muted-foreground/50">
                        {label.before}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-foreground">{label.after}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Swatch = ({ hex }: { hex: string }) => (
  <span
    className="inline-block w-4 h-4 rounded-[4px] flex-shrink-0 ring-1 ring-white/15"
    style={{ backgroundColor: hex }}
  />
);

/** Design tokens as a native table, so it uses the site's own type and surfaces. */
const TokensCard = ({ group }: { group: GalleryGroup }) => {
  const Table = ({ head, rows }: { head: [string, string]; rows: NonNullable<GalleryGroup["tokens"]> }) => (
    <div className="min-w-0">
      <div className="grid grid-cols-[1fr_1fr] gap-4 pb-3 mb-1 border-b border-border/60 text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-body">
        <span>{head[0]}</span>
        <span>{head[1]}</span>
      </div>
      {rows.map((t) => (
        <div key={t.name} className="grid grid-cols-[1fr_1fr] gap-4 py-2.5 border-b border-border/30 text-sm font-body items-center">
          <span className="flex items-center gap-3 text-foreground min-w-0">
            <Swatch hex={t.hex} />
            <span className="truncate">{t.name}</span>
          </span>
          <span className="text-muted-foreground">{t.role}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <Caption text={group.caption} />
      <div className={`${cardClass} ${PAD}`}>
        {group.note && (
          <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed max-w-3xl mb-8">{group.note}</p>
        )}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {group.tokens && <Table head={["Nava token", "shadcn/ui"]} rows={group.tokens} />}
          {group.extraTokens && <Table head={["Product-specific", "Used for"]} rows={group.extraTokens} />}
        </div>
      </div>
    </div>
  );
};

/** One phone in its own card. Two singles in a row sit side by side. */
const SingleCard = ({ group, title }: { group: GalleryGroup; title: string }) => (
  <div className="flex flex-col">
    <Caption text={group.caption} />
    <div className={`${cardClass} ${PAD} flex-grow flex items-center justify-center`}>
      <div className="w-[62vw] sm:w-[40vw] md:w-full md:max-w-[300px]">
        <Phone src={group.images[0]} alt={`${title} — ${group.caption ?? "screen"}`} />
      </div>
    </div>
  </div>
);

const Img = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} loading="lazy" decoding="async" className={`block w-full h-auto ${className}`} />
);

/**
 * One tall page, collapsed to ~1.3 screens with a fade and a toggle.
 * While open, the toggle sticks to the bottom of the screen, so it can be
 * collapsed from anywhere. After collapsing, the view jumps to the end of the
 * collapsed card, so the next section is right there — no scrolling back up.
 */
const PageCard = ({ group, title }: { group: GalleryGroup; title: string }) => {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open) return setOpen(true);
    setOpen(false);
    // Wait two frames so the collapsed layout is in place before measuring.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const bar = barRef.current;
        if (!bar) return;
        const top = bar.getBoundingClientRect().top;
        window.scrollBy({ top: top - window.innerHeight * 0.45, behavior: "instant" as ScrollBehavior });
      }),
    );
  };

  return (
    <div>
      <Caption text={group.caption} />
      <div className={`${cardClass} ${PAD}`} style={{ overflowAnchor: "none" }}>
        {group.preview ? (
          <>
            {/* Collapsed: pre-rendered top of the page with the fade baked in
                (scripts/make_page_preview.py). Kept mounted and eager, so its height
                is known the moment the page collapses. */}
            <div className={`overflow-hidden ${PAGE_RADIUS} ${open ? "hidden" : ""}`}>
              {group.preview.map((src, i) => (
                <img key={src} src={src} alt={i === 0 ? `${title} — ${group.caption ?? "full page"}, top` : ""} decoding="async" className="block w-full h-auto" />
              ))}
            </div>
            {open && <Img src={group.images[0]} alt={`${title} — ${group.caption ?? "full page"}`} className={PAGE_RADIUS} />}
          </>
        ) : (
          <Img src={group.images[0]} alt={`${title} — ${group.caption ?? "full page"}`} className={PAGE_RADIUS} />
        )}
        <div ref={barRef} className={`flex justify-center ${open ? "mt-6 sticky bottom-6 z-10" : "-mt-4"}`}>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            className="px-5 py-2.5 rounded-full border border-border text-sm font-body text-foreground bg-background/90 backdrop-blur hover:bg-secondary transition-colors"
          >
            {open ? "Collapse" : "Show full page"}
          </button>
        </div>
      </div>
    </div>
  );
};

/** One wide image (a section, an inner page, a responsive lineup). */
const WideCard = ({ group, title }: { group: GalleryGroup; title: string }) => (
  <div>
    <Caption text={group.caption} />
    <div className={`${cardClass} ${PAD}`}>
      <Img src={group.images[0]} alt={`${title} — ${group.caption ?? "section"}`} className={group.bare ? "" : PAGE_RADIUS} />
    </div>
  </div>
);

/** UI states side by side, each as wide as it really is, so they share one scale. */
const StatesRow = ({ group, title }: { group: GalleryGroup; title: string }) => (
  <div>
    <Caption text={group.caption} />
    <div className={`${cardClass} ${PAD}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        {group.images.map((src, i) => (
          <div
            key={src}
            className="min-w-0 mx-auto md:mx-0 md:basis-0 w-[var(--mw)] md:w-auto -mt-[var(--tt)] md:mt-0"
            style={{
              flexGrow: group.w?.[i] ?? 1,
              ["--mw" as string]: `${((group.w?.[i] ?? 1) / Math.max(...(group.w ?? [1]))) * 100}%`,
              // Stacked on phones: drop the empty transparent top of bottom-aligned frames.
              ["--tt" as string]: `${((group.trimTop?.[i] ?? 0) / (group.w?.[i] ?? 1)) * 100}%`,
            }}
          >
            <Img src={src} alt={`${title} — ${group.caption ?? "state"} ${i + 1}`} className={group.rounded ? PAGE_RADIUS : ""} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

type Row =
  | { kind: "row"; group: GalleryGroup }
  | { kind: "page"; group: GalleryGroup }
  | { kind: "wide"; group: GalleryGroup }
  | { kind: "states"; group: GalleryGroup }
  | { kind: "tokens"; group: GalleryGroup }
  | { kind: "singles"; groups: GalleryGroup[] };

const toRows = (groups: GalleryGroup[]): Row[] => {
  const rows: Row[] = [];
  for (const g of groups) {
    const last = rows[rows.length - 1];
    if (g.kind === "page" || g.kind === "wide" || g.kind === "states" || g.kind === "tokens") rows.push({ kind: g.kind, group: g } as Row);
    else if (g.images.length > 1) rows.push({ kind: "row", group: g });
    else if (last?.kind === "singles" && last.groups.length < 2) last.groups.push(g);
    else rows.push({ kind: "singles", groups: [g] });
  }
  return rows;
};

const CaseGallery = ({
  flow,
  flowCaption,
  groups,
  title,
}: {
  flow?: string;
  flowCaption?: string;
  groups: GalleryGroup[];
  title: string;
}) => {
  const [ref, inView] = useInView(0.05);

  return (
    <div
      ref={ref}
      className={`max-w-7xl mx-auto px-6 mb-20 space-y-12 md:space-y-16 ${
        inView ? "animate-fade-up" : "opacity-0"
      }`}
    >
      {flow && (
        <div>
          <Caption text={flowCaption ?? "User flow"} />
          <div className={`${cardClass} ${PAD}`}>
            <img
              src={flow}
              alt={`${title} — user flow`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {toRows(groups).map((row, i) =>
        row.kind === "tokens" ? (
          <TokensCard key={i} group={row.group} />
        ) : row.kind === "page" ? (
          <PageCard key={i} group={row.group} title={title} />
        ) : row.kind === "wide" ? (
          <WideCard key={i} group={row.group} title={title} />
        ) : row.kind === "states" ? (
          <StatesRow key={i} group={row.group} title={title} />
        ) : row.kind === "row" ? (
          <PhoneRow key={i} group={row.group} title={title} />
        ) : (
          <div
            key={i}
            className={`grid gap-12 md:gap-8 ${
              row.groups.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 md:[&>*]:col-start-1 md:[&>*]:col-span-2 md:[&>*]:mx-auto md:[&>*]:w-1/2"
            }`}
          >
            {row.groups.map((g) => (
              <SingleCard key={g.images[0]} group={g} title={title} />
            ))}
          </div>
        ),
      )}
    </div>
  );
};

export default CaseGallery;
