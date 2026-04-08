# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn start
```

## Backstage.io — O que você precisa saber

### O que é

Backstage é um portal de desenvolvedores. Pense nele como um "hub central" onde sua equipe encontra tudo: serviços, documentação, templates para criar novos projetos, APIs, e mais. Foi criado 
pelo Spotify e doado à CNCF.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 1. Software Catalog (o coração)

É o inventário de tudo que existe na sua organização. Cada item é uma Entity definida em YAML.

Os tipos principais (Kinds):

| Kind | O que é | Exemplo |
|---|---|---|
| Component | Um software (serviço, site, lib) | backstage-backend, payment-api |
| API | Uma interface que um Component expõe | REST, gRPC, GraphQL |
| System | Agrupamento de Components relacionados | payment-system (agrupa API + worker + frontend) |
| Domain | Agrupamento de Systems por área de negócio | finance, logistics |
| Resource | Infraestrutura que um Component depende | Banco de dados, bucket S3, fila SQS |
| User | Uma pessoa | joao.silva |
| Group | Um time/equipe | backend-team, platform |
| Template | Receita para criar novos projetos | "Criar novo microserviço Node.js" |
| Location | Ponteiro para onde encontrar outros YAMLs | URL de um repo Git |

Cada entidade vive em um arquivo catalog-info.yaml na raiz do repositório do serviço. O Backstage lê esse arquivo e registra no catálogo.

Exemplo mínimo:
yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: meu-servico
  description: API de pagamentos
  annotations:
    github.com/project-slug: minha-org/meu-servico
spec:
  type: service
  lifecycle: production
  owner: team-backend


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 2. Software Templates (Scaffolder)

Permite criar novos projetos a partir de templates. É como um create-react-app mas customizado pela sua empresa.

Um template define:
- **Parameters** → formulário que o dev preenche (nome do projeto, linguagem, etc.)
- **Steps** → ações executadas (copiar arquivos, criar repo no GitHub, registrar no catálogo)
- **Output** → links exibidos ao final (repo criado, link no catálogo)

Quando alguém clica "Create" no Backstage, preenche o formulário e o scaffolder executa os steps automaticamente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 3. TechDocs (documentação)

Documentação técnica gerada a partir de Markdown usando MkDocs. Cada Component pode ter docs linkados via annotation:

yaml
metadata:
  annotations:
    backstage.io/techdocs-ref: dir:.


O Backstage renderiza os Markdown como um site de docs dentro do portal. Precisa de um mkdocs.yml no repo.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 4. Plugins (extensibilidade)

Backstage é modular. Quase tudo é um plugin:
- O catálogo é um plugin
- TechDocs é um plugin
- Kubernetes dashboard é um plugin
- CI/CD (GitHub Actions, Jenkins) são plugins

Existem 2 tipos:
- **Frontend plugins** → componentes React que aparecem na UI
- **Backend plugins** → serviços Node.js que rodam no servidor

Plugins ficam em packages/app (frontend) e packages/backend (backend).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 5. Autenticação e Permissões

Auth Providers — como os usuários fazem login:
- GitHub, Google, Okta, Azure AD, GitLab, etc.
- guest é só para desenvolvimento/demo (o que estamos usando agora)

Permission Framework — controle de acesso:
- Define quem pode ver/editar o quê
- Usa policies (regras) que avaliam cada requisição
- allow-all-policy = todo mundo pode tudo (nosso caso atual)
- Em produção real, você cria policies customizadas (ex: só o owner pode deletar)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 6. Estrutura do código

backstage/
├── app-config.yaml              # Config principal (dev)
├── app-config.production.yaml   # Config de produção
├── packages/
│   ├── app/                     # Frontend (React)
│   │   └── src/App.tsx          # Onde você monta as rotas e plugins do frontend
│   └── backend/                 # Backend (Node.js)
│       └── src/index.ts         # Onde você registra plugins do backend
└── plugins/                     # Seus plugins customizados


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 7. Configuração (app-config.yaml)

Tudo é configurado via YAML. Os principais blocos:

| Bloco | O que configura |
|---|---|
| app | URL do frontend, título |
| backend | URL do backend, banco de dados, CORS |
| auth | Providers de autenticação |
| catalog | Locais onde buscar entidades (repos, URLs) |
| integrations | Conexões com GitHub, GitLab, etc. |
| techdocs | Como gerar/publicar docs |
| permission | Habilitar/desabilitar controle de acesso |

Variáveis de ambiente são usadas com ${VAR_NAME}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 8. Conceitos-chave para memorizar

| Conceito | Equivalente mental |
|---|---|
| Entity | Um registro no catálogo (qualquer Kind) |
| Kind | O tipo da entity (Component, API, User...) |
| Owner | Quem é responsável (sempre um Group ou User) |
| Lifecycle | Estágio do componente (experimental, production, deprecated) |
| Annotation | Metadados que plugins leem (ex: link do GitHub, ref do TechDocs) |
| Spec | A parte específica de cada Kind (type, owner, system, etc.) |
| Relation | Conexão entre entities (Component → API, System → Component) |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 9. Fluxo típico de uso

1. Time de plataforma configura o Backstage e cria templates
2. Dev quer criar um novo serviço → vai no Backstage → "Create" → escolhe template → preenche formulário
3. Backstage cria o repo, CI/CD, registra no catálogo automaticamente
4. O catalog-info.yaml no repo mantém o catálogo atualizado
5. Outros devs encontram o serviço no catálogo, veem docs, APIs, owner, status do CI/CD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


### 10. O que NÃO é o Backstage

- Não é um CI/CD (ele mostra status do CI/CD via plugins)
- Não é um monitoramento (ele integra com Grafana, Datadog via plugins)
- Não é um API Gateway (ele documenta APIs, não roteia tráfego)
- Não roda seus serviços (ele é o portal que organiza informações sobre eles)
