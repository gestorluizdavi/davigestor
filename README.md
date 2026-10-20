# Landing page — Luiz Davi

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion for React.

## Rodar no computador

```bash
npm install
cp .env.example .env.local   # preencha os valores reais
npm run dev                  # http://localhost:3000
```

## Publicar

**Vercel (recomendado):** suba a pasta para um repositório no GitHub, importe na Vercel e cadastre as variáveis do `.env.example` em *Settings → Environment Variables*. Não precisa de nenhuma configuração extra.

**Netlify:** importe o repositório; comando de build `npm run build`. O Netlify detecta o Next.js automaticamente.

**Cloudflare Workers (via GitHub, fluxo padrão do Cloudflare hoje):** o arquivo `wrangler.jsonc` já faz o build e aponta a pasta `out`. Em Workers & Pages → Create application → Import a repository, escolha o repositório e mantenha o deploy command `npx wrangler deploy`. O `package.json` e o `wrangler.jsonc` precisam estar na raiz do repositório (ou informe a pasta em *Root directory*). O campo `name` do `wrangler.jsonc` deve ser igual ao nome do projeto no Cloudflare.

**Cloudflare Pages (via GitHub):** em Workers & Pages → Create application → Pages → Import an existing Git repository, escolha o repositório e use:
- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build:static` (o `npx next build` sugerido pelo preset também funciona; no Cloudflare a versão estática é ativada sozinha)
- Build output directory: `out`
- Variáveis de ambiente: as do `.env.example`. Elas entram no site no momento do build; depois de alterar, faça um novo deploy.

**Cloudflare Pages (arrastar e soltar):** rode `npm run build:static` no seu computador, com o `.env.local` preenchido, e envie a pasta `out/` em Create → Pages → Upload assets.

**Outra hospedagem estática:** `npm run build:static` gera a pasta `out/` pronta para subir.

## O que ainda precisa de dados reais

| Item | Onde |
|---|---|
| Número do WhatsApp (DDI + DDD, só números) | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Domínio final | `NEXT_PUBLIC_SITE_URL` |
| IDs do GTM, Meta Pixel e GA4 | `.env` — vazio = script não carrega |
| Segunda foto para a seção "Sobre" (vertical, boa resolução) | `public/images/` e import em `src/components/About.tsx` |
| Foto do hero em resolução maior (a atual tem 640 px) | substituir `public/images/luiz-davi.jpg` mantendo o nome |
| Cases autorizados | `src/content/cases.ts` |

Enquanto o número não for preenchido, os botões abrem o WhatsApp com a mensagem pronta e a pessoa escolhe o contato.

## Editar textos

Todos os textos, mensagens do WhatsApp e listas ficam em `src/content/site.ts`. Cada botão de WhatsApp tem sua própria mensagem inicial (`hero`, `final`, `para-quem`…).

## Cases

Adicione itens em `src/content/cases.ts`. Com a lista vazia, a seção 05 mostra o método de leitura das campanhas; com pelo menos um case, ela passa a exibir os cases automaticamente.

## Rastreamento

Todos os eventos passam por `src/lib/analytics.ts` e vão para o `dataLayer` (GTM) e, se carregados, para o Pixel e o GA4.

| Evento | Quando | Parâmetros |
|---|---|---|
| `whatsapp_click` | clique em qualquer botão de WhatsApp (no Pixel vira `Contact`) | `placement`, `utm_source`, `utm_campaign` |
| `instagram_click` | clique no Instagram | `placement` |
| `section_view` | primeira vez que cada seção aparece | `section` |
| `nav_click` | clique no menu | `section` |
| `secondary_cta_click` | "Conheça meu trabalho" | `placement` |

**Origem (UTM):** `utm_*`, `fbclid` e `gclid` da primeira página vista ficam salvos na sessão. Quando existem, a mensagem do WhatsApp termina com uma referência curta, ex.: `(ref: instagram / bio)`, para você saber de onde veio cada conversa. Desligue em `site.whatsapp.appendOrigin`.

Para o link da bio, use por exemplo: `https://bio.luizdavi.com.br/?utm_source=instagram&utm_medium=bio`.

**Se usar GTM**, instale Pixel e GA4 dentro dele e deixe as outras duas variáveis vazias, para não duplicar disparos. Crie gatilhos de "Evento personalizado" com os nomes da tabela.

## Estrutura

```
src/
  app/            layout (SEO, Open Graph, JSON-LD), página, robots, sitemap
  components/     uma seção por arquivo + ui.tsx (botões, revelações, ícones)
  content/        site.ts (textos) e cases.ts
  lib/            analytics.ts e whatsapp.ts
public/           foto, og.jpg (compartilhamento) e ícone
```

Acessibilidade: contraste AA nos textos e botões, foco visível, link "pular para o conteúdo", menu com Esc, e todas as animações respeitam `prefers-reduced-motion`.
