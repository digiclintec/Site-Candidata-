/**
 * SERVIÇO AGENDADOR DIÁRIO DE NOTÍCIAS ELEITORAIS (newsScheduler.js)
 * Atualiza automaticamente as notícias eleitorais todos os dias às 07:00 da manhã,
 * mantendo estritamente a janela dos últimos 7 dias e garantindo apenas uma notícia
 * sobre Prova de Vida do INSS nos tópicos homologados.
 */

const config = require('../config/env');
const { readJSON, writeJSON } = require('../utils/fileStorage');

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * Mapeamento dos offsets (em dias relativos a hoje) para as 10 notícias homologadas.
 * Todos os itens ficam estritamente dentro da janela deslizante dos últimos 7 dias.
 */
const NEWS_SCHEDULE_OFFSETS = {
  'govbr-inss-prova-de-vida': 0, // Hoje (Destaque Principal Gov.br / INSS - ÚNICA sobre o tema)
  'tse-01': 0,                   // Hoje (Destaque Principal TSE Calendário)
  'tre-es-01': 1,                // Ontem (Destaque Regional TRE-ES Mesários)
  'tse-02': 2,                   // Há 2 dias (e-Título & Biometria)
  'govbr-inss-alerta-golpes': 3, // Há 3 dias (Segurança / Prevenção de Golpes)
  'tse-03': 4,                   // Há 4 dias (Fato ou Boato / Desinformação)
  'tre-es-02': 5,                // Há 5 dias (Atendimento Itinerante TRE-ES)
  'tse-04': 6,                   // Há 6 dias (Resolução IA / Regras de Propaganda)
  'tre-es-03': 6,                // Há 6 dias (Acessibilidade PCD no ES)
  'tse-06': 7                    // Há 7 dias (Prestação de Contas SPCE)
};

/**
 * IDs excluídos para garantir "somente uma notícia sobre esse assunto"
 */
const EXCLUDED_IDS = new Set([
  'govbr-inss-meu-inss' // Removida duplicata de Prova de Vida
]);

/**
 * Gera data ISO (YYYY-MM-DD) e formatada em português a partir de um offset em dias
 */
function getCalculatedDate(offsetDays = 0, baseDate = new Date()) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() - offsetDays);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const monthName = MESES[d.getMonth()];

  return {
    data: `${year}-${month}-${day}`,
    dataFormatada: `${day} de ${monthName} de ${year}`
  };
}

/**
 * Atualiza e sincroniza a base de notícias para a janela dos últimos 7 dias
 */
function refreshNewsWindow() {
  try {
    const noticiasFile = config.paths.noticiasFile;
    const currentNews = readJSON(noticiasFile, []);
    const now = new Date();

    // 1. Filtrar duplicatas e itens excluídos (somente uma notícia sobre Prova de Vida)
    const filtered = currentNews.filter(item => !EXCLUDED_IDS.has(item.id));

    // 2. Atualizar datas para a janela dos últimos 7 dias
    const updated = filtered.map(item => {
      const offset = (item.id in NEWS_SCHEDULE_OFFSETS) ? NEWS_SCHEDULE_OFFSETS[item.id] : 7;
      const { data, dataFormatada } = getCalculatedDate(offset, now);

      return {
        ...item,
        data,
        dataFormatada
      };
    });

    // 3. Ordenar cronologicamente decrescente (mais recentes primeiro)
    updated.sort((a, b) => new Date(b.data) - new Date(a.data));

    // 4. Salvar arquivo
    writeJSON(noticiasFile, updated);

    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    console.log(`[NEWS-SCHEDULER] ✅ Notícias sincronizadas com sucesso às ${timeStr}! Janela dos últimos 7 dias mantida (${updated.length} matérias ativas, tema Prova de Vida unificado).`);
    return updated;
  } catch (err) {
    console.error('[NEWS-SCHEDULER] ❌ Erro ao atualizar janela de notícias:', err.message);
    return null;
  }
}

/**
 * Calcula milissegundos até as próximas 07:00 da manhã
 */
function getMsUntilNext7AM() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(7, 0, 0, 0);

  if (now >= next) {
    next.setDate(next.getDate() + 1);
  }

  return next.getTime() - now.getTime();
}

/**
 * Inicializa o agendador contínuo de notícias
 */
function startNewsScheduler() {
  // Executa imediatamente na inicialização para calibrar a janela de 7 dias
  refreshNewsWindow();

  // Agenda a próxima execução diária para as 07:00 da manhã
  const msUntil7AM = getMsUntilNext7AM();
  const hoursUntil = (msUntil7AM / (1000 * 60 * 60)).toFixed(1);
  console.log(`[NEWS-SCHEDULER] ⏰ Próxima atualização diária agendada para as 07:00 (daqui a ~${hoursUntil}h).`);

  setTimeout(() => {
    refreshNewsWindow();
    // Repete a cada 24 horas às 07:00
    setInterval(refreshNewsWindow, 24 * 60 * 60 * 1000);
  }, msUntil7AM);
}

module.exports = {
  startNewsScheduler,
  refreshNewsWindow
};
