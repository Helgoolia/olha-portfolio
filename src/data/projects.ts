export interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  problem: string;
  role: string;
  tools: string[];
  solution: string;
  decisions: string[];
  /** Behance-style cover, 1920×1500. Used on the home card and as the case hero. */
  cover: string;
  /** Optional user flow / structure diagram, shown before the gallery. */
  flow?: string;
  /** New gallery: each group is one row. 2+ images = phones in one row; 1 image = its own card (consecutive singles sit side by side). */
  gallery?: GalleryGroup[];
}

export interface GalleryGroup {
  caption?: string;
  images: string[];
  /**
   * phones (default) — flat phone screens, rounded in code, rows of up to 3;
   * page — one tall full page, collapsed with "Show full page";
   * wide — one wide image (section, responsive lineup) at full card width;
   * states — cards side by side, each sized by its real width (see `w`).
   */
  kind?: "phones" | "page" | "wide" | "states";
  /** `page` only: collapsed top of the page with the fade baked in. */
  preview?: string[];
  /** Natural widths of `images`, used by `states` to keep one scale. */
  w?: number[];
}

const md = (n: string) => `/projects/MyDaily/${n}.webp`;
const bb = (n: string) => `/projects/book-and-bite/${n}.webp`;
const ph = (n: string) => `/projects/PureHair/${n}.webp`;


