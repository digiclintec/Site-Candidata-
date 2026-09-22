/**
 * SERVIDOR DE ARQUIVOS ESTÁTICOS (staticServer.js)
 * Serve com segurança os arquivos do Front-End
 */

const fs = require('fs');
const path = require('path');
const config = require('../config/env');
const { getMimeType } = require('../utils/mimeTypes');

function serveStatic(req, res, pathname) {
  const frontendDir = config.paths.frontendDir;
  const safePathname = pathname === '/' ? '/index.html' : pathname;

  // Prevenção contra Directory Traversal
  const normalizedPath = path.normalize(safePathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(frontendDir, normalizedPath);

  // Garantir que o caminho solicitado permanece dentro de frontendDir
  if (!filePath.startsWith(frontendDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Acesso proibido.');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback para fotos oficiais em brainDir caso ainda não copiadas para frontendDir
      if (pathname.startsWith('/assets/images/noticias/')) {
        const fileName = path.basename(pathname);
        const brainDir = '/Users/rodrigo/.gemini/antigravity-ide/brain/d8aafe0c-18ae-47e3-a2c6-3ec1d80dbc45';
        const brainMap = {
          'inss-prova-vida.jpg': 'urna_tela_branca_1790075616127.jpg',
          'tse-plenario.jpg': 'tse_plenario_1790074134317.jpg',
          'etitulo-app.jpg': 'etitulo_app_oficial_1790074162191.jpg',
          'tse-fato-boato.jpg': 'tse_fato_boato_1790074192576.jpg',
          'tse-ia-regras.jpg': 'tse_ia_regras_1790074227249.jpg',
          'mesarios-tre-es.jpg': 'mesarios_tre_es_1790074264536.jpg',
          'tse-spce-contas.jpg': 'tse_spce_contas_1790074307411.jpg'
        };
        const mappedName = brainMap[fileName] || fileName;
        const brainFile = path.join(brainDir, mappedName);
        if (fs.existsSync(brainFile)) {
          // Copia preventivamente para o frontendDir para as próximas requisições
          try {
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.copyFileSync(brainFile, filePath);
          } catch (e) {}

          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          fs.createReadStream(brainFile).pipe(res);
          return;
        }
      }

      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Recurso não encontrado.');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = getMimeType(ext);

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

module.exports = {
  serveStatic
};
