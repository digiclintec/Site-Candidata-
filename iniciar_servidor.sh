#!/bin/bash
# ==============================================================================
# SCRIPT DE INICIALIZAÇÃO DO SERVIDOR LOCALHOST
# ==============================================================================

cd "$(dirname "$0")"

echo ""
echo "🚀 Iniciando servidor local em http://localhost:3001 ..."
echo "Pressione Ctrl+C para encerrar."
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

(sleep 1 && open "http://localhost:3001" 2>/dev/null || open "http://localhost:8080" 2>/dev/null) &

if command -v node >/dev/null 2>&1; then
  node Back-end/server.js
elif command -v python3 >/dev/null 2>&1; then
  python3 -m http.server 3001 -d Font-End
else
  open "Font-End/index.html"
fi
