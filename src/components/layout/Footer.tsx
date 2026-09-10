import { Link } from "react-router-dom";
import { businessConfig } from "../../config/business";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border-2 border-white/10 flex items-center justify-center group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-0.5">
                <img src="/favicon.jpg" alt="Pronta e Limpa Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                {businessConfig.brandName}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs">
              Limpeza profissional para casas, empresas e espaços no Norte de Portugal.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/orcamento" className="hover:text-white transition-colors">Orçamento</Link></li>
              <li><Link to="/sobre-nos" className="hover:text-white transition-colors">Sobre nós</Link></li>
              <li><Link to="/perguntas-frequentes" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contactos" className="hover:text-white transition-colors">Contactos</Link></li>
              <li><Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link to="/termos-e-condicoes" className="hover:text-white transition-colors">Termos</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>

          {/* Áreas */}
          <div>
            <h3 className="text-white font-semibold mb-6">Áreas</h3>
            <ul className="space-y-3 text-sm grid grid-cols-2 gap-x-4">
              {businessConfig.serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link to={`/${area.slug}`} className="hover:text-white transition-colors">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${businessConfig.contact.email}`} className="hover:text-white transition-colors">
                  {businessConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${businessConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {businessConfig.contact.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${businessConfig.contact.whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} {businessConfig.brandName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
