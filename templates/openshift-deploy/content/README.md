# ${{ values.name }} — OpenShift Deploy

${{ values.description }}

## Estrutura

```
manifests/
├── deployment.yaml      # Pods, réplicas, health checks, recursos
├── service.yaml         # Exposição interna (ClusterIP)
├── route.yaml           # URL pública (OpenShift Route)
├── configmap.yaml       # Variáveis de ambiente
├── buildconfig.yaml     # Build S2I (Source-to-Image)
├── imagestream.yaml     # Registry interno do OpenShift
└── tekton-pipeline.yaml # Pipeline CI/CD (OpenShift Pipelines)
```

## Deploy rápido

```bash
# Login no cluster
oc login <CLUSTER_URL>

# Criar o projeto (namespace)
oc new-project ${{ values.namespace }}

# Aplicar todos os manifests
oc apply -f manifests/

# Acompanhar o build S2I
oc logs -f bc/${{ values.name }}

# Ver a URL da aplicação
oc get route ${{ values.name }} -o jsonpath='{.spec.host}'
```

## Pipeline Tekton

```bash
# Instalar a pipeline
oc apply -f manifests/tekton-pipeline.yaml

# Executar manualmente
tkn pipeline start ${{ values.name }}-pipeline -n ${{ values.namespace }}

# Ver execuções
tkn pipelinerun list -n ${{ values.namespace }}
```

## Configuração

| Parâmetro | Valor |
|---|---|
| Namespace | `${{ values.namespace }}` |
| Réplicas | ${{ values.replicas }} |
| Porta | ${{ values.port }} |
| Imagem Base | `${{ values.image_base }}` |
| CPU | ${{ values.cpu_request }} / ${{ values.cpu_limit }} |
| Memória | ${{ values.memory_request }} / ${{ values.memory_limit }} |
