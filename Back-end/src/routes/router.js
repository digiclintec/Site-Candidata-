/**
 * ROTEADOR CENTRAL (router.js)
 * Gerencia o despacho de rotas da API e arquivos estáticos
 */

const { createSupporter, listSupporters } = require('../controllers/supportersController');
const { getStats, getHealth } = require('../controllers/statsController');
const { listNews, getNewsById } = require('../controllers/newsController');
const { serveStatic } = require('../middlewares/staticServer');
const { syncCampaignAssets } = require('../utils/fileStorage');

function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // --------------------------------------------------------------------------
  // ROTAS DA API
  // --------------------------------------------------------------------------
  if (pathname.startsWith('/api/')) {
    // GET /api/sync-assets -> Sincroniza fotos reais da campanha para assets/images
    if (method === 'GET' && pathname === '/api/sync-assets') {
      const ok = syncCampaignAssets();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ 
        sucesso: ok, 
        mensagem: 'Fotos reais de material de campanha sincronizadas com sucesso para Font-End/assets/images/' 
      }));
      return;
    }

    // POST /api/apoiadores
    if (method === 'POST' && pathname === '/api/apoiadores') {
      return createSupporter(req, res);
    }

    // GET /api/apoiadores
    if (method === 'GET' && pathname === '/api/apoiadores') {
      return listSupporters(req, res);
    }

    // GET /api/stats
    if (method === 'GET' && pathname === '/api/stats') {
      return getStats(req, res);
    }

    // GET /api/health
    if (method === 'GET' && pathname === '/api/health') {
      return getHealth(req, res);
    }

    // GET /api/noticias
    if (method === 'GET' && pathname === '/api/noticias') {
      return listNews(req, res);
    }

    // GET /api/noticias/:id
    if (method === 'GET' && pathname.startsWith('/api/noticias/')) {
      const idOrSlug = pathname.replace('/api/noticias/', '').trim();
      return getNewsById(req, res, idOrSlug);
    }

    // Rota /api/* não encontrada
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ erro: `Rota de API "${pathname}" não encontrada.` }));
    return;
  }

  // --------------------------------------------------------------------------
  // ROTAS DE ARQUIVOS ESTÁTICOS (Front-End)
  // --------------------------------------------------------------------------
  serveStatic(req, res, pathname);
}

module.exports = {
  handleRequest
};
