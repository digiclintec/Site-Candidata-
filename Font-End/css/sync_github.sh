#!/bin/bash
# ========================================================
#   Sincronizando alterações com o GitHub (macOS / Linux)
# ========================================================
echo "========================================================"
echo "  Sincronizando alterações com o GitHub (Site-Candidata-)"
echo "========================================================"
echo ""

git status

echo ""
echo "Adicionando arquivos modificados..."
git add .

echo ""
echo "Criando commit com as últimas atualizações..."
git commit -m "fix: cancela reabertura de videos no reload e reseta 100% para tela inicial"

echo ""
echo "Enviando para o repositório remoto (origin main)..."
git push origin main

echo ""
echo "========================================================"
echo "  Processo finalizado com sucesso!"
echo "========================================================"
