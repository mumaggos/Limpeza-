import { Link } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { businessConfig } from "../../config/business";

export function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-3 px-4 flex gap-3">
      <Link
        to="/orcamento"
        className="flex-1 bg-neutral-900 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold text-sm shadow-sm active:scale-95 transition-transform"
      >
        <FileText size={18} />
        PEDIR ORÇAMENTO
      </Link>
      <a
        href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-green-500 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold text-sm shadow-sm active:scale-95 transition-transform"
      >
        <MessageCircle size={18} />
        WHATSAPP
      </a>
    </div>
  );
}
