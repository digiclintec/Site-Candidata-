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

# Sincroniza fotos oficiais da Justiça Eleitoral e Gov.br
BRAIN_DIR="/Users/rodrigo/.gemini/antigravity-ide/brain/d8aafe0c-18ae-47e3-a2c6-3ec1d80dbc45"
TARGET_DIR="Font-End/assets/images/noticias"
mkdir -p "$TARGET_DIR" 2>/dev/null

cp -f "$BRAIN_DIR/urna_tela_branca_1790075616127.jpg" "$TARGET_DIR/inss-prova-vida.jpg" 2>/dev/null || true
cp -f "$BRAIN_DIR/tse_plenario_1790074134317.jpg" "$TARGET_DIR/tse-plenario.jpg" 2>/dev/null || true
cp -f "$BRAIN_DIR/etitulo_app_oficial_1790074162191.jpg" "$TARGET_DIR/etitulo-app.jpg" 2>/dev/null || true
cp -f "$BRAIN_DIR/tse_fato_boato_1790074192576.jpg" "$TARGET_DIR/tse-fato-boato.jpg" 2>/dev/null || true
cp -f "$BRAIN_DIR/tse_ia_regras_1790074227249.jpg" "$TARGET_DIR/tse-ia-regras.jpg" 2>/dev/null || true
cp -f "$BRAIN_DIR/mesarios_tre_es_1790074264536.jpg" "$TARGET_DIR/mesarios-tre-es.jpg" 2>/dev/null || true
cp -f "$BRAIN_DIR/tse_spce_contas_1790074307411.jpg" "$TARGET_DIR/tse-spce-contas.jpg" 2>/dev/null || true

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
