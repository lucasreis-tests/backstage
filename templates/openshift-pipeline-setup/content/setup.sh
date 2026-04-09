#!/bin/bash
#
# Setup automático do projeto ${{ values.projeto }} no OpenShift
# Gerado pelo Backstage — substitui o script manual
#
set -euo pipefail

AMBIENTE="${{ values.ambiente }}"
ARTEFATONAME="${{ values.artefato_name }}"
PROJETO="${{ values.projeto }}"
REPOSITORIO="${{ values.repositorio }}/$ARTEFATONAME"
CLUSTER="${{ values.cluster }}"

echo "============================================"
echo "  OpenShift Pipeline Setup"
echo "============================================"
echo "AMBIENTE:     $AMBIENTE"
echo "PROJETO:      $PROJETO"
echo "ARTEFATO:     $ARTEFATONAME"
echo "REPOSITÓRIO:  https://$REPOSITORIO"
echo "CLUSTER:      $CLUSTER"
echo "============================================"
echo ""

# Verificar login
echo "🔍 Verificando login no OpenShift..."
oc status || { echo "❌ Você não está logado. Execute: oc login"; exit 1; }

echo ""
echo "📁 Selecionando projeto $PROJETO..."
oc project "$PROJETO"

echo ""
echo "🔑 Adicionando permissão registry-editor para pipeline..."
oc apply -f manifests/role-binding.yaml -n "$PROJETO"

echo ""
echo "🔐 Criando secret de autenticação Git..."
oc apply -f manifests/git-auth-secret.yaml -n "$PROJETO"

echo ""
echo "🔗 Fazendo link da secret com service account pipeline..."
oc secrets link pipeline "git-auth-secret-$ARTEFATONAME" --for=pull,mount -n "$PROJETO"

# Secrets de ambiente (se existir o arquivo)
if [ -f manifests/app-secrets.yaml ]; then
  echo ""
  echo "🔐 Aplicando secrets do ambiente..."
  oc apply -f manifests/app-secrets.yaml -n "$PROJETO"
fi

echo ""
echo "📋 Rotas do projeto:"
oc get route -n "$PROJETO" 2>/dev/null || echo "   (nenhuma rota encontrada)"

echo ""
echo "============================================"
{% if values.ambiente == "prod" %}
echo "📌 Ambiente PRODUÇÃO detectado."
echo ""
echo "➡️  Acesse a console para criar a pipeline manualmente:"
echo "   https://console-openshift-console.apps.$CLUSTER/pipelines/ns/$PROJETO"
echo ""
echo "   Parâmetros da pipeline:"
echo "   IMAGE:    image-registry.openshift-image-registry.svc:5000/$PROJETO/app"
echo "   GIT REPO: https://$REPOSITORIO.git"
echo "   BRANCH:   main"
echo "   Usar VOLUME CLAIM TEMPLATE com 500 MB"
{% elif values.ambiente == "hml" %}
echo "📌 Ambiente HOMOLOGAÇÃO detectado."
echo ""
echo "➡️  Configure o Webhook no repositório:"
echo "   URL: http://el-$PROJETO.apps.$CLUSTER"
echo "   Marcar PUSH EVENTS → REGULAR EXPRESSION"
echo "   Expressão: ^homolog$"
echo "   ⚠️  Desmarcar verificação HTTPS/SSL"
{% else %}
echo "📌 Ambiente DESENVOLVIMENTO detectado."
echo ""
echo "➡️  Configure o Webhook no repositório:"
echo "   URL: http://el-$PROJETO.apps.$CLUSTER"
echo "   Marcar PUSH EVENTS → REGULAR EXPRESSION"
echo "   Expressão: ^develop$"
echo "   ⚠️  Desmarcar verificação HTTPS/SSL"
{% endif %}
echo "============================================"
echo ""
echo "✅ Setup concluído!"
