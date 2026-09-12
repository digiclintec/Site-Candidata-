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
