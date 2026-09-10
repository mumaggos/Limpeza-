import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Areas() {
  const portoCities = [
    "Amarante", "Baião", "Felgueiras", "Gondomar", "Lousada", 
    "Maia", "Marco de Canaveses", "Matosinhos", "Paços de Ferreira", 
    "Paredes", "Penafiel", "Porto", "Póvoa de Varzim", 
    "Santo Tirso", "Trofa", "Valongo", "Vila do Conde", "Vila Nova de Gaia"
  ].sort();

  const aveiroCities = [
    "Águeda", "Albergaria-a-Velha", "Anadia", "Arouca", "Aveiro", 
    "Castelo de Paiva", "Espinho", "Estarreja", "Ílhavo", "Mealhada", 
    "Murtosa", "Oliveira de Azeméis", "Oliveira do Bairro", "Ovar", 
    "Santa Maria da Feira", "São João da Madeira", "Sever do Vouga", 
    "Vagos", "Vale de Cambra"
  ].sort();

  return (
    <div className="min-h-screen bg-neutral-50 pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl text-blue-700 mb-6">
          <MapPin className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight mb-6">
          A Nossa Área de Atuação
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          A <strong>Pronta e Limpa</strong> desloca-se a sua casa ou empresa em todo o distrito do Porto e de Aveiro. Consulte abaixo a lista completa de concelhos onde os nossos profissionais operam diariamente.
        </p>
      </section>

      {/* Grid Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Porto Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-100">
              <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Distrito do Porto</h2>
                <p className="text-sm text-neutral-500">Cobertura total nos {portoCities.length} concelhos</p>
              </div>
            </div>
            
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
              {portoCities.map((city) => (
                <li key={city} className="flex items-center text-neutral-700 group">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium group-hover:text-neutral-900 transition-colors">{city}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aveiro Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-100">
              <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Distrito de Aveiro</h2>
                <p className="text-sm text-neutral-500">Cobertura total nos {aveiroCities.length} concelhos</p>
              </div>
            </div>
            
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
              {aveiroCities.map((city) => (
                <li key={city} className="flex items-center text-neutral-700 group">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium group-hover:text-neutral-900 transition-colors">{city}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-neutral-900 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">A sua cidade está na lista?</h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto text-lg">
              Independentemente de estar no centro da cidade ou numa freguesia mais isolada, a nossa equipa vai até si.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/orcamento"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-900 rounded-full font-bold hover:bg-neutral-100 transition-colors"
              >
                Pedir Orçamento Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
}
