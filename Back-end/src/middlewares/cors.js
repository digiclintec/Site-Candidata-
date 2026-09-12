/**
 * MIDDLEWARE DE CORS (cors.js)
 * Aplica cabeçalhos de controle de acesso configurados no .env
 */

const config = require('../config/env');

function handleCors(req, res) {
  const allowedOrigins = config.cors.origin.split(',').map(o => o.trim());
  const requestOrigin = req.headers.origin;

  if (allowedOrigins.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', config.cors.methods);
  res.setHeader('Access-Control-Allow-Headers', config.cors.headers);

  // Pre-flight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true; // Requisição finalizada
  }

  return false; // Seguir para próximo handler
}

module.exports = {
  handleCors
};
