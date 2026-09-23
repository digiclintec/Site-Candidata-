#!/bin/bash
# ==============================================================================
# SCRIPT DE INICIALIZAÇÃO DO SERVIDOR LOCALHOST
# ==============================================================================

cd "$(dirname "$0")"

echo ""
echo "🚀 Iniciando servidor local em http://localhost:3001 ..."
echo "Pressione Ctrl+C para encerrar."
echo ""


(sleep 1 && open "http://localhost:3001" 2>/dev/null || open "http://localhost:8080" 2>/dev/null) &

if command -v node >/dev/null 2>&1; then
  node Back-end/server.js
elif command -v python3 >/dev/null 2>&1; then
  python3 -m http.server 3001 -d Font-End
else
  open "Font-End/index.html"
fi
