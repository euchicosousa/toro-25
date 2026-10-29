# Registro de rotas

Regra:

- **Sem rastreamento** → redirect no `vercel.json`. O servidor redireciona direto, sem carregar página.
- **Com rastreamento** (Analytics/Pixel precisa registrar a visita) → arquivo `public/<rota>.html`, copiado de `modelos/rota-rastreada.html`.

Uma rota fica em **um lugar só**. Se ela estiver nos dois, o `vercel.json` ganha e o HTML nunca é aberto.

| Rota        | Destino                                                         | Onde fica     | Rastreada |
| ----------- | --------------------------------------------------------------- | ------------- | --------- |
| `/`         | Página principal (`public/index.html`)                          | arquivo       | sim*      |
| `/app`      | https://app.cardapioweb.com/toro_burger                         | `vercel.json` | não       |
| `/ifood`    | https://www.ifood.com.br/delivery/sobral-ce/toro-burger-centro  | `vercel.json` | não       |
| `/whatsapp` | https://wa.me/5588993425341                                     | `vercel.json` | não       |
| `/review`   | https://g.page/r/CQOHGpiNmYiyEBM/review                         | `vercel.json` | não       |
| `/cardapio` | `/cardapio-toro.pdf`                                            | `vercel.json` | não       |

\* A página principal registra a visita e os cliques nos botões (`data-track`) assim que os IDs forem preenchidos em `public/tracking.js`. Por isso `/app`, `/ifood` e `/whatsapp` não precisam de rastreamento próprio quando o acesso vem da página principal; só precisam se o link for divulgado direto.
