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
}

export const projects: Project[] = [
  {
    id: "book-and-bite",
    title: "Book & Bite",
    description:
      "A mobile restaurant discovery and table booking app. Full end-to-end UX/UI case study.",
    type: "Mobile App · UX/UI Design",
    tags: ["Mobile", "Food Tech", "UX Research"],
    problem:
      "Finding and booking a restaurant through existing apps feels fragmented — users switch between review platforms, mapping apps, and booking tools. Book&Bite brings discovery, reviews, and reservations into a single, intuitive mobile flow.",
    role: "Lead UX/UI Designer",
    tools: ["Figma (prototyping)", "Photoshop", "ChatGPT"],
    solution:
      "A streamlined mobile app with a clear three-step booking flow: browse → select → confirm. Key design decisions included a restaurant card system for quick scanning, a persistent bottom navigation, and a streamlined date/time picker that reduces friction in the reservation step.",
    decisions: [
      "Card-based restaurant list with photo, rating, cuisine tags, and distance — scannable at a glance",
      "Booking flow reduced to 3 core steps: pick restaurant → choose time → confirm",
      "Visual seat selection feature — users can choose specific tables and halls on an interactive layout map",
      "Micro-interactions and animated transitions designed in Figma prototype to guide users through the flow",
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
    role: "Full UI/UX Design",
    tools: ["Figma"],
    solution:
      "A light, soft-toned landing page using natural imagery, generous whitespace, and a warm color palette to evoke cleanliness and care. The layout guides the user naturally from brand story → services → booking CTA.",
    decisions: [
      "Warm, muted palette (cream, nude, soft brown) — approachable and premium without feeling generic",
      "Hero with full-bleed image + minimal text overlay — emotional first impression",
      "Services presented as a clean card grid with icons — scannable and clear",
      "Adaptive layout — both desktop and mobile tested and presented",
    ],
  },
];
