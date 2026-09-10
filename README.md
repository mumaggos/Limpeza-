# BRILVA - Serviço de Limpeza Profissional

Aplicação web completa, moderna e preparada para produção, desenvolvida para a Pronta e Limpa.
O principal objetivo desta plataforma é a conversão de leads (pedidos de orçamento).

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Supabase (Backend as a Service)
- Lucide React (Ícones)

## Instalação e Execução Local

1. Clone o repositório ou faça download dos ficheiros.
2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`
3. Configure as variáveis de ambiente (ver secção abaixo).
4. Inicie o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Para criar a build de produção:
   \`\`\`bash
   npm run build
   \`\`\`

## Variáveis de Ambiente

Crie um ficheiro \`.env\` na raiz do projeto, utilizando o \`.env.example\` como base.

\`\`\`env
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_BUSINESS_EMAIL="info@prontaelimpa.pt"
VITE_BUSINESS_PHONE="+351900000000"
VITE_WHATSAPP_NUMBER="351900000000"
\`\`\`

### Configuração do WhatsApp
O número do WhatsApp deve ser inserido apenas com números, incluindo o código do país (ex: \`351900000000\`). Este valor irá gerar dinamicamente os links de chat em todo o site.

## Base de Dados (Supabase)

Para o sistema de leads funcionar, necessita de configurar o Supabase.

1. Crie um projeto no [Supabase](https://supabase.com/).
2. Vá a SQL Editor e execute o seguinte script para criar a tabela \`leads\`:

\`\`\`sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  email text not null,
  service text,
  services text[],
  property_type text,
  location text,
  postal_code text,
  address text,
  frequency text,
  area text,
  rooms text,
  bathrooms text,
  pets boolean,
  preferred_date text,
  preferred_time text,
  details text,
  extras text[],
  contact_preference text,
  status text default 'Novo',
  source text default 'Website',
  campaign text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text
);
\`\`\`

3. Copie o URL e Anon Key do seu projeto Supabase (Project Settings > API) para o seu ficheiro \`.env\`.

## Notificações por Email

O envio automático de emails não está configurado de raiz no frontend por questões de segurança (para evitar expor secrets).
Para notificar a Pronta e Limpa de novos pedidos, a abordagem recomendada é:

**Opção A:** Utilizar o Supabase Edge Functions ou Supabase Database Webhooks acionados sempre que um novo registo é inserido na tabela \`leads\`, ligando a serviços como Resend, SendGrid ou Postmark.
**Opção B:** Integrar com o Zapier / Make (integromat) escutando novos registos no Supabase para enviar emails via Gmail ou Outlook.

## Tracking & Analytics (Google Analytics, Google Ads, Meta Pixel)

A estrutura atual está pronta para o tracking, mas os scripts oficiais precisam ser injetados.
Para o fazer sem sujar o código React, a melhor prática é adicionar o snippet do **Google Tag Manager (GTM)** diretamente no ficheiro \`/index.html\` (dentro do \`<head>\`).

Todos os cliques nos botões (Contactos, Formulário de Pedido) têm classes e rotas (ex: \`/sucesso\`) fáceis de identificar para disparar tags de conversão no GTM para:
- Google Analytics 4 (GA4)
- Google Ads (Tag de Conversão no \`/sucesso\`)
- Meta Pixel (Lead)

## Deploy e Domínio

Este projeto é uma Single Page Application (SPA).
A recomendação de alojamento é utilizar o **Vercel**, **Render**, ou **Cloudflare Pages**.

### Exemplo (Vercel):
1. Importe o projeto no Vercel.
2. Nas definições de Build, certifique-se que o Framework Preset é "Vite".
3. Nas Environment Variables, adicione as mesmas chaves do seu \`.env\`.
4. Faça deploy.
5. Em Domains, pode configurar o seu domínio personalizado (ex: \`www.prontaelimpa.pt\`).

**Nota importante para SPA Routing (ex: Cloudflare Pages / Render):**
Se utilizar Render ou Cloudflare Pages, certifique-se de configurar regras de Rewrite de forma a que todo o tráfego que não é ficheiro estático seja redirecionado para \`/index.html\`, para que o React Router consiga controlar as rotas. (O Vercel e o Netlify fazem isto automaticamente).
