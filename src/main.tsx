import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Fonts are bundled with the site (not loaded from Google), so they no longer block the first paint.
import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
