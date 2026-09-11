/**
 * BACK-END OFICIAL - ALEXSANDRA TOMAZ
 * API leve e autônoma desenvolvida com Node.js nativo (Zero dependências externas necessárias)
 * Compatível com qualquer versão do Node.js.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const APOIADORES_FILE = path.join(DATA_DIR, 'apoiadores.json');
const CONTATOS_FILE = path.join(DATA_DIR, 'contatos.json');
const FRONTEND_DIR = path.join(__dirname, '..', 'Font-End');

// Garante que o diretório de dados e arquivos existam
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(APOIADORES_FILE)) {
  fs.writeFileSync(APOIADORES_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(CONTATOS_FILE)) {
  fs.writeFileSync(CONTATOS_FILE, JSON.stringify([], null, 2));
}

// Helpers para leitura e escrita segura de JSON
function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Erro ao ler ${filePath}:`, err);
    return [];
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Erro ao gravar ${filePath}:`, err);
    return false;
  }
}

// Mapeamento de tipos MIME para servir o Frontend
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // Configuração de cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Pre-flight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // ------------------------------------------------------------------------
  // ROTAS DE API
  // ------------------------------------------------------------------------

  // POST /api/apoiadores -> Cadastrar novo voluntário/apoiador
  if (req.method === 'POST' && pathname === '/api/apoiadores') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.nome || !payload.whatsapp) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ erro: 'Nome e WhatsApp são obrigatórios.' }));
          return;
        }

        const apoiadores = readJSON(APOIADORES_FILE);
        const novoApoiador = {
          id: Date.now().toString(),
          ...payload,
          dataRecebimento: new Date().toISOString()
        };

        apoiadores.push(novoApoiador);
        writeJSON(APOIADORES_FILE, apoiadores);

        console.log(`[NOVO APOIADOR] Cadastrado: ${payload.nome} (${payload.cidade})`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          sucesso: true, 
          mensagem: 'Apoiador cadastrado com sucesso!',
          totalCadastrados: apoiadores.length
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'JSON inválido recebido.' }));
      }
    });
    return;
  }

  // GET /api/apoiadores -> Listar apoiadores cadastrados
  if (req.method === 'GET' && pathname === '/api/apoiadores') {
    const apoiadores = readJSON(APOIADORES_FILE);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      total: apoiadores.length,
      apoiadores: apoiadores
    }));
    return;
  }

  // GET /api/stats -> Estatísticas gerais
  if (req.method === 'GET' && pathname === '/api/stats') {
    const apoiadores = readJSON(APOIADORES_FILE);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      totalApoiadores: apoiadores.length,
      cidades: [...new Set(apoiadores.map(a => a.cidade).filter(Boolean))]
    }));
    return;
  }

  // ------------------------------------------------------------------------
  // SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND
  // ------------------------------------------------------------------------
  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(FRONTEND_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Página ou recurso não encontrado.');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Servidor Alexsandra Tomaz rodando com sucesso!`);
  console.log(`📍 Acesse o site em: http://localhost:${PORT}`);
  console.log(`📊 API de apoiadores: http://localhost:${PORT}/api/apoiadores`);
  console.log('====================================================');
});

// Tenta escutar também na porta 8080 para conveniência
if (PORT !== 8080) {
  const secondaryServer = http.createServer((req, res) => server.emit('request', req, res));
  secondaryServer.on('error', (err) => {
    // Porta 8080 ocupada por outro app, ignorar silenciosamente
  });
  secondaryServer.listen(8080, () => {
    console.log(`📍 Também disponível em: http://localhost:8080`);
  });
}

