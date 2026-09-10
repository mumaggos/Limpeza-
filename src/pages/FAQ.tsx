export function FAQ() {
  const faqs = [
    {
      q: "A Pronta e Limpa trabalha com limpezas pontuais?",
      a: "Sim. Pode pedir um orçamento para uma limpeza única, seja para uma limpeza profunda ocasional, pós-obras, ou mudança."
    },
    {
      q: "Fazem limpeza regular?",
      a: "Sim, realizamos limpezas regulares (semanais, quinzenais, ou mensais) adaptadas à sua rotina e às necessidades do seu espaço."
    },
    {
      q: "Trabalham com condomínios?",
      a: "Sim, temos serviços dedicados à manutenção e limpeza de áreas comuns de edifícios e condomínios."
    },
    {
      q: "Fazem limpeza de escritórios?",
      a: "Sim, adaptamos os nossos serviços aos horários e exigências de espaços empresariais e escritórios."
    },
    {
      q: "Fazem limpeza depois de obras?",
      a: "Sim, temos equipas preparadas para a remoção de resíduos e limpeza fina após remodelações ou construções."
    },
    {
      q: "Fazem recolha e entrega de roupa?",
      a: "Sim, disponibilizamos serviço de lavandaria e engomadoria com recolha e entrega ao domicílio."
    },
    {
      q: "Como funciona o orçamento?",
      a: "Após preencher o formulário no nosso site detalhando o que precisa, a nossa equipa analisa a informação e envia-lhe uma proposta personalizada e sem compromisso."
    },
    {
      q: "O orçamento tem custos?",
      a: "Não. Todos os nossos orçamentos são gratuitos e sem qualquer compromisso."
    }
  ];

  return (
    <div className="pt-12 pb-24 bg-neutral-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
          Perguntas Frequentes
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          Encontre as respostas para as dúvidas mais comuns sobre os nossos serviços.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">{faq.q}</h3>
              <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
