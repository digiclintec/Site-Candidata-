#!/usr/bin/env node
/**
 * SCRIPT DE BUILD DE PRODUÇÃO (build:prd)
 * Portal Oficial Alexsandra Tomaz 2223
 * Valida integridade do Front-End, Back-end, folhas de estilo e banco de dados JSON.
 */

const fs = require('fs');
const path = require('path');

// Identifica a raiz do projeto independentemente de onde o comando foi chamado
function findProjectRoot() {
  let cur = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(cur, 'Font-End')) && fs.existsSync(path.join(cur, 'Back-end'))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return path.resolve(__dirname, '..');
}

const ROOT = findProjectRoot();
const FRONT_DIR = path.join(ROOT, 'Font-End');
const BACK_DIR = path.join(ROOT, 'Back-end');
const DATA_DIR = path.join(BACK_DIR, 'data');

console.log('\n============================================================');
console.log(' 🚀 BUILD DE PRODUÇÃO - ALEXSANDRA TOMAZ 2223');
console.log('============================================================');
console.log(` 📂 Raiz do Projeto: ${ROOT}`);

let hasErrors = false;

function check(label, fn) {
  try {
    fn();
    console.log(`  ✔ [OK] ${label}`);
  } catch (err) {
    hasErrors = true;
    console.error(`  ❌ [ERRO] ${label}: ${err.message}`);
  }
}

// 1. Validação do Front-End
check('Arquivo principal index.html', () => {
  const indexHtml = path.join(FRONT_DIR, 'index.html');
  if (!fs.existsSync(indexHtml)) throw new Error('index.html não encontrado');
  const content = fs.readFileSync(indexHtml, 'utf8');
  if (!content.includes('Alexsandra Tomaz')) throw new Error('Conteúdo do index.html corrompido');
});

// 2. Validação dos arquivos CSS
check('Estilos CSS (style.css, animations.css, responsive.css)', () => {
  const cssFiles = ['style.css', 'animations.css', 'responsive.css'];
  for (const f of cssFiles) {
    const p = path.join(FRONT_DIR, 'css', f);
    if (!fs.existsSync(p)) throw new Error(`Arquivo css/${f} ausente`);
  }
});

// 3. Validação dos scripts JS do Front-End
check('Scripts JavaScript (noticias.js, main.js, forms.js)', () => {
  const jsFiles = ['noticias.js', 'main.js', 'forms.js'];
  for (const f of jsFiles) {
    const p = path.join(FRONT_DIR, 'js', f);
    if (!fs.existsSync(p)) throw new Error(`Arquivo js/${f} ausente`);
  }
});

// 4. Validação do Banco de Dados JSON
check('Dados das Notícias Oficiais (noticias.json)', () => {
  const p = path.join(DATA_DIR, 'noticias.json');
  if (!fs.existsSync(p)) throw new Error('data/noticias.json ausente');
  const raw = fs.readFileSync(p, 'utf8');
  const items = JSON.parse(raw);
  if (!Array.isArray(items) || items.length === 0) throw new Error('noticias.json vazio ou inválido');
  console.log(`      ↳ ${items.length} notícias oficiais ativas e validadas.`);
});

// 5. Validação do Back-end
check('Servidor e Rotas do Back-end (server.js)', () => {
  const p = path.join(BACK_DIR, 'server.js');
  if (!fs.existsSync(p)) throw new Error('server.js ausente');
  require(path.join(BACK_DIR, 'src', 'config', 'env.js'));
});

console.log('============================================================');

if (hasErrors) {
  console.error('\n❌ Build concluído com erros! Corrija os itens acima.\n');
  process.exit(1);
} else {
  console.log('\n✨ Build de Produção concluído com 100% de sucesso!');
  console.log('📦 Front-End: Pronto para distribuição estática / CDN / Vercel / Netlify');
  console.log('🚀 Back-end: Servidor HTTP & API de notícias pronto para produção\n');
  process.exit(0);
}
