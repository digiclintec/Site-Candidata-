/**
 * CONTROLADOR DE NOTÍCIAS ELEITORAIS (newsController.js)
 * Gerencia a listagem e filtros de notícias da Justiça Eleitoral (TSE / TRE-ES)
 */

const config = require('../config/env');
const { readJSON } = require('../utils/fileStorage');

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

/**
 * GET /api/noticias
 * Retorna as notícias eleitorais cadastradas, com suporte a filtros por categoria e busca
 */
function listNews(req, res) {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const categoria = parsedUrl.searchParams.get('categoria');
    const portal = parsedUrl.searchParams.get('portal');
    const query = (parsedUrl.searchParams.get('q') || '').toLowerCase().trim();

    let noticias = readJSON(config.paths.noticiasFile, []);

    // Filtro por portal oficial (se fornecido)
    if (portal && portal !== 'todos') {
      noticias = noticias.filter(n => n.portal === portal);
    }

    // Filtro por categoria (se fornecido)
    if (categoria && categoria !== 'todas') {
      noticias = noticias.filter(n => n.categoria === categoria);
    }

    // Filtro por busca textual (título, resumo ou pontos chave)
    if (query) {
      noticias = noticias.filter(n => {
        const inTitulo = (n.titulo || '').toLowerCase().includes(query);
        const inResumo = (n.resumo || '').toLowerCase().includes(query);
        const inAutor = (n.autor || '').toLowerCase().includes(query);
        const inCatNome = (n.categoriaNome || '').toLowerCase().includes(query);
        const inPontos = Array.isArray(n.pontosChave) && n.pontosChave.some(p => p.toLowerCase().includes(query));
        return inTitulo || inResumo || inAutor || inPontos || inCatNome;
      });
    }

    sendJSON(res, 200, {
      sucesso: true,
      total: noticias.length,
      noticias
    });
  } catch (err) {
    console.error('[NEWS-CONTROLLER] Erro ao listar notícias:', err.message);
    sendJSON(res, 500, {
      sucesso: false,
      erro: 'Erro interno ao processar notícias eleitorais.'
    });
  }
}

/**
 * GET /api/noticias/:id
 * Retorna uma notícia específica por ID ou slug
 */
function getNewsById(req, res, idOrSlug) {
  try {
    const noticias = readJSON(config.paths.noticiasFile, []);
    const item = noticias.find(n => n.id === idOrSlug || n.slug === idOrSlug);

    if (!item) {
      return sendJSON(res, 404, {
        sucesso: false,
        erro: 'Notícia eleitoral não encontrada.'
      });
    }

    sendJSON(res, 200, {
      sucesso: true,
      noticia: item
    });
  } catch (err) {
    sendJSON(res, 500, {
      sucesso: false,
      erro: 'Erro ao buscar detalhe da notícia.'
    });
  }
}

module.exports = {
  listNews,
  getNewsById
};
