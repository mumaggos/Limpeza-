import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { businessConfig } from "../config/business";
import { Home } from "./Home";

export function LandingPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Try to find if slug matches a city or a service
  const isCity = businessConfig.serviceAreas.some(area => area.slug === slug);
  const isService = businessConfig.services.some(service => service.slug === slug);
  
  const cityName = businessConfig.serviceAreas.find(a => a.slug === slug)?.name || "";
  const service = businessConfig.services.find(s => s.slug === slug);

  // If it doesn't match anything, fallback to Home
  if (!isCity && !isService) {
    return <Home />;
  }

  let headline = "";
  let subheadline = "";
  let serviceIdParam = "";

  if (isCity) {
    headline = `Limpeza profissional em ${cityName}`;
    subheadline = `Serviços de limpeza adaptados à sua casa ou empresa em ${cityName}. Conte-nos o que precisa e receba um orçamento personalizado.`;
  } else if (isService && service) {
    headline = `${service.title}`;
    subheadline = `Serviço profissional, pontual ou recorrente. Conte-nos o que precisa e receba um orçamento personalizado.`;
    serviceIdParam = service.id;
  }

  return (
    <div className="flex flex-col w-full pb-20 md:pb-0 min-h-screen">
      <section className="relative w-full pt-16 md:pt-24 pb-20 overflow-hidden bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto mb-10">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={`/orcamento${serviceIdParam ? '?servico=' + serviceIdParam : ''}`}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-neutral-800 transition-colors"
            >
              Pedir orçamento gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-neutral-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-neutral-400" />
            Orçamento personalizado · Sem compromisso
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-8">
                Limpeza profissional sem complicações.
              </h2>
              <ul className="space-y-4">
                {[
                  "Orçamentos personalizados",
                  "Equipa profissional e discreta",
                  "Flexibilidade de horários",
                  "Serviços pontuais ou recorrentes",
                  "Casas e empresas",
                  "Atendimento rápido",
                  isCity ? `Cobertura em toda a zona de ${cityName}` : "Possibilidade de serviços personalizados"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-neutral-900 flex-shrink-0" />
                    <span className="text-lg text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
               <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
                alt="Ambiente limpo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
