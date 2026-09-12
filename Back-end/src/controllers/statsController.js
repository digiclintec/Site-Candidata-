/**
 * CONTROLADOR DE ESTATÍSTICAS E STATUS (statsController.js)
 */

const config = require('../config/env');
const { readJSON } = require('../utils/fileStorage');

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

/**
 * GET /api/stats
 * Retorna estatísticas agregadas de apoiadores
 */
function getStats(req, res) {
  const apoiadores = readJSON(config.paths.supportersFile, []);

  // Extrai cidades únicas não vazias
  const cidades = [...new Set(apoiadores.map(a => a.cidade).filter(Boolean))];

  // Contagem de modalidades de ajuda
  const modalidadesCount = {};
  apoiadores.forEach(a => {
    if (Array.isArray(a.modalidades)) {
      a.modalidades.forEach(m => {
        modalidadesCount[m] = (modalidadesCount[m] || 0) + 1;
      });
    }
  });

  sendJSON(res, 200, {
    totalApoiadores: apoiadores.length,
    totalCidades: cidades.length,
    cidades: cidades,
    modalidades: modalidadesCount
  });
}

/**
 * GET /api/health
 * Endpoint de verificação de saúde da aplicação
 */
function getHealth(req, res) {
  sendJSON(res, 200, {
    status: 'ok',
    ambiente: config.nodeEnv,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  getStats,
  getHealth
};
