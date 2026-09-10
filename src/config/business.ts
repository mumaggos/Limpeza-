import limpezaDomesticaImg from '../assets/images/limpeza_domestica_1788987933626.jpg';
import limpezaProfundaImg from '../assets/images/limpeza_profunda_1788987946902.jpg';
import condominiosImg from '../assets/images/condominios_1788987959492.jpg';
import escritoriosImg from '../assets/images/escritorios_1788987971053.jpg';
import posObrasImg from '../assets/images/pos_obras_1788987982979.jpg';
import mudancasImg from '../assets/images/mudancas_1788987995124.jpg';
import lavandariaImg from '../assets/images/lavandaria_1788988008531.jpg';
import sofasVidrosImg from '../assets/images/sofas_vidros_1788988020549.jpg';

export const businessConfig = {
  brandName: "Pronta e Limpa",
  contact: {
    email: process.env.VITE_BUSINESS_EMAIL || "prontaelimpa@gmail.com",
    phone: process.env.VITE_BUSINESS_PHONE || "+351 918 691 149",
    phoneDisplay: "918 691 149", 
    whatsappNumber: process.env.VITE_WHATSAPP_NUMBER || "351918691149",
    address: "Norte de Portugal",
  },
  serviceAreas: [
    { name: "Porto", slug: "porto" },
    { name: "Vila Nova de Gaia", slug: "vila-nova-de-gaia" },
    { name: "Matosinhos", slug: "matosinhos" },
    { name: "Maia", slug: "maia" },
    { name: "Gondomar", slug: "gondomar" },
    { name: "Valongo", slug: "valongo" },
    { name: "Vila do Conde", slug: "vila-do-conde" },
    { name: "Aveiro", slug: "aveiro" },
  ],
  services: [
    {
      id: "limpeza-domestica",
      title: "Limpeza Doméstica",
      slug: "limpeza-domestica",
      description: "Limpeza regular ou pontual para casas e apartamentos.",
      shortDescription: "Limpeza regular ou pontual.",
      category: "Limpeza de Espaços",
      image: limpezaDomesticaImg,
    },
    {
      id: "limpeza-profunda",
      title: "Limpeza Profunda",
      slug: "limpeza-profunda",
      description: "Uma limpeza mais completa e detalhada para recuperar e renovar totalmente o espaço.",
      shortDescription: "Limpeza intensiva e detalhada.",
      category: "Limpeza de Espaços",
      image: limpezaProfundaImg,
    },
    {
      id: "condominios",
      title: "Limpeza de Condomínios",
      slug: "condominios",
      description: "Limpeza e manutenção cuidada das áreas comuns do seu edifício.",
      shortDescription: "Manutenção de áreas comuns.",
      category: "Limpeza de Espaços",
      image: condominiosImg,
    },
    {
      id: "escritorios-e-comercio",
      title: "Escritórios e Comércio",
      slug: "escritorios-e-comercio",
      description: "Serviços de limpeza adaptados a empresas, lojas e espaços profissionais.",
      shortDescription: "Ambientes profissionais limpos.",
      category: "Limpeza de Espaços",
      image: escritoriosImg,
    },
    {
      id: "limpeza-pos-obras",
      title: "Limpeza Pós-Obras",
      slug: "limpeza-pos-obras",
      description: "Limpeza fina de espaços depois de obras, remodelações ou construções.",
      shortDescription: "Limpeza após construção/obras.",
      category: "Situações Especiais",
      image: posObrasImg,
    },
    {
      id: "mudancas",
      title: "Limpeza de Mudanças",
      slug: "mudancas",
      description: "Limpeza completa antes da entrada ou depois da saída de um imóvel.",
      shortDescription: "Limpeza pré ou pós mudança.",
      category: "Situações Especiais",
      image: mudancasImg,
    },
    {
      id: "lavandaria-e-engomadoria",
      title: "Lavandaria e Engomadoria",
      slug: "lavandaria-e-engomadoria",
      description: "Serviço profissional de lavagem e engomadoria com recolha e entrega da sua roupa ao domicílio.",
      shortDescription: "Tratamento de roupa com recolha.",
      category: "Serviços de Lavandaria",
      image: lavandariaImg,
    },
    {
      id: "sofas-colchoes-vidros",
      title: "Sofás, Colchões e Vidros",
      slug: "sofas-colchoes-vidros",
      description: "Limpeza especializada de estofos, têxteis e superfícies envidraçadas.",
      shortDescription: "Limpeza de estofos e janelas.",
      category: "Situações Especiais",
      image: sofasVidrosImg,
    }
  ],
  socialLinks: {
    facebook: "#",
    instagram: "#",
  }
};
