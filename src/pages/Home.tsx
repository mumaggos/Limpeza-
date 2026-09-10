import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { businessConfig } from "../config/business";
import homeHeroImg from '../assets/images/limpeza_domestica_1788987933626.jpg';

export function Home() {
  return (
    <div className="flex flex-col w-full pb-20 md:pb-0">
      {/* Hero Section */}
      <section className="relative w-full pt-16 md:pt-24 pb-20 lg:pb-32 overflow-hidden bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                Mais tempo para si. <br className="hidden md:block" />
                <span className="text-blue-600">Nós tratamos da limpeza e da sua roupa.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg">
                Serviços profissionais de limpeza e lavandaria, com recolha e entrega ao domicílio, para casas e empresas no Norte de Portugal.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/orcamento"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-neutral-800 transition-colors"
                >
                  Pedir orçamento gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href={`https://wa.me/${businessConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white border border-neutral-200 px-8 py-4 text-base font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors"
                >
                  Falar connosco
                </a>
              </div>
              <p className="mt-4 text-sm text-neutral-500 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-neutral-400" />
                Orçamento personalizado · Sem compromisso
              </p>
            </div>
            
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Premium image representing clean space */}
              <img
                src={homeHeroImg}
                alt="Espaço interior limpo, moderno e serviço profissional"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-black/10 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              O que fazemos
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Do pequeno serviço à limpeza completa. Escolha o serviço que melhor se adapta às suas necessidades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {businessConfig.services.map((service) => (
              <div key={service.id} className="group relative bg-white border border-neutral-100 rounded-2xl transition-all hover:shadow-lg overflow-hidden flex flex-col h-full">
                {service.image ? (
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 border border-black/10 rounded-t-2xl pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-100 text-neutral-700 font-medium">
                      {service.title.charAt(0)}
                    </div>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                  <p className="text-neutral-600 mb-6 flex-grow">{service.shortDescription}</p>
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
      </section>

      {/* How it Works */}
      <section className="py-20 bg-neutral-900 text-white" id="como-funciona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Como funciona
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <span className="text-5xl font-black text-neutral-800 absolute -top-4 -left-4 z-0">01</span>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-bold mb-2">Conte-nos o que precisa</h3>
                <p className="text-neutral-400">Preencha o formulário com os detalhes do serviço.</p>
              </div>
            </div>
            <div className="relative">
              <span className="text-5xl font-black text-neutral-800 absolute -top-4 -left-4 z-0">02</span>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-bold mb-2">Analisamos o pedido</h3>
                <p className="text-neutral-400">A equipa Pronta e Limpa avalia o serviço, localização e necessidades.</p>
              </div>
            </div>
            <div className="relative">
              <span className="text-5xl font-black text-neutral-800 absolute -top-4 -left-4 z-0">03</span>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-bold mb-2">Receba o seu orçamento</h3>
                <p className="text-neutral-400">Enviamos uma proposta personalizada para si.</p>
              </div>
            </div>
            <div className="relative">
              <span className="text-5xl font-black text-neutral-800 absolute -top-4 -left-4 z-0">04</span>
              <div className="relative z-10 pt-4">
                <h3 className="text-xl font-bold mb-2">Agende o serviço</h3>
                <p className="text-neutral-400">Escolha a data e horário disponíveis.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link
              to="/orcamento"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 shadow-sm hover:bg-neutral-100 transition-colors"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-8">
                Limpeza profissional sem complicações.
              </h2>
              <ul className="space-y-4">
                {[
                  "Orçamentos personalizados",
                  "Serviço profissional",
                  "Flexibilidade",
                  "Serviços pontuais ou recorrentes",
                  "Casas e empresas",
                  "Vários serviços no mesmo pedido",
                  "Atendimento rápido",
                  "Cobertura regional",
                  "Possibilidade de serviços personalizados"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-neutral-900 flex-shrink-0" />
                    <span className="text-lg text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
               <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                alt="Ambiente limpo e minimalista"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
