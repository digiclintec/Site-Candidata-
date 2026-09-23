/**
 * UTILITÁRIO DE PERSISTÊNCIA EM ARQUIVOS JSON E SINCRONIZAÇÃO DE ASSETS (fileStorage.js)
 * Fornece leitura, escrita segura e sincronização automática de mídias de campanha
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/env');

/**
 * Sincroniza as fotos reais da pasta "material de campanha" para "Font-End/assets/images"
 * substituindo as imagens genéricas/placeholders antigas.
 */
function syncCampaignAssets() {
  const projectRoot = path.resolve(config.paths.rootDir, '..');
  const campaignDir = path.join(projectRoot, 'material de campanha');
  const targetDir = path.join(config.paths.frontendDir, 'assets', 'images');

  if (!fs.existsSync(campaignDir) || !fs.existsSync(targetDir)) {
    console.warn('[ASSETS] Diretório "material de campanha" ou "assets/images" não encontrado.');
    return false;
  }

  // Mapeamento estratégico das fotos reais oficiais da campanha
  const mapping = [
    // 1. Retrato Oficial (Hero e Avatar - Alexsandra de blazer verde)
    { src: 'WhatsApp Image 2026-09-12 at 10.29.52.jpeg', dest: 'alexsandra-portrait.jpg' },
    // 2. Foto de Ação / História Real (No volante da cabine do caminhão)
    { src: 'WhatsApp Image 2026-09-12 at 10.29.49 (1).jpeg', dest: 'alexsandra-action.jpg' },
    // 3. Santinho Digital Oficial (Quem é Alexsandra Tomaz 2223)
    { src: 'WhatsApp Image 2026-09-12 at 10.29.49.jpeg', dest: 'alexsandra-flyer.jpg' },
    // 4. Banner Panorâmico Oficial (Terceira Ponte / Vitória ES + Caminhão)
    { src: 'WhatsApp Image 2026-09-12 at 10.29.53.jpeg', dest: 'alexsandra-banner-wide.jpg' },
    // 5. Foto Discurso com Microfone (Por que entrei na política?)
    { src: 'WhatsApp Image 2026-09-12 at 10.29.50.jpeg', dest: 'alexsandra-speech.jpg' }
  ];

  let copied = 0;
  for (const item of mapping) {
    const srcPath = path.join(campaignDir, item.src);
    const destPath = path.join(targetDir, item.dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      copied++;
      console.log(`[ASSETS] ✅ Substituída foto real: ${item.dest}`);
    }
  }

  // Copia todo o lote original de 11 fotos para Font-End/assets/images/campanha/
  const allCampanhaDir = path.join(targetDir, 'campanha');
  if (!fs.existsSync(allCampanhaDir)) {
    fs.mkdirSync(allCampanhaDir, { recursive: true });
  }

  const files = fs.readdirSync(campaignDir);
  for (const file of files) {
    const srcFile = path.join(campaignDir, file);
    const destFile = path.join(allCampanhaDir, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
    }
  }

  console.log(`[ASSETS] 🎉 Sincronização concluída! ${copied} fotos principais aplicadas e ${files.length} mídias arquivadas em assets/images/campanha/`);
  return true;
}

  // Sincronizar imagens reais de material de campanha
  try {
    syncCampaignAssets();
  } catch (err) {
    console.warn('[ASSETS] Erro ao sincronizar imagens de campanha:', err.message);
  }
}

/**
 * Lê e faz parse seguro de um arquivo JSON
 */
function readJSON(filePath, defaultValue = []) {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`[STORAGE] Erro ao ler ${filePath}:`, err.message);
    return defaultValue;
  }
}

/**
 * Grava dados formatados em JSON no arquivo
 */
function writeJSON(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`[STORAGE] Erro ao gravar ${filePath}:`, err.message);
    return false;
  }
}

module.exports = {
  initializeStorage,
  syncCampaignAssets,
  readJSON,
  writeJSON
};
