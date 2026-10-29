# Link app — Toro Burger Sobral

Página de links (link na bio) do cliente **Toro Burger**, publicada em `toro.cnvt.link` pela Vercel.

Também é o **modelo** para os link apps de outros clientes: HTML, CSS e um pouco de JS puros, sem framework, sem `npm install` e sem build.

## Estrutura

```
public/                    tudo aqui é publicado
  index.html               a página de links (visual, botões e animação)
  tracking.js              Google Analytics e Pixel da Meta (preencher os IDs)
  logo.png, favicon.ico
  cardapio-toro.pdf
vercel.json                redirects das rotas sem rastreamento
modelos/rota-rastreada.html  modelo de rota com rastreamento (não é publicado)
ROTAS.md                   registro de todas as rotas e onde cada uma fica
```

## Toro do Mês (item em destaque com validade)

Tudo fica em `public/index.html`, no bloco marcado `TORO DO MÊS: EDITE AQUI`:

- **Produto**: o texto do botão.
- **Período**: `data-de` e `data-ate` (formato `AAAA-MM-DD`, o último dia conta). Fora do período, o botão some sozinho; não precisa apagar nada.
- **Link**: o `destination` da rota `/toro-do-mes` no `vercel.json`.

Os atributos `data-de` e `data-ate` funcionam em qualquer item da página (botão, ícone etc.), não só no destaque. A data usada é a do celular de quem acessa.

## Rastreamento

Abra `public/tracking.js` e preencha:

- `googleTagId`: ID do Google Analytics 4 (`G-XXXXXXXXXX`)
- `metaPixelId`: ID do Pixel da Meta

Com o ID vazio, a ferramenta fica desligada e nenhum script externo é carregado. Ligada, ela registra a visita (PageView) e os cliques em qualquer elemento com `data-track="nome"` (evento `clique_link`, com o parâmetro `destino`).

## Rotas

Regra completa e lista atual em [ROTAS.md](ROTAS.md). Resumo:

- **Sem rastreamento**: adicione o redirect no `vercel.json`.
- **Com rastreamento**: copie `modelos/rota-rastreada.html` para `public/<rota>.html` e siga as instruções no topo do arquivo.

## Criar o link app de um novo cliente

1. Copie esta pasta.
2. Em `public/index.html`: troque as cores em `:root`, o título, a descrição, os textos e links dos botões e as redes sociais do rodapé.
3. Troque `logo.png`, `favicon.ico` e os arquivos do cliente em `public/`.
4. Atualize os destinos no `vercel.json` e no `ROTAS.md`.
5. Preencha os IDs em `public/tracking.js`, se houver.
6. Crie o projeto na Vercel apontando para a pasta (nenhuma configuração extra: o `vercel.json` já define tudo).

## Rodar localmente

```bash
npx vercel dev
```

O `vercel dev` aplica os redirects do `vercel.json`. Para ver só a página, qualquer servidor estático serve (`npx serve public`). Abrir o arquivo direto (`file://`) não carrega logo nem `tracking.js`, porque os caminhos começam com `/`.
