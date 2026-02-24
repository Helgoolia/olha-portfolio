import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const hidden = useScrollDirection();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Кнопка з ЛОГОТИПОМ */}
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/Logo.svg" alt="Logo" className="h-5 w-auto" />
          </button>

          <div className="flex items-center gap-8">
            {[
              { label: "CV", href: "/CV.pdf" }, // Додали файл першим
              { label: "Work", id: "work" },
              { label: "About", id: "about" },
              { label: "Contact", id: "contact" },
            ].map((item) =>
              item.href ? (
                /* Спеціальна лінка для CV */
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                /* Звичайні кнопки для скролу */
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id!)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
