# ${{ values.name }} — GitOps com ArgoCD

${{ values.description }}

## Estrutura

```
├── argocd/
│   ├── dev.yaml          # ArgoCD Application — ambiente DEV
│   └── prod.yaml         # ArgoCD Application — ambiente PROD
├── base/
│   ├── kustomization.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── configmap.yaml
└── overlays/
    ├── dev/
    │   ├── kustomization.yaml
    │   ├── replicas.yaml
    │   └── configmap.yaml
    └── prod/
        ├── kustomization.yaml
        ├── replicas.yaml
        ├── configmap.yaml
        ├── hpa.yaml
        └── pdb.yaml
```

## Deploy

```bash
# 1. Aplicar as Applications no ArgoCD
oc apply -f argocd/dev.yaml
oc apply -f argocd/prod.yaml

# 2. Verificar no ArgoCD
argocd app list
argocd app get ${{ values.name }}-dev
argocd app get ${{ values.name }}-prod

# 3. Sync manual (se necessário)
argocd app sync ${{ values.name }}-dev
argocd app sync ${{ values.name }}-prod
```

## Testar localmente com Kustomize

```bash
# Ver manifests DEV
kubectl kustomize overlays/dev

# Ver manifests PROD
kubectl kustomize overlays/prod
```
