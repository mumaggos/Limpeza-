import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { businessConfig } from "../../config/business";
import { cn } from "../../lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Como funciona", path: "/#como-funciona" },
    { name: "Áreas de atuação", path: "/areas-de-atuacao" },
    { name: "Sobre nós", path: "/sobre-nos" },
    { name: "FAQ", path: "/perguntas-frequentes" },
    { name: "Contactos", path: "/contactos" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-white py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border-2 border-white flex items-center justify-center group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-0.5">
              <img src="/favicon.jpg" alt="Pronta e Limpa Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
              {businessConfig.brandName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.path.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/orcamento"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 transition-colors"
            >
              PEDIR ORÇAMENTO
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              to="/orcamento"
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-sm"
            >
              ORÇAMENTO
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-900 p-1"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-100 shadow-lg px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            link.path.startsWith("/#") ? (
              <a
                key={link.name}
                href={link.path}
                className="text-base font-medium text-neutral-900 p-2 rounded-md hover:bg-neutral-50"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="text-base font-medium text-neutral-900 p-2 rounded-md hover:bg-neutral-50 block w-full"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      )}
    </header>
  );
}
