# Virteon

Protótipo front-end Web e VR com Next.js App Router, React, TypeScript e Tailwind CSS. As interfaces recriam os dez mockups fornecidos em componentes reais.

## Execução local

Requer Node.js 20.9 ou superior e npm.

```bash
npm install
npm run dev
```

Abra **http://localhost:3000**. Se a porta estiver ocupada, use o endereço indicado pelo Next.js no terminal.

## Rotas

| Rota | Interface |
| --- | --- |
| `/` | Apresentação com as seis seções consecutivas dos mockups |
| `/industry` | Painel do colaborador e catálogo filtrável |
| `/industry/treinamentos/vazamento-de-aco` | Detalhe do treinamento, prévia e etapas |
| `/industry/desempenho` | Relatório individual e exportação CSV |
| `/edu` | Painel da estudante, missões, trilha e conquista |

**Conhecer a VIRTEON** abre Industry. O seletor **VIRTEON Industry**, no topo da barra lateral, abre EDU; o seletor no EDU permite retornar. No celular, abra primeiro o menu no canto superior esquerdo.

## Interações

A inicialização é controlada por `components/startup-screen.tsx`, montado no layout raiz. Ela aparece a cada novo documento ou recarga, preserva a rota acessada e não reinicia na navegação interna. A animação visual dura aproximadamente 2,5 segundos, seguida por um fade de 250 ms. A barra aguarda a montagem, o carregamento do documento, das fontes e da arte antes de completar. Não representa progresso de rede mensurável. As transições respeitam movimento reduzido.

Arquivos oficiais: `public/virteon-splash.jpg` (1536 × 1024) e `public/virteon-logo.jpg` (1536 × 796), copiados sem recompressão dos originais em `public/tela-carregamento/` e `public/logo/`. O componente compartilhado `Brand` usa a mesma logo em todos os ambientes. O CSS mantém a imagem inteira e mascara apenas a barra estática da splash para substituí-la pela barra animada. Se um asset falhar, um texto de marca permite continuar usando o protótipo.

- Navegação por `next/link`, sem recarregar o documento.
- Filtros de treinamentos e busca local nas telas disponíveis.
- Prévia ilustrativa ampliada em modal com fechamento por Escape e gestão de foco nativa.
- Exportação dos dados demonstrativos do relatório em CSV.
- Perguntas frequentes expansíveis e navegação entre seções.
- Avisos para funcionalidades futuras, notificações e missões bloqueadas.
- Hover, foco visível, feedback de clique, elevação dos cards e entrada de seções no scroll, respeitando `prefers-reduced-motion`.
- Menu móvel e adaptação dos painéis às telas menores.

Nomes, pontuações, prazos e progressos são dados fixos dos mockups. Autenticação, backend, simulações Web/VR, agendamento, certificados, novos treinamentos e novas missões não estão implementados; os controles correspondentes apresentam avisos. Não há persistência de progresso.

## Organização

- `app/`: páginas, layouts compartilhados, estilos e ícone.
- `components/`: apresentação, estrutura dos ambientes, painel Industry, ícones SVG e componentes reutilizáveis.
- `public/assets/`: 14 recortes exclusivamente fotográficos dos mockups.
- `scripts/prepare-assets.mjs`: reprodução dos recortes sem ampliar resolução nem modificar os originais.
- `tests/prototype.spec.ts`: navegação, filtros, avisos, busca, modal, download, menu móvel, movimento reduzido e verificações das cinco rotas em 360, 390, 768 e 1365 pixels.
- `tests/startup.spec.ts`: arte oficial, progresso, recarga, preservação de rotas, troca de ambiente sem repetir a splash, espera por carregamento, responsividade e recuperação de falha da arte.

Os originais permanecem nas três pastas de referência. Textos, botões, cards, gráficos, ícones e barras são HTML/CSS/SVG. Nenhuma página usa um mockup inteiro como fundo. As fotos têm resolução limitada: para maior nitidez em apresentações de alta resolução, substitua os recortes pelos arquivos fotográficos originais de melhor qualidade. Nenhum asset foi ampliado artificialmente.

## Verificação

```bash
npm run lint
npm run typecheck
npm run build
```

Para testes no navegador, instale o Chromium do Playwright uma vez:

```bash
npx playwright install chromium
npm run test:e2e
```

Os testes iniciam o servidor de desenvolvimento na porta 3000 ou reutilizam uma instância local existente. Para verificar a build de produção manualmente, execute `npm run build` e depois `npm start`.

Para reproduzir os assets fotográficos:

```bash
npm run assets:prepare
```
