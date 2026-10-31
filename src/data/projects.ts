export interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  problem: string;
  /** What I did on the project (shown as "Scope"). */
  scope: string;
  /** Year and duration, e.g. "2026 · 17 weeks". */
  timeline?: string;
  solution: string;
  decisions: string[];
  /** Behance-style cover, 1920×1500. Used on the home card and as the case hero. */
  cover: string;
  /** Optional user flow / structure diagram, shown before the gallery. */
  flow?: string;
  /** Caption above the flow. Default: "User flow". */
  flowCaption?: string;
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
  /** `states` only: round the corners (for section-sized states, not popups with their own shape). */
  rounded?: boolean;
}

const md = (n: string) => `/projects/MyDaily/${n}.webp`;
const bb = (n: string) => `/projects/book-and-bite/${n}.webp`;
const ph = (n: string) => `/projects/PureHair/${n}.webp`;
const lg = (n: string) => `/projects/LawyerLP/${n}.webp`;
const kf = (n: string) => `/projects/Kafka/${n}.webp`;
const nv = (n: string) => `/projects/Nava/${n}.webp`;


export const projects: Project[] = [
  {
    id: "nava",
    title: "Nava",
    description:
      "A gamified walking app: a daily walk with audio practices, energy, and personal and city ratings on one shared map.",
    type: "Mobile App · Commercial",
    tags: ["Health & Fitness", "Gamification", "Community"],
    problem:
      "The walking community ran its daily practice across five tools: a Telegram channel for news, a Telegram chat per city, a Telegram bot for audio, any step tracker plus a screenshot sent to a curator, and a Google Sheet where admins tallied the rating. Progress was hard to see, the rules (7 km at 5 km/h, a monthly 9-day quest) were easy to break without noticing, and a city's shared progress lived only in chat posts.",
    scope: "Audit of the existing journey, UX flows, UI, design system",
    timeline: "2026 · 17 weeks (3 UX + 14 UI)",
    solution:
      "One app built around a daily core loop: start a walk, listen, keep the pace, earn energy, grow. Each old tool found a place inside it: distance and pace are counted automatically, the player runs inside the walk, the quest calendar replaces the channel, the rating is calculated on the server, and the city chat and feed sit one tab away. Personal energy lights up the city on a shared planet map, so every walk counts twice: for the walker and for their city.",
    decisions: [
      "One core loop for free walks and quests — users learn the rules once",
      "Every quest day has an explicit state (in progress, at risk, out, saved by subscription), with a warning before progress is lost",
      "Energy is shown wherever it is earned: after a walk, on Home and in achievements",
      "City and planet views connect personal progress to a shared goal",
      "Edge cases designed up front: no internet, location off, deleted accounts",
    ],
    cover: "/projects/Nava/cover.webp",
    flow: nv("00-flow"),
    flowCaption: "Core loop",
    gallery: [
      { caption: "Onboarding", images: [nv("01-1-phone"), nv("01-2-phone"), nv("01-3-phone")] },
      { caption: "Home → walk", images: [nv("02-1-phone"), nv("02-2-phone"), nv("02-3-phone")] },
      { caption: "Audio practices", images: [nv("03-1-phone"), nv("03-2-phone")] },
      { caption: "Rewards & energy", images: [nv("04-1-phone"), nv("04-2-phone"), nv("04-3-phone")] },
      { caption: "9-day quest: calendar, at risk, out", images: [nv("05-1-phone"), nv("05-2-phone"), nv("05-3-phone")] },
      { caption: "My city, planet & city ranking", images: [nv("06-1-phone"), nv("06-2-phone"), nv("06-3-phone")] },
      { caption: "Community: feed, city chat, profile", images: [nv("07-1-phone"), nv("07-2-phone"), nv("07-3-phone")] },
      { caption: "Edge cases", images: [nv("08-1-phone"), nv("08-2-phone"), nv("08-3-phone")] },
    ],
  },
  {
    id: "MyDaily",
    title: "My Daily",
    description: "A time-tracking app where tasks and time live together: plan, start a timer, see where the day went.",
    type: "Mobile App · Concept",
    tags: ["Productivity", "Time Tracking", "AI"],
    problem: "Most productivity apps split planning and time tracking into separate tools, so tasks drift away from reality and logging time feels like a chore.",
    scope: "UX, UI, design system, redesign after interview feedback",
    solution: "Tasks and time in one flow. Start a timer right from a task, let AI break a big task into subtasks, and review the day in Activity, including unassigned time that can be attached to a task later.",
    decisions: [
      "The timer starts from the task row, with no switching between planning and tracking",
      "AI suggests subtasks for big tasks; the user keeps or edits them",
      "Unassigned time isn't lost: it can be assigned later, and History allows reassigning",
      "Today and History are separate: today stays focused, the past stays easy to review",
      "Six colour modes in the design system, one per task type (Focus, Urgent, Routine…)",
      "Sharing built in: a visit card from the profile (PDF) and logs of completed tasks",
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
    description: "Restaurant discovery and table booking in one flow, down to choosing a table on the hall map.",
    type: "Mobile App · Concept",
    tags: ["Food & Dining", "Booking", "Competitor Analysis"],
    problem: "Finding a place and booking a table usually means switching between rating sites, maps and phone calls. Book&Bite brings discovery and reservations into one mobile flow.",
    scope: "Competitor analysis, IA, UX, UI, design system, prototype",
    timeline: "8 weeks",
    solution: "Search with filters, a restaurant page with everything needed to decide, then booking in two steps: date, time and guests → a table on an interactive hall layout → summary. Reservations live in My Places, where they can be tracked or cancelled.",
    decisions: [
      "Location, date, time and guests are set once on Home and carried through search",
      "Filters for cuisine, bill, distance, kids' menu and vegan options, shown as chips on the list",
      "A table is chosen on an interactive hall layout: halls, VIP rooms, terrace",
      "An editable summary before confirming the booking",
      "After booking: a Pending status and Cancel right in My Places",
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
    title: "Legal Co.",
    description: "A law firm landing page with two always-visible ways to reach a lawyer and a step-by-step consultation booking.",
    type: "Landing Page · Concept",
    tags: ["Legal Services", "Consultation Booking", "Responsive"],
    problem: "Law firm websites are often dense and text-heavy, which feels cold to someone who already has a problem. The task was to build trust quickly and make it easy to get in touch.",
    scope: "UX, UI, UI kit, desktop and mobile",
    solution: "A strict, square layout in navy and orange. Trust signals come first: results, experts, client stories. Practice areas sit in an accordion with a four-step process. Floating buttons let you write or order a call from any point. A free consultation is booked in a short three-step form on its own page.",
    decisions: [
      "Navy with one orange accent and sharp corners throughout: serious, not cold",
      "Floating write/call buttons with short forms and clear confirmations",
      "Practice areas as an accordion with a numbered four-step process",
      "Consultation booked in three steps on a separate page, with progress shown",
      "On mobile, content is stacked and the floating buttons stay in reach",
    ],
    cover: "/projects/LawyerLP/cover.webp",
    gallery: [
      { caption: "Full page", kind: "page", images: [lg("00-page")], preview: [lg("00-page-preview-top"), lg("00-page-preview-fade")] },
      { caption: "Menu overlay", kind: "wide", images: [lg("03-section")] },
      { caption: "Floating CTA: write to us → letter sent", kind: "states", images: [lg("01-1-state"), lg("01-2-state")], w: [792, 792] },
      { caption: "Floating CTA: order a call → confirmed", kind: "states", images: [lg("02-1-state"), lg("02-2-state")], w: [792, 792] },
      { caption: "Our Expertise: practice areas & process", kind: "wide", images: [lg("04-section")] },
      { caption: "Trusted Experts", kind: "wide", images: [lg("05-section")] },
      { caption: "Inner page: free consultation booking", kind: "wide", images: [lg("06-page")] },
      { caption: "Mobile: hero, expertise, footer", images: [lg("07-1-phone"), lg("07-2-phone"), lg("07-3-phone")] },
    ],
  },
  {
    id: "metamorphosis",
    title: "Kafka Art Society",
    description: "A landing page for a monthly art contest inspired by Kafka: a dark, atmospheric theme built on smoke textures and glow.",
    type: "Landing Page · Concept",
    tags: ["Art & Culture", "Contest Platform", "Visual Direction"],
    problem: "Contest pages often look like a form with rules attached. This one had to set the mood of Kafka's world first and still make the rules and submission easy.",
    scope: "UX, UI, visual direction, desktop and mobile",
    solution: "A dark teal theme with smoke-like textures, glow and an editorial serif. Under the mood, a clear path: this month's challenge, how to participate with a submission form, story highlights in a carousel, past winners by challenge, and an FAQ. Artworks shown are placeholder imagery.",
    decisions: [
      "Atmosphere comes from backgrounds and light (smoke textures, glow, serif headings), not from illustration",
      "One primary action, Submit your artwork, repeated at key points",
      "The story is told in a six-page carousel, so the section stays short",
      "Past winners: pick a name to see the work, switch challenges with the arrows",
      "FAQ as an accordion keeps the rules out of the way",
    ],
    cover: "/projects/Kafka/cover.webp",
    gallery: [
      { caption: "Full page", kind: "page", images: [kf("00-page")], preview: [kf("00-page-preview-top"), kf("00-page-preview-fade")] },
      { caption: "How to participate: rules & submission form", kind: "wide", images: [kf("01-section")] },
      { caption: "Story highlights carousel", kind: "wide", images: [kf("02-section")] },
      { caption: "Past winners: pick a name to see the work", kind: "states", images: [kf("03-1-state"), kf("03-2-state")], w: [2160, 2160], rounded: true },
      { caption: "FAQ accordion", kind: "wide", images: [kf("04-section")] },
      { caption: "Mobile: hero, menu, submission", images: [kf("05-1-phone"), kf("05-2-phone"), kf("05-3-phone")] },
    ],
  },
  {
    id: "pure-hair-salon",
    title: "Pure Hair",
    description: "A salon landing page designed for four breakpoints, with a one-field call-back form and reviews with photo upload.",
    type: "Landing Page · Concept",
    tags: ["Beauty", "Booking", "Responsive"],
    problem:
      "Beauty service businesses often have outdated or cluttered websites that don't reflect the quality of their actual service. This concept explored how a minimal, elevated landing page could position a hair salon as a premium, trustworthy brand.",
    scope: "UX, UI, four breakpoints (1440 / 1024 / 768 / 393)",
    solution: "Soft purple and mint with rounded shapes. Services sit in tabs with prices next to the photos. One primary action, Book a call, leads to a single-field call-back form. Clients can leave a review with a photo, and secondary pages like Privacy Policy reuse the same system.",
    decisions: [
      "Every CTA leads to one place: a call-back form with a single phone field",
      "Form states designed: error, filled, success",
      "Services in tabs with a price list beside the photos, with no extra page",
      "Review form: only the initial shown publicly, optional photo, character counter",
      "Each of the four breakpoints has its own layout, not just a shrink",
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
