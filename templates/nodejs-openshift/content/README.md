# ${{ values.name }}

${{ values.description }}

## Desenvolvimento local

```bash
npm install
npm run dev
# http://localhost:${{ values.port }}
```

## API

- `GET /healthcheck` — Health check
- `GET /api` — Info do serviço
- `GET /api/items` — Listar items
- `POST /api/items` — Criar item (`{ "name": "..." }`)

## Docker

```bash
docker build -t ${{ values.name }} .
docker run -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```

## Deploy no OpenShift via ArgoCD

```bash
# 1. Aplicar as ArgoCD Applications
oc apply -f deploy/argocd/dev.yaml
oc apply -f deploy/argocd/prod.yaml

# 2. Verificar status
argocd app list
argocd app get ${{ values.name }}-dev
argocd app get ${{ values.name }}-prod
```

### Estrutura de deploy

```
deploy/
├── argocd/
│   ├── dev.yaml              # ArgoCD Application DEV (sync manual)
│   └── prod.yaml             # ArgoCD Application PROD (auto sync + self-heal)
├── base/
│   ├── kustomization.yaml    # Manifests comuns
│   ├── deployment.yaml
│   ├── service.yaml
│   └── configmap.yaml
└── overlays/
    ├── dev/                   # 1 réplica, debug, menos recursos
    └── prod/                  # 3 réplicas, HPA, PDB, mais recursos
```

### Testar manifests localmente

```bash
kubectl kustomize deploy/overlays/dev
kubectl kustomize deploy/overlays/prod
```
