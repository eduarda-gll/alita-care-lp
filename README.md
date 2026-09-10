# Alita Care — landing page

Landing page pública do Alita. SPA em Vite + React 18 + Tailwind v4, com
**pré-render em tempo de build**: cada rota sobe como HTML estático de verdade,
e o React hidrata por cima.

```bash
npm install
npm run dev          # http://localhost:3100
npm run build        # gera build/ com HTML por rota
npm run preview      # serve o build
npm run typecheck
npm run check:contrast
```

---

## Como este projeto se organiza

Uma pasta por seção, com o conteúdo dela dentro. Convenção herdada do
[typebot.io](https://github.com/baptisteArno/typebot.io), que foi a referência
de layout e de técnica de animação.

```
src/
  components/          transversal a todas as páginas
    Section.tsx         o ritmo vertical da página inteira mora aqui
    Card.tsx           puro, sem motion
    motion-wrappers.tsx  versões animadas dos componentes puros
    mockups/           capturas de produto em DOM (não são imagens)
  features/
    home/
      Home.tsx         só a ORDEM das seções
      hero/  how-it-works/  social-proof/  features/
      get-started/  testimonials/  cta/  faq/
    pricing/
  styles/
    colors.css          ARQUIVO ÚNICO DE COR
    index.css          papéis type-*, base, animações
```

**Nenhuma seção escolhe o próprio `padding` vertical.** Quem manda é o
`Section`. É essa regra que impede o ritmo de desandar quando a nona seção
entrar.

---

## As regras que não se afrouxam

### Cor mora num arquivo só

Toda cor vive em [`src/styles/colors.css`](src/styles/colors.css), em **dois
blocos que declaram as mesmas variáveis**: `@theme` é o tema claro, `.dark` é o
escuro. Nunca declare cor de marca fora dali, e nunca mude um bloco sem
espelhar no outro.

`bg-white` e `text-white` **não existem** (`--color-white: initial`). É de
propósito: força o token semântico. Precisa de claro fixo nos dois temas?
`on-dark`.

Mexeu em cor? Rode `npm run check:contrast` antes de subir. São 39 pares
vigiados, e o script sai com código 1 se algum reprovar.

### Tipografia é por papel

Todo texto recebe um papel `type-*` ([`src/styles/index.css`](src/styles/index.css)),
nunca tamanho cru. Nada de `text-lg`, `text-[15px]` ou `font-bold` solto. Se
nenhum papel servir, **adicione um papel novo antes de usar**.

Um `type-hero` por página. Peso 700 é proibido, com uma exceção documentada: o
`type-hero` usa 800.

### Animação de entrada é CSS, nunca `motion`

⚠️ **Esta é a regra menos óbvia do projeto, e ela veio de um bug medido.**

O build pré-renderiza o HTML, e o `motion` grava o estado **inicial** como
`style` inline no servidor. Com `initial={{ opacity: 0 }}`, o HTML entregue ao
crawler nascia com a headline e mais 13 blocos em `opacity: 0` — página em
branco, anulando o pré-render inteiro.

Por isso toda entrada (carregamento e scroll) é CSS: o HTML fica no estado
**visível** e a animação entra por cima.

| Cenário | Resultado |
|---|---|
| Sem CSS | conteúdo visível, sem animação |
| Sem JS | conteúdo visível, **com** animação |
| `prefers-reduced-motion` | conteúdo visível, sem animação |

O `motion` continua onde é insubstituível: troca de estado dirigida por React
(carrossel de cenários, órbita de canais), onde o servidor já renderiza o
estado final.

### Sem sombra em conteúdo

Card se separa do fundo pela **borda**. Sombra só em overlay flutuante.

---

## Conteúdo que ainda depende de aprovação

Três arquivos são a fonte de verdade do que a página afirma. Dois estão
**vazios de propósito**, e as seções correspondentes se ajustam sozinhas.

| Arquivo | Estado | O que acontece hoje |
|---|---|---|
| [`features/home/testimonials/quotes.ts`](src/features/home/testimonials/quotes.ts) | vazio | A seção de depoimentos **não renderiza**. Sem depoimento autorizado, ela não vai ao ar com texto placeholder. |
| [`features/home/social-proof/clients.ts`](src/features/home/social-proof/clients.ts) | vazio | A faixa cai no modo **integrações**, que diz algo verificável e não depende de autorização de ninguém. Preencher `CLIENTS` liga a faixa de logos; preencher `METRICS` liga a de números. |
| [`features/pricing/plans.ts`](src/features/pricing/plans.ts) | preenchido | Tabela comercial real. **Confirmar o nome do 2º plano** (`TODO(comercial)`). |

A regra por trás das três: **não publicar logo sem autorização e não inventar
número**. É mais barato deixar uma seção sumir do que corrigir uma afirmação
falsa depois que ela subiu.

---

## Variáveis de ambiente

| Variável | Efeito |
|---|---|
| `VITE_CONTACT_WEBHOOK_URL` | Endpoint que recebe as dúvidas do FAQ. Hoje aponta para o **FormSubmit** (`https://formsubmit.co/ajax/<destino>`), declarado em `.env` — o valor termina no bundle do cliente, então não é segredo e fica versionado, senão cada máquina que builda cai no fallback. **Vazia** faz o envio abrir o cliente de e-mail via `mailto:` para `SITE.contactEmail`. Duas coisas do FormSubmit que o código trata: o primeiro envio de um destino novo **não entrega nada** até alguem clicar no link de ativação que chega naquela caixa, e ele responde **HTTP 200 mesmo em falha** (`{"success":"false"}`), por isso o handler checa o campo `success` e não só `response.ok`. |

---

## Pré-render, em uma parada

`npm run build` encadeia três passos:

1. `vite build` — bundle do cliente
2. `vite build --ssr` — bundle de `entry-server.tsx`
3. `scripts/prerender.mjs` — renderiza cada rota e grava o HTML

Página nova entra no pré-render só de ser somada a `PRERENDER_ROUTES`
([`src/routes.tsx`](src/routes.tsx)) — o script lê a lista do mesmo lugar que o
app, então as duas não divergem.

O resultado é `build/index.html` e `build/planos/index.html`, servíveis por
qualquer host estático com fallback de SPA.
