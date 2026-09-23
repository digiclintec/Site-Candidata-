#!/bin/bash
# ==============================================================================
# SCRIPT DE INICIALIZAÇÃO DO SERVIDOR LOCALHOST (macOS / Linux)
# Portal Oficial Alexsandra Tomaz 2223
# Dê 2 cliques neste arquivo no Finder ou execute: ./iniciar_servidor.command
# ==============================================================================

# Navega até o diretório raiz deste projeto
cd "$(dirname "$0")"

echo ""
echo "======================================================================"
echo " 🚀 INICIANDO SERVIDOR LOCALHOST - ALEXSANDRA TOMAZ 2223"
echo "======================================================================"
echo " 🌐 Servidor Principal:   http://localhost:3001"
echo " 🌐 Servidor Secundário:  http://localhost:8080"
echo " 📰 Nova Aba de Notícias: http://localhost:3001#noticias"
echo "======================================================================"
echo ""


# Aguarda 1 segundo e abre o navegador automaticamente na porta 3001
(sleep 1 && open "http://localhost:3001" 2>/dev/null || open "http://localhost:8080" 2>/dev/null) &

# Inicia o servidor (Node.js ou Python 3 nativo)
if command -v node >/dev/null 2>&1; then
  echo "🚀 Servidor Node.js detectado! Iniciando..."
  node Back-end/server.js
elif command -v python3 >/dev/null 2>&1; then
  echo "🚀 Iniciando servidor nativo via Python 3..."
  python3 -m http.server 3001 -d Font-End
else
  echo "⚠️  Abrindo o site diretamente no seu navegador padrão..."
  open "Font-End/index.html"
fi
