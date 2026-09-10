import { Link, useLocation } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { businessConfig } from "../../config/business";

export function MobileCTA() {
  const location = useLocation();

  // Ocultar os botões na página do formulário e de admin para não atrapalhar
  if (location.pathname === '/orcamento' || location.pathname === '/admin') {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 flex gap-3 justify-center pointer-events-none">
      <Link
        to="/orcamento"
        className="pointer-events-auto flex-1 bg-neutral-900/90 backdrop-blur-md text-white rounded-full py-3 px-2 flex items-center justify-center gap-2 font-medium text-sm shadow-[0_8px_16px_rgba(0,0,0,0.15)] active:scale-95 transition-transform border border-neutral-800/50"
      >
        <FileText size={16} />
        Orçamento
      </Link>
      <a
        href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex-1 bg-green-500/90 backdrop-blur-md text-white rounded-full py-3 px-2 flex items-center justify-center gap-2 font-medium text-sm shadow-[0_8px_16px_rgba(34,197,94,0.25)] active:scale-95 transition-transform border border-green-400/50"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
    </div>
  );
}
