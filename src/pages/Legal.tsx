export function Legal({ type }: { type: 'privacy' | 'terms' | 'cookies' }) {
  const titles = {
    privacy: "Política de Privacidade",
    terms: "Termos e Condições",
    cookies: "Política de Cookies"
  };

  return (
    <div className="pt-12 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-8">
          {titles[type]}
        </h1>
        <div className="prose prose-neutral">
          <p className="text-neutral-600 mb-4">
            [Aviso: Este documento encontra-se em fase de elaboração e adaptação legal para a empresa Pronta e Limpa.]
          </p>
          <p className="text-neutral-600 mb-4">
            A Pronta e Limpa compromete-se a proteger e respeitar a sua privacidade. Esta política descreve como os seus dados pessoais serão recolhidos e processados por nós, de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD).
          </p>
          <h2 className="text-xl font-bold text-neutral-900 mt-8 mb-4">1. Informação que recolhemos</h2>
          <p className="text-neutral-600 mb-4">
            Podemos recolher e processar os seguintes dados sobre si quando utiliza o nosso formulário de pedido de orçamento: nome, email, telefone, localização e detalhes do espaço.
          </p>
          <h2 className="text-xl font-bold text-neutral-900 mt-8 mb-4">2. Como utilizamos a informação</h2>
          <p className="text-neutral-600 mb-4">
            Utilizamos a informação para:
            - Fornecer os orçamentos e serviços solicitados.
            - Comunicar consigo sobre os seus pedidos.
            - Melhorar os nossos serviços.
          </p>
          <p className="text-neutral-600 mt-8 text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-PT')}
          </p>
        </div>
      </div>
    </div>
  );
}
