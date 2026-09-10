import { businessConfig } from "../config/business";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function Contacts() {
  return (
    <div className="pt-12 pb-24 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Fale connosco
          </h1>
          <p className="text-xl text-neutral-600">
            Estamos aqui para ajudar. Fale connosco pelos canais diretos ou preencha o formulário para um orçamento mais exato.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <a href={`https://wa.me/${businessConfig.contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">WhatsApp</h3>
            <p className="text-neutral-500 mb-4">Para apoio e respostas rápidas</p>
            <span className="text-[#25D366] font-medium">{businessConfig.contact.phoneDisplay}</span>
          </a>
          
          <a href={`tel:${businessConfig.contact.phone.replace(/\s+/g, '')}`} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Telefone</h3>
            <p className="text-neutral-500 mb-4">Ligue-nos diretamente</p>
            <span className="text-blue-600 font-medium">{businessConfig.contact.phoneDisplay}</span>
          </a>

          <a href={`mailto:${businessConfig.contact.email}`} className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Email</h3>
            <p className="text-neutral-500 mb-4">Para parcerias e informações gerais</p>
            <span className="text-purple-600 font-medium break-all">{businessConfig.contact.email}</span>
          </a>
        </div>

        <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden grid lg:grid-cols-2">
          {/* Section 1 */}
          <div className="p-10 md:p-16 bg-neutral-900 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Precisa de saber o preço?</h2>
              <p className="text-neutral-300 text-lg mb-10 leading-relaxed">
                Trabalhamos com orçamentos 100% personalizados. Responda a algumas perguntas rápidas sobre o seu espaço e enviamos-lhe uma proposta à medida, sem qualquer compromisso.
              </p>
              <Link
                to="/orcamento"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 transition-colors w-full sm:w-auto"
              >
                Pedir Orçamento Gratuito
              </Link>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Section 2 */}
          <div className="p-10 md:p-16 flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-neutral-100 text-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Sede & Zona de Atuação</h3>
                  <p className="text-neutral-500">{businessConfig.contact.address}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-900">Principais Áreas:</h4>
                <div className="flex flex-wrap gap-2">
                  {businessConfig.serviceAreas.map(area => (
                    <span key={area.slug} className="bg-neutral-50 border border-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full text-sm">
                      {area.name}
                    </span>
                  ))}
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}
