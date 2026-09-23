#!/usr/bin/env node
/**
 * GERADOR DE PÁGINAS ESTÁTICAS DE NOTÍCIAS PARA COMPARTILHAMENTO
 * Gera páginas HTML com Open Graph e Twitter Cards completos para cada notícia,
 * garantindo que compartilhamentos em WhatsApp, WhatsApp Business, Stories e redes sociais
 * exibam a FOTO OFICIAL em alta resolução, título e resumo da notícia.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'Back-end', 'data', 'noticias.json');
const TARGET_DIRS = [
  path.join(ROOT, 'Font-End', 'noticia'),
  path.join(ROOT, 'noticia')
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateNewsPage(news) {
  const title = escapeHtml(news.titulo || 'Informativo Oficial');
  const excerpt = escapeHtml(news.resumo || 'Confira o comunicado oficial no portal.');
  const id = news.id;
  const imageRelPath = news.imagem || 'assets/images/noticias/inss-prova-vida.jpg';
  const canonicalUrl = `https://alexsandratomaz.com.br/noticia/${id}.html`;
  const absoluteImageUrl = `https://alexsandratomaz.com.br/${imageRelPath}`;
  const portalName = escapeHtml(news.portalNome || news.fonte || 'Portal Oficial');
  const authorName = escapeHtml(news.autor || news.fonte || 'Assessoria');
  const datePublished = news.data ? `${news.data}T07:00:00-03:00` : '2026-09-22T07:00:00-03:00';
  const categoryName = escapeHtml(news.categoriaNome || 'Eleições 2026');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Alexsandra Tomaz 2223</title>
  <meta name="description" content="${excerpt}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / WhatsApp / WhatsApp Business / Facebook / Instagram Stories -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Alexsandra Tomaz 2223 • Informativos Oficiais">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${absoluteImageUrl}">
  <meta property="og:image:secure_url" content="${absoluteImageUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675">
  <meta property="og:image:alt" content="${title}">
  <meta property="article:published_time" content="${datePublished}">
  <meta property="article:author" content="${authorName}">
  <meta property="article:section" content="${categoryName}">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@alexsandratomaz">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${excerpt}">
  <meta name="twitter:image" content="${absoluteImageUrl}">
  <meta name="twitter:image:alt" content="${title}">

  <!-- Redirecionamento Instantâneo para o Portal Oficial com Abertura Direta da Matéria -->
  <script>
    (function() {
      var isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');
      var path = window.location.pathname || '';
      var hasFontEnd = path.indexOf('/Font-End/') !== -1;
      var target = (isLocal && hasFontEnd) ? '/Font-End/index.html#noticia-${id}' : '/#noticia-${id}';
      try {
        window.location.replace(target);
      } catch (e) {
        window.location.href = target;
      }
    })();
  </script>
  <meta http-equiv="refresh" content="0;url=/#noticia-${id}">

  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Montserrat', 'Segoe UI', Roboto, sans-serif;
      background: #040d1a;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .preview-card {
      max-width: 560px;
      width: 100%;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 18px;
      padding: 24px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
      text-align: center;
    }
    .preview-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid #10b981;
      color: #34d399;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 14px;
    }
    .preview-img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 18px;
    }
    .preview-title {
      font-size: 1.25rem;
      line-height: 1.4;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 12px;
    }
    .preview-desc {
      color: #94a3b8;
      font-size: 0.92rem;
      line-height: 1.6;
      margin: 0 0 22px;
    }
    .preview-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #25d366;
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 9999px;
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
      transition: transform 0.2s, background 0.2s;
    }
    .preview-btn:hover {
      background: #1eb954;
      transform: scale(1.03);
    }
  </style>
</head>
<body>
  <div class="preview-card">
    <span class="preview-badge">${portalName}</span>
    <img src="/${imageRelPath}" alt="${title}" class="preview-img">
    <h1 class="preview-title">${title}</h1>
    <p class="preview-desc">${excerpt}</p>
    <a href="/#noticia-${id}" class="preview-btn">Acessar Notícia Completa no Portal</a>
  </div>
</body>
</html>
`;
}

function generateIndexDispatcher(newsList) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Notícias Oficiais • Alexsandra Tomaz 2223</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:title" content="Informativos Oficiais • Alexsandra Tomaz 2223">
  <meta property="og:description" content="Acompanhe as notícias oficiais da Justiça Eleitoral, TSE, TRE-ES e Gov.br.">
  <meta property="og:image" content="https://alexsandratomaz.com.br/assets/images/alexsandra-portrait.jpg">
  <script>
    (function() {
      var params = new URLSearchParams(window.location.search);
      var id = params.get('id');
      var isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');
      var base = isLocal ? '/Font-End/index.html' : '/';
      var target = id ? base + '#noticia-' + id : base + '#noticias';
      window.location.replace(target);
    })();
  </script>
</head>
<body style="background:#040d1a;color:#fff;font-family:sans-serif;text-align:center;padding:50px;">
  <h2>Redirecionando para as Notícias Oficiais...</h2>
</body>
</html>`;
}

function run() {
  console.log('📰 Gerando páginas estáticas de compartilhamento com Open Graph...');
  
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Arquivo ${DATA_FILE} não encontrado.`);
    process.exit(1);
  }

  const newsList = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  TARGET_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Gera página de cada notícia
    newsList.forEach(news => {
      const filePath = path.join(dir, `${news.id}.html`);
      const html = generateNewsPage(news);
      fs.writeFileSync(filePath, html, 'utf8');
    });

    // Gera index.html despachante na pasta noticia/
    fs.writeFileSync(path.join(dir, 'index.html'), generateIndexDispatcher(newsList), 'utf8');
  });

  console.log(`✅ ${newsList.length} páginas de notícias criadas em ${TARGET_DIRS.join(' e ')}`);
}

if (require.main === module) {
  run();
}

module.exports = { run };
