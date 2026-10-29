# AUTOVIA Veículos

Vitrine digital de veículos com catálogo, captação de leads e painel administrativo.

> **Demonstração pública.** Telefones, WhatsApp, e-mail, endereço, CNPJ, redes sociais e dados de clientes são fictícios. Nenhum pedido, mensagem ou formulário é enviado a um canal real.

[**Ver demonstração**](https://autovia-veiculos.vercel.app) · Next.js 16 (App Router) · React 19 · TypeScript · PostgreSQL + Drizzle ORM · Tailwind CSS 4

## O que tem

- Catálogo com filtros por marca, modelo, ano, combustível e câmbio
- Página de detalhe com galeria de fotos e especificações
- Formulário de interesse com validação
- Painel administrativo com login JWT e CRUD de veículos
- SEO local e metadados por veículo

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- PostgreSQL + Drizzle ORM
- Tailwind CSS 4

## Rodando localmente

```bash
npm ci
cp .env.example .env.local
# edite .env.local com a sua connection string
npm run dev
```

Acesse `http://localhost:3000`.

## Variáveis de ambiente

| Variável | Obrigatória | Para que serve |
| --- | --- | --- |
| `DATABASE_URL` | Sim | Connection string PostgreSQL/Neon |
| `ADMIN_SEED_EMAIL` | Sim | E-mail do administrador criado no seed |
| `ADMIN_SEED_PASSWORD` | Sim | Senha do administrador criado no seed |

## Banco de dados

PostgreSQL no Neon (banco `autovia`). O schema fica em `src/db/schema.ts` e é aplicado com `npx drizzle-kit push`. Em produção, use uma connection string Neon com `sslmode=require`.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Home com destaques e busca |
| `/veiculos/[slug]` | Detalhe do veículo |
| `/admin/login` | Login do painel |
| `/admin` | Dashboard de estoque |
| `/admin/veiculos/novo` | Cadastro de veículo |
| `/admin/veiculos/[id]` | Edição de veículo |

## Testes e qualidade

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Deploy

O deploy é feito na Vercel. Configure as variáveis acima no painel do projeto, conecte o repositório e use `npm run build`.

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/` | Rotas, layouts e API |
| `src/components/site/` | Header, hero, seções e footer |
| `src/components/` | Modais e UI do painel |
| `src/db/` | Schema Drizzle e seed |
| `src/lib/` | Autenticação, utilidades e tipos |

## Licença

MIT — veja [LICENSE](LICENSE).
