# ${{ values.projeto }} — OpenShift Pipeline Setup

Setup do projeto **${{ values.projeto }}** no OpenShift com pipeline Tekton.

## Dados do Projeto

| Campo | Valor |
|---|---|
| Ambiente | `${{ values.ambiente }}` |
| Artefato | `${{ values.artefato_name }}` |
| Projeto (namespace) | `${{ values.projeto }}` |
| Repositório | `https://${{ values.repositorio }}/${{ values.artefato_name }}` |
| Cluster | `${{ values.cluster }}` |

## Setup Rápido

```bash
# 1. Faça login no cluster
oc login https://api.${{ values.cluster }}:6443

# 2. Execute o script de setup
chmod +x setup.sh
./setup.sh
```

## Setup Manual (passo a passo)

```bash
# Selecionar projeto
oc project ${{ values.projeto }}

# Aplicar permissões
oc apply -f manifests/role-binding.yaml -n ${{ values.projeto }}

# Criar secret Git
oc apply -f manifests/git-auth-secret.yaml -n ${{ values.projeto }}

# Linkar secret com pipeline
oc secrets link pipeline git-auth-secret-${{ values.artefato_name }} --for=pull,mount -n ${{ values.projeto }}
{% if values.ambiente != "prod" %}
# Aplicar triggers (webhook)
oc apply -f manifests/trigger.yaml -n ${{ values.projeto }}
{% endif %}
```
{% if values.ambiente == "prod" %}
## Pipeline (PROD)

Em produção, a pipeline é executada **manualmente**.

**Console OpenShift:**
```
https://console-openshift-console.apps.${{ values.cluster }}/pipelines/ns/${{ values.projeto }}
```

**Parâmetros:**
| Campo | Valor |
|---|---|
| IMAGE | `image-registry.openshift-image-registry.svc:5000/${{ values.projeto }}/app` |
| GIT REPO | `https://${{ values.repositorio }}/${{ values.artefato_name }}.git` |
| BRANCH | `main` |
| Volume | Volume Claim Template, 500 MB |

**Ou execute via CLI:**
```bash
oc create -f manifests/pipeline-run.yaml -n ${{ values.projeto }}
```
{% elif values.ambiente == "hml" %}
## Webhook (HML)

Configure o webhook no repositório Git:

| Campo | Valor |
|---|---|
| URL | `http://el-${{ values.projeto }}.apps.${{ values.cluster }}` |
| Evento | Push Events |
| Filtro | Regular Expression: `^homolog$` |
| SSL | ⚠️ **Desmarcar** verificação HTTPS/SSL |
{% else %}
## Webhook (DEV)

Configure o webhook no repositório Git:

| Campo | Valor |
|---|---|
| URL | `http://el-${{ values.projeto }}.apps.${{ values.cluster }}` |
| Evento | Push Events |
| Filtro | Regular Expression: `^develop$` |
| SSL | ⚠️ **Desmarcar** verificação HTTPS/SSL |
{% endif %}

## Arquivos

```
├── setup.sh                          # Script automatizado (todos os oc commands)
├── manifests/
│   ├── git-auth-secret.yaml          # Secret de autenticação Git para Tekton
│   ├── role-binding.yaml             # Permissão registry-editor para pipeline
│   ├── app-secrets.yaml              # Secrets da aplicação (variáveis de ambiente)
{% if values.ambiente == "prod" %}│   └── pipeline-run.yaml             # PipelineRun para execução manual
{% else %}│   └── trigger.yaml                  # EventListener + TriggerTemplate (webhook)
{% endif %}└── README.md
```
