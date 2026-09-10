import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import { businessConfig } from "../config/business";

export function Success() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-sm border border-neutral-100 animate-in fade-in zoom-in-95 duration-500">
        <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">Pedido recebido!</h1>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Obrigado por contactar a Pronta e Limpa. Recebemos o seu pedido e iremos analisá-lo para preparar um orçamento personalizado. Responderemos brevemente através do contacto indicado.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-full font-semibold hover:bg-[#20bd5a] transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Falar pelo WhatsApp
          </a>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 bg-neutral-100 text-neutral-900 py-3.5 rounded-full font-semibold hover:bg-neutral-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
