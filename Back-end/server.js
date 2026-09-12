/**
 * ============================================================================
 * SERVIDOR OFICIAL - ALEXSANDRA TOMAZ
 * Ponto de entrada (Entrypoint)
 * ============================================================================
 */

const http = require('http');
const config = require('./src/config/env');
const { initializeStorage } = require('./src/utils/fileStorage');
const { handleCors } = require('./src/middlewares/cors');
const { handleRequest } = require('./src/routes/router');

// 1. Inicializar estrutura de persistência local
initializeStorage();

// 2. Criar servidor HTTP principal
const server = http.createServer((req, res) => {
  // Tratar cabeçalhos de CORS e requisições OPTIONS
  const isPreflightHandled = handleCors(req, res);
  if (isPreflightHandled) return;

  // Despachar requisições (API e arquivos estáticos)
  handleRequest(req, res);
});

// 3. Iniciar escuta na porta principal
server.listen(config.port, config.host, () => {
  const isAnyHost = config.host === '0.0.0.0';
  const displayHost = isAnyHost ? 'localhost' : config.host;

  console.log('\n============================================================');
  console.log(`🚀 SERVIDOR ALEXSANDRA TOMAZ INICIADO COM SUCESSO!`);
  console.log(`🌍 Ambiente: ${config.nodeEnv.toUpperCase()}`);
  console.log(`📍 Site Oficial:     http://${displayHost}:${config.port}`);
  console.log(`📊 API Apoiadores:   http://${displayHost}:${config.port}/api/apoiadores`);
  console.log(`📈 API Estatísticas: http://${displayHost}:${config.port}/api/stats`);
  console.log(`🩺 Health Check:     http://${displayHost}:${config.port}/api/health`);
  console.log(`🔒 Política de CORS: [${config.cors.origin}]`);
  console.log('============================================================\n');
});

// 4. Iniciar listener secundário de conveniência (se habilitado)
if (config.secondaryServer.enabled && config.port !== config.secondaryServer.port) {
  const secondaryServer = http.createServer((req, res) => server.emit('request', req, res));
  
  secondaryServer.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`ℹ️  Porta secundária ${config.secondaryServer.port} já em uso por outro processo (ignorado).`);
    } else {
      console.warn(`[SEC-SERVER] Erro na porta secundária:`, err.message);
    }
  });

  secondaryServer.listen(config.secondaryServer.port, () => {
    console.log(`📍 Porta secundária ativa: http://localhost:${config.secondaryServer.port}`);
  });
}
