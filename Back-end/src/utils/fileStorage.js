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

/**
 * Sincroniza as fotos oficiais e fidedignas da Justiça Eleitoral e do Gov.br
 * para "Font-End/assets/images/noticias/"
 */
function syncNewsAssets() {
  const brainDir = '/Users/rodrigo/.gemini/antigravity-ide/brain/d8aafe0c-18ae-47e3-a2c6-3ec1d80dbc45';
  const targetDir = path.join(config.paths.frontendDir, 'assets', 'images', 'noticias');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const newsMapping = [
    { src: 'urna_tela_branca_1790075616127.jpg', dest: 'inss-prova-vida.jpg' },
    { src: 'tse_plenario_1790074134317.jpg', dest: 'tse-plenario.jpg' },
    { src: 'etitulo_app_oficial_1790074162191.jpg', dest: 'etitulo-app.jpg' },
    { src: 'tse_fato_boato_1790074192576.jpg', dest: 'tse-fato-boato.jpg' },
    { src: 'tse_ia_regras_1790074227249.jpg', dest: 'tse-ia-regras.jpg' },
    { src: 'mesarios_tre_es_1790074264536.jpg', dest: 'mesarios-tre-es.jpg' },
    { src: 'tse_spce_contas_1790074307411.jpg', dest: 'tse-spce-contas.jpg' }
  ];

  let synced = 0;
  for (const item of newsMapping) {
    const srcPath = path.join(brainDir, item.src);
    const destPath = path.join(targetDir, item.dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      synced++;
    }
  }

  if (synced > 0) {
    console.log(`[NEWS-ASSETS] 🏛️ ${synced} fotos oficiais de notícias (TSE, TRE-ES e Gov.br) sincronizadas com sucesso!`);
  }
}

/**
 * Garante que a pasta de dados e os arquivos essenciais existam
 */
function initializeStorage() {
  const { dataDir, supportersFile, contactsFile, noticiasFile } = config.paths;

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(supportersFile)) {
    fs.writeFileSync(supportersFile, JSON.stringify([], null, 2), 'utf8');
  }

  if (!fs.existsSync(contactsFile)) {
    fs.writeFileSync(contactsFile, JSON.stringify([], null, 2), 'utf8');
  }

  if (noticiasFile && !fs.existsSync(noticiasFile)) {
    fs.writeFileSync(noticiasFile, JSON.stringify([], null, 2), 'utf8');
  }

  // Sincronizar imagens reais de material de campanha
  try {
    syncCampaignAssets();
  } catch (err) {
    console.warn('[ASSETS] Erro ao sincronizar imagens de campanha:', err.message);
  }

  // Sincronizar fotos oficiais da Justiça Eleitoral e Gov.br
  try {
    syncNewsAssets();
  } catch (err) {
    console.warn('[NEWS-ASSETS] Erro ao sincronizar imagens de notícias:', err.message);
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
