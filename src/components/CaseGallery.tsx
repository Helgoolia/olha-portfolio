import type { GalleryGroup } from "@/data/projects";
import { useInView } from "@/hooks/useInView";

/**
 * Phone screens are exported flat (1179×2556, no corners, no shadow).
 * Corners are added here so every case uses the same rounding:
 * 55 px radius on a 393×852 screen → 14% of width / 6.46% of height.
 */
const PHONE_RADIUS = "14% / 6.46%";

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

type Row =
  | { kind: "row"; group: GalleryGroup }
  | { kind: "singles"; groups: GalleryGroup[] };

const toRows = (groups: GalleryGroup[]): Row[] => {
  const rows: Row[] = [];
  for (const g of groups) {
    const last = rows[rows.length - 1];
    if (g.images.length > 1) rows.push({ kind: "row", group: g });
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
        row.kind === "row" ? (
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
