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

const cardClass =
  "rounded-xl md:rounded-2xl bg-secondary/50 border border-border/40";

/** Several phones in one row, on one background. Scrolls sideways on mobile. */
const PhoneRow = ({ group, title }: { group: GalleryGroup; title: string }) => (
  <div>
    <Caption text={group.caption} />
    <div className={`${cardClass} py-6 md:p-12`}>
      <div className="flex md:justify-center gap-4 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-visible px-6 md:px-0 snap-x snap-mandatory scrollbar-hide">
        {group.images.map((src, i) => (
          <div key={src} className="flex-shrink-0 w-[62vw] sm:w-[40vw] md:w-[30%] md:max-w-[300px] snap-center">
            <Phone src={src} alt={`${title} — ${group.caption ?? "screen"} ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** One phone in its own card. Two singles in a row sit side by side. */
const SingleCard = ({ group, title }: { group: GalleryGroup; title: string }) => (
  <div className="flex flex-col">
    <Caption text={group.caption} />
    <div className={`${cardClass} p-6 md:p-12 flex-grow flex items-center justify-center`}>
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
      <div className={`${cardClass} p-6 md:p-12`} style={{ overflowAnchor: "none" }}>
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
    <div className={`${cardClass} p-6 md:p-12`}>
      <Img src={group.images[0]} alt={`${title} — ${group.caption ?? "section"}`} className={PAGE_RADIUS} />
    </div>
  </div>
);

/** UI states side by side, each as wide as it really is, so they share one scale. */
const StatesRow = ({ group, title }: { group: GalleryGroup; title: string }) => (
  <div>
    <Caption text={group.caption} />
    <div className={`${cardClass} p-6 md:p-12`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        {group.images.map((src, i) => (
          <div key={src} className="min-w-0 md:basis-0" style={{ flexGrow: group.w?.[i] ?? 1 }}>
            <Img src={src} alt={`${title} — ${group.caption ?? "state"} ${i + 1}`} />
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
  | { kind: "singles"; groups: GalleryGroup[] };

const toRows = (groups: GalleryGroup[]): Row[] => {
  const rows: Row[] = [];
  for (const g of groups) {
    const last = rows[rows.length - 1];
    if (g.kind === "page" || g.kind === "wide" || g.kind === "states") rows.push({ kind: g.kind, group: g } as Row);
    else if (g.images.length > 1) rows.push({ kind: "row", group: g });
    else if (last?.kind === "singles" && last.groups.length < 2) last.groups.push(g);
    else rows.push({ kind: "singles", groups: [g] });
  }
  return rows;
};

const CaseGallery = ({
  flow,
  groups,
  title,
}: {
  flow?: string;
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
          <Caption text="User flow" />
          <div className={`${cardClass} p-6 md:p-12`}>
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
        row.kind === "page" ? (
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
