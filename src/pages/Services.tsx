import { Link } from "react-router-dom";
import { businessConfig } from "../config/business";
import { ArrowRight } from "lucide-react";

export function Services() {
  return (
    <div className="pt-12 pb-24 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            Os nossos serviços
          </h1>
          <p className="text-xl text-neutral-600">
            Limpeza profissional adaptada às suas necessidades. Escolha o serviço que procura e peça um orçamento sem compromisso.
          </p>
        </div>

        {/* Group by category */}
        <div className="space-y-16">
          {Array.from(new Set(businessConfig.services.map(s => s.category))).map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-8 border-b border-neutral-200 pb-4">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessConfig.services.filter(s => s.category === category).map((service) => (
                  <div key={service.id} className="group bg-white rounded-2xl border border-neutral-100 shadow-sm flex flex-col hover:shadow-lg transition-all overflow-hidden">
                    {/* Imagem do Serviço */}
                    {service.image && (
                      <div className="w-full h-48 overflow-hidden bg-neutral-100 relative">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 border border-black/10 pointer-events-none rounded-t-2xl"></div>
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
                      <p className="text-neutral-600 mb-6 flex-grow">{service.description}</p>
                      <Link
                        to={`/orcamento?servico=${service.id}`}
                        className="inline-flex items-center text-sm font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors"
                      >
                        Pedir orçamento <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