export const projects: Project[] = [
  {
    id: "MyDaily",
    title: "My Daily",
    description:
      "A mobile productivity and time tracking app focused on task scheduling and daily activity management.",
    type: "Mobile App · UX/UI Design",
    tags: ["Productivity", "Time Management", "Mobile UX"],
    problem:
      "Many productivity apps feel overloaded with features, complex navigation, or distracting interfaces. Users often struggle to quickly organize tasks, track time, and maintain focus throughout the day without unnecessary friction.",
    role: "Lead UX/UI Designer",
    tools: ["Figma (prototyping)", "Photoshop", "ChatGPT"],
    solution:
      "A minimal and structured productivity app designed around quick task management and lightweight time tracking. The experience focuses on reducing cognitive load through clear hierarchy, simple navigation, and streamlined scheduling interactions.",
    decisions: [
      "Task cards designed with color-coded outlines and lightweight visual hierarchy for quick scanning",
      "Integrated time tracking directly into task flow to reduce context switching between planning and execution",
      "Minimal dark interface with subtle accent colors to support long-term usability and focus",
      "Separated Today and History views to simplify daily task management and improve clarity of past activity records",
    ],
    cover: "/projects/MyDaily/cover.webp",
    flow: md("00-flow"),
    gallery: [
      { caption: "Profile & visit card", images: [md("01-1-phone"), md("01-2-phone"), md("01-3-phone")] },
      { caption: "Tasks & AI subtasks", images: [md("02-1-phone"), md("02-2-phone"), md("02-3-phone")] },
      { caption: "To-Do list", images: [md("03-phone")] },
      { caption: "Task actions", images: [md("04-phone")] },
      { caption: "Completed tasks", images: [md("05-1-phone"), md("05-2-phone"), md("05-3-phone")] },
      { caption: "Time log", images: [md("06-phone")] },
      { caption: "Empty time log", images: [md("07-phone")] },
      { caption: "Activity: today", images: [md("08-1-phone"), md("08-2-phone"), md("08-3-phone")] },
      { caption: "Unassigned time", images: [md("09-phone")] },
      { caption: "Assign to a task", images: [md("10-phone")] },
      { caption: "History & time reassign", images: [md("11-1-phone"), md("11-2-phone"), md("11-3-phone")] },
    ],
  },
  {
    id: "book-and-bite",
    title: "Book & Bite",
    description:
      "A mobile restaurant discovery and table booking app. Full end-to-end UX/UI case study.",
    type: "Mobile App · UX/UI Design",
    tags: ["Mobile", "Food Tech", "Competitive Analysis"],
    problem:
      "Finding and booking a restaurant through existing apps feels fragmented — users switch between review platforms, mapping apps, and booking tools. Book&Bite brings discovery, reviews, and reservations into a single, intuitive mobile flow.",
    role: "Lead UX/UI Designer",
    tools: ["Figma (prototyping)", "Photoshop", "ChatGPT"],
    solution:
      "A streamlined mobile app with a clear three-step booking flow: browse → select → confirm. Key design decisions included a restaurant card system for quick scanning, a persistent bottom navigation, and a streamlined date/time picker that reduces friction in the reservation step.",
    decisions: [
      "Card-based restaurant list with photo, rating, cuisine tags, and budget level — scannable at a glance",
      "Booking flow reduced to 3 core steps: pick restaurant → choose time → confirm",
      "Visual seat selection feature — users can choose specific tables and halls on an interactive layout map",
      "Micro-interactions and animated transitions designed in Figma prototype to guide users through the flow",
    ],
    cover: "/projects/book-and-bite/cover.webp",
    flow: bb("00-flow"),
    gallery: [
      { caption: "Home, location & guests", images: [bb("01-1-phone"), bb("01-2-phone"), bb("01-3-phone")] },
      { caption: "Search", images: [bb("02-phone")] },
      { caption: "Filters", images: [bb("03-phone")] },
      { caption: "Restaurant page", images: [bb("04-1-phone"), bb("04-2-phone"), bb("04-3-phone")] },
      { caption: "Date, time & table on the layout", images: [bb("05-1-phone"), bb("05-2-phone"), bb("05-3-phone")] },
      { caption: "Confirm & track the booking", images: [bb("06-1-phone"), bb("06-2-phone"), bb("06-3-phone")] },
      { caption: "Profile photo", images: [bb("07-phone")] },
      { caption: "Photo access", images: [bb("08-phone")] },
      { caption: "Settings", images: [bb("09-1-phone"), bb("09-2-phone"), bb("09-3-phone")] },
    ],
  },
  {
    id: "lawyer-company",
    title: "Lawyer Company",
    description:
      "A clean, conversion-focused one-page website for a legal services firm.",
    type: "Landing Page · Web UI",
    tags: ["Landing Page", "Minimalist", "CTA"],
    problem:
      "Law firms often rely on dense, text-heavy websites that feel cold and intimidating to potential clients. This project explored how minimalist design and clear information hierarchy can build trust and guide users toward making contact.",
    role: "UI/UX Designer",
    tools: ["Figma", "ChatGPT"],
    solution:
      "A single-page layout with a strong typographic hierarchy, generous whitespace, and a clear primary CTA visible above the fold. The design uses a restrained monochromatic palette to communicate authority, with subtle hover animations on navigation and buttons.",
    decisions: [
      "Monochromatic palette (near-black, white, one gold accent) to project trust and authority",
      "Hero section leads with a single strong headline and one CTA — no distractions",
      "Services section uses icon + title + short paragraph — scannable and professional",
      "Fully adaptive — desktop and mobile layouts both designed and shown",
    ],
    cover: "/projects/LawyerLP/cover.webp",
  },
  {
    id: "metamorphosis",
    title: "Metamorphosis",
    description:
      "Contest platform landing page with original Kafka-inspired illustration and atmospheric visual design.",
    type: "Landing Page · Illustration",
    tags: ["Landing Page", "Illustration", "Literary"],
    problem:
      "Contest platforms often feel generic and utilitarian. Metamorphosis required a landing page that would itself feel like a piece of art — drawing in participants emotionally before they read a word of the copy.",
    role: "Full UX/UI Design + Custom Illustration",
    tools: ["Figma", "Adobe Illustrator", "Photoshop"],
    solution:
      "A dark, atmospheric one-page design featuring original Kafka-inspired vector illustrations created specifically for this project. The illustration and layout work together to create an immersive, editorial feel that stands apart from typical contest sites.",
    decisions: [
      "Custom illustration as the hero — not stock, not photography, but original art tied to the theme",
      "Dark atmospheric palette with textured, literary feel",
      "Information hierarchy that balances emotion (illustration) with function (contest rules, dates, CTA)",
      "Adaptive layout — full desktop and mobile views designed",
    ],
    cover: "/projects/Kafka/cover.webp",
  },
  {
    id: "pure-hair-salon",
    title: "Pure Hair Salon",
    description:
      "A warm, elegant landing page concept for a premium hair care salon.",
    type: "Landing Page · Web UI",
    tags: ["Beauty", "Landing Page", "Lifestyle"],
    problem:
      "Beauty service businesses often have outdated or cluttered websites that don't reflect the quality of their actual service. This concept explored how a minimal, elevated landing page could position a hair salon as a premium, trustworthy brand.",
    role: "Full UX/UI Design",
    tools: ["Figma"],
    solution:
      "A light, soft-toned landing page using natural imagery, generous whitespace, and a warm color palette to evoke cleanliness and care. The layout guides the user naturally from services → how it works → booking CTA.",
    decisions: [
      "Warm, muted palette (cream, nude, soft brown) — approachable and premium without feeling generic",
      "Hero with full-bleed image + minimal text overlay — emotional first impression",
      "Services presented as a clean card grid with icons — scannable and clear",
      "Adaptive layout — both desktop and mobile tested and presented",
    ],
    cover: "/projects/PureHair/cover.webp",
    gallery: [
      { caption: "Full page", kind: "page", images: [ph("00-page")], preview: [ph("00-page-preview-top"), ph("00-page-preview-fade")] },
      { caption: "Hero CTA → call-back form", kind: "wide", images: [ph("01-section")] },
      { caption: "Form states: error · filled · success", kind: "states", images: [ph("02-1-state"), ph("02-2-state"), ph("02-3-state")], w: [942, 942, 942] },
      { caption: "Leave a review → Thank you", kind: "states", images: [ph("03-1-state"), ph("03-2-state")], w: [1800, 708] },
      { caption: "Inner page: Privacy Policy", kind: "wide", images: [ph("04-page")] },
      { caption: "Responsive: 1440 · 1024 · 768 · 393", kind: "wide", images: [ph("05-responsive")] },
      { caption: "Mobile: home, menu & review", images: [ph("06-1-phone"), ph("06-2-phone"), ph("06-3-phone")] },
      { caption: "Mobile: inner page", images: [ph("07-1-phone"), ph("07-2-phone")] },
    ],
  },
];
