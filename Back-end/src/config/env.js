/**
 * MÓDULO DE CONFIGURAÇÃO E AMBIENTE (env.js)
 * Carregamento resiliente e nativo de variáveis de ambiente (.env)
 * Compatível com qualquer versão do Node.js (Zero dependências externas)
 */

const fs = require('fs');
const path = require('path');

// Diretório raiz do Back-end
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const ENV_PATH = path.join(ROOT_DIR, '.env');

/**
 * Parser nativo para arquivos .env
 */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      // Ignorar linhas vazias ou comentários
      if (!trimmed || trimmed.startsWith('#')) continue;

      const equalsIndex = trimmed.indexOf('=');
      if (equalsIndex === -1) continue;

      const key = trimmed.slice(0, equalsIndex).trim();
      let value = trimmed.slice(equalsIndex + 1).trim();

      // Remover aspas externas se existirem
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Preenche em process.env se ainda não estiver definido
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (err) {
    console.warn(`[CONFIG] Aviso: Não foi possível ler o arquivo ${filePath}:`, err.message);
  }
}

// Executa carregamento do .env
loadEnvFile(ENV_PATH);

// Helper para converter string booleana
function parseBool(val, defaultVal = false) {
  if (val === undefined || val === null) return defaultVal;
  const s = String(val).trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'yes';
}

// Configurações consolidadas
const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Configurações de CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET, POST, OPTIONS',
    headers: process.env.CORS_HEADERS || 'Content-Type, Authorization, X-Requested-With'
  },

  // Listener de porta de conveniência secundária
  secondaryServer: {
    enabled: parseBool(process.env.ENABLE_SECONDARY_PORT, true),
    port: parseInt(process.env.SECONDARY_PORT || '8080', 10)
  },

  // Resolução de caminhos no sistema de arquivos
  paths: {
    rootDir: ROOT_DIR,
    dataDir: path.resolve(ROOT_DIR, process.env.DATA_DIR || './data'),
    frontendDir: path.resolve(ROOT_DIR, process.env.FRONTEND_DIR || '../Font-End'),
    get supportersFile() {
      return path.join(this.dataDir, 'apoiadores.json');
    },
    get contactsFile() {
      return path.join(this.dataDir, 'contatos.json');
    }
  }
};

module.exports = config;
