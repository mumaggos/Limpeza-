export function About() {
  return (
    <div className="pt-12 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-8">
          Sobre nós
        </h1>
        <div className="prose prose-lg prose-neutral">
          <p className="text-xl leading-relaxed text-neutral-700 mb-8 font-medium">
            A Pronta e Limpa nasceu com um objetivo simples: tornar o acesso a serviços de limpeza profissionais mais simples, rápidos e transparentes.
          </p>
          <div className="space-y-6 text-neutral-600">
            <p>
              Acreditamos que o seu tempo é precioso e deve ser gasto naquilo que realmente importa. Por isso, criámos um serviço focado na confiança, no profissionalismo e na tranquilidade dos nossos clientes.
            </p>
            <p>
              Na Pronta e Limpa, não oferecemos orçamentos genéricos. Sabemos que cada espaço é único e tem necessidades específicas. Seja a sua casa, o seu escritório ou o seu condomínio, avaliamos o seu pedido de forma personalizada para garantir o melhor serviço ao preço justo.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Atendimento personalizado e focado na sua satisfação</li>
              <li>Diferentes tipos de serviços para diferentes necessidades</li>
              <li>Orçamentos adaptados à dimensão e estado do seu espaço</li>
              <li>Compromisso com a qualidade e o rigor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
