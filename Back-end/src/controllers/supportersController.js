/**
 * CONTROLADOR DE APOIADORES (supportersController.js)
 * Gerencia o cadastro e listagem de voluntários e apoiadores
 */

const config = require('../config/env');
const { readJSON, writeJSON } = require('../utils/fileStorage');

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

/**
 * POST /api/apoiadores
 * Cadastra um novo apoiador
 */
function createSupporter(req, res) {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
    // Prevenção de payload excessivo (limite de 1MB)
    if (body.length > 1e6) {
      req.destroy();
    }
  });

  req.on('end', () => {
    try {
      const payload = JSON.parse(body || '{}');

      // Validação básica
      if (!payload.nome || typeof payload.nome !== 'string' || !payload.nome.trim()) {
        return sendJSON(res, 400, { erro: 'O campo "nome" é obrigatório.' });
      }

      if (!payload.whatsapp || typeof payload.whatsapp !== 'string' || !payload.whatsapp.trim()) {
        return sendJSON(res, 400, { erro: 'O campo "whatsapp" é obrigatório.' });
      }

      const supportersFile = config.paths.supportersFile;
      const apoiadores = readJSON(supportersFile, []);

      const novoApoiador = {
        id: Date.now().toString(),
        nome: payload.nome.trim(),
        whatsapp: payload.whatsapp.trim(),
        cidade: (payload.cidade || '').trim(),
        ocupacao: (payload.ocupacao || '').trim(),
        modalidades: Array.isArray(payload.modalidades) ? payload.modalidades : [],
        mensagem: (payload.mensagem || '').trim(),
        dataRecebimento: new Date().toISOString()
      };

      apoiadores.push(novoApoiador);
      const saved = writeJSON(supportersFile, apoiadores);

      if (!saved) {
        return sendJSON(res, 500, { erro: 'Falha ao gravar os dados do apoiador.' });
      }

      console.log(`[NOVO APOIADOR] Cadastrado: ${novoApoiador.nome} (${novoApoiador.cidade || 'Não informada'})`);

      return sendJSON(res, 201, {
        sucesso: true,
        mensagem: 'Apoiador cadastrado com sucesso!',
        totalCadastrados: apoiadores.length,
        id: novoApoiador.id
      });
    } catch (err) {
      return sendJSON(res, 400, { erro: 'Formato de payload JSON inválido.' });
    }
  });
}

/**
 * GET /api/apoiadores
 * Lista todos os apoiadores cadastrados
 */
function listSupporters(req, res) {
  const apoiadores = readJSON(config.paths.supportersFile, []);
  sendJSON(res, 200, {
    total: apoiadores.length,
    apoiadores: apoiadores
  });
}

module.exports = {
  createSupporter,
  listSupporters
};
