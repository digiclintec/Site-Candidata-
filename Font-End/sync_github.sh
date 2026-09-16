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
git commit -m "fix: retorno automatico a tela inicial ao atualizar pagina e correcao hero iphone"

echo ""
echo "Enviando para o repositório remoto (origin main)..."
git push origin main

echo ""
echo "========================================================"
echo "  Processo finalizado com sucesso!"
echo "========================================================"
