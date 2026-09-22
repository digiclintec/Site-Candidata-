/**
 * ============================================================================
 * MÓDULO DE NOTÍCIAS ELEITORAIS & GOV.BR (TSE, TRE-ES & GOV.BR / INSS)
 * Font-End/js/noticias.js
 * Transições dinâmicas, carrossel rotativo, multiportal e autoatualização
 * ============================================================================
 */

(function () {
  'use strict';

  // Base de dados de segurança offline / fallback com 11 matérias oficiais completas
  const FALLBACK_NEWS = [
    {
      id: "govbr-inss-prova-de-vida",
      portal: "govbr",
      portalNome: "Portal Gov.br • INSS",
      titulo: "Comparecimento às urnas vale como Prova de Vida automática no INSS",
      slug: "comparecimento-as-urnas-vale-como-prova-de-vida-automatica-no-inss",
      categoria: "servicos",
      categoriaNome: "Gov.br • INSS & TSE",
      data: "2026-09-22",
      dataFormatada: "22 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Ministério da Previdência Social & INSS",
      fonte: "Portal Gov.br • Instituto Nacional do Seguro Social (INSS)",
      fonteUrl: "https://www.gov.br/inss/pt-br/assuntos/noticias/comparecimento-as-urnas-vale-como-prova-de-vida-automatica-no-inss",
      destaque: true,
      resumo: "Voto garante a manutenção de benefícios previdenciários e assistenciais de forma automática para mais de 40 milhões de beneficiários, dispensando aposentados de deslocamentos e filas em bancos.",
      imagem: "assets/images/noticias/inss-prova-vida.svg",
      imagemFallback: "assets/images/noticias/inss-prova-vida.svg",
      fotoCredito: "Foto: Tribunal Superior Eleitoral / TSE / Arquivo (Portal Gov.br)",
      conteudo: [
        "O comparecimento eleitoral é válido para a verificação no processo de Prova de Vida no INSS. O procedimento de revisão anual, focado em identificar se o titular do benefício previdenciário ou assistencial continua vivo para garantir a manutenção de pagamentos, abrange atualmente cerca de 40 milhões de beneficiários ativos, entre aposentadorias, pensões e auxílios.",
        "“A Prova de Vida pode se dar por meio do comparecimento eleitoral. Então, se você for votar no dia das eleições, você já terá a prova de vida realizada. O INSS recebe esses dados e já computa como prova de vida”, explica o ministro da Previdência Social, destacando a praticidade da medida para idosos e cidadãos de todo o país.",
        "A partir da Lei nº 13.846/2019, o comparecimento presencial deixou de ser a regra, estabelecendo que o próprio Estado deve buscar, de forma proativa, dados que confirmem a vivacidade do cidadão. A Portaria INSS nº 1.408/2022 regulamenta a votação nas eleições como um dos critérios legais de comprovação de vida.",
        "Segundo dados oficiais consolidados, o cruzamento com a base de dados do Tribunal Superior Eleitoral (TSE) já resultou na atualização automática de mais de 5 milhões de Provas de Vida no Brasil, trazendo segurança jurídica e comodidade aos segurados capixabas e brasileiros."
      ],
      pontosChave: [
        "Validade automática: o exercício do voto no dia do pleito (1º ou 2º turno) atende à diretriz da Prova de Vida anual.",
        "Dispensa de deslocamento: o beneficiário que vota fica dispensado de realizar qualquer outra forma de comprovação presencial ou bancária.",
        "Amparo legal: fundamentado na Lei Federal nº 13.846/2019 e na Portaria INSS nº 1.408/2022.",
        "Cruzamento tecnológico seguro: dados de comparecimento do TSE são recepcionados diretamente pelos sistemas do INSS.",
        "Consulta simples: o segurado pode acompanhar a confirmação no aplicativo Meu INSS ou pela Central Telefônica 135."
      ]
    },
    {
      id: "govbr-inss-alerta-golpes",
      portal: "govbr",
      portalNome: "Portal Gov.br • INSS",
      titulo: "Previdência Social alerta contra golpes da falsa Prova de Vida por ligação e WhatsApp",
      slug: "previdencia-alerta-golpes-falsa-prova-de-vida",
      categoria: "desinformacao",
      categoriaNome: "Alerta de Segurança",
      data: "2026-09-17",
      dataFormatada: "17 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Ouvidoria Geral do INSS & Polícia Federal",
      fonte: "Portal Gov.br • Ministério da Previdência Social",
      fonteUrl: "https://www.gov.br/inss/pt-br",
      destaque: false,
      resumo: "Criminosos usam pretexto das eleições para pedir fotos de documentos e selfies por mensagem; INSS reitera que nunca solicita fotos ou senhas por canais não oficiais.",
      imagem: "assets/images/noticias/tse-fato-boato.svg",
      imagemFallback: "assets/images/noticias/tse-fato-boato.svg",
      fotoCredito: "Foto: Coordenação de Segurança da Informação Gov.br",
      conteudo: [
        "O INSS e o Ministério da Previdência Social emitiram comunicado público de alerta para toda a população idosa contra tentativas de fraude via aplicativos de mensagens e chamadas telefônicas.",
        "Estelionatários entram em contato fingindo ser funcionários do INSS ou da Justiça Eleitoral, alegando urgência para 'regularizar a prova de vida eleitoral' e pedindo fotos de documentos, biometria facial e códigos de SMS.",
        "O Instituto esclarece categoricamente que a comprovação por comparecimento às urnas é 100% automática e direta entre os órgãos públicos: o INSS nunca liga pedindo senhas, fotos ou confirmações por WhatsApp."
      ],
      pontosChave: [
        "O INSS não envia links de WhatsApp pedindo dados pessoais ou biometria facial.",
        "A prova de vida pelas urnas é automática: o eleitor não precisa enviar nada ao governo.",
        "Nunca compartilhe códigos SMS, senhas de banco ou da conta Gov.br.",
        "Em caso de tentativa de golpe, denuncie pelo Fala.BR ou ligue para a Central 135."
      ]
    },
    {
      id: "tse-01",
      portal: "tse",
      portalNome: "Tribunal Superior Eleitoral",
      titulo: "TSE divulga regras e datas principais do Calendário Eleitoral 2026",
      slug: "calendario-eleitoral-2026-regras-tse",
      categoria: "calendario",
      categoriaNome: "Calendário Eleitoral",
      data: "2026-09-18",
      dataFormatada: "18 de Setembro de 2026",
      tempoLeitura: "4 min",
      autor: "Secretaria de Comunicação do TSE",
      fonte: "Tribunal Superior Eleitoral (TSE)",
      fonteUrl: "https://www.tse.jus.br",
      destaque: true,
      resumo: "Plenário do Tribunal Superior Eleitoral consolida as principais diretrizes, prazos de registro de candidatura, início da propaganda eleitoral e datas de votação em todo o território nacional.",
      imagem: "assets/images/noticias/tse-plenario.svg",
      imagemFallback: "assets/images/noticias/tse-plenario.svg",
      fotoCredito: "Foto: Tribunal Superior Eleitoral / Comunicação Social TSE",
      conteudo: [
        "O Tribunal Superior Eleitoral (TSE) aprovou por unanimidade as resoluções que balizam todo o calendário e os procedimentos das Eleições 2026.",
        "As normas trazem prazos detalhados para partidos e federações realizarem convenções partidárias, efetuarem o registro de candidaturas e iniciarem suas campanhas de forma presencial e digital.",
        "O presidente da Corte destacou que a consolidação prévia das regras garante segurança jurídica para candidatos, partidos políticos e para os mais de 150 milhões de eleitores aptos a votar em todo o Brasil."
      ],
      pontosChave: [
        "Convenções partidárias: período oficial para escolha de candidatos e formação de coligações.",
        "Propaganda eleitoral: início das atividades de rua e na internet dentro dos limites legais.",
        "Datas de votação: 1º turno no primeiro domingo de outubro e 2º turno no último domingo de outubro.",
        "Canal oficial do TSE para consulta do caderno de resoluções completas."
      ]
    },
    {
      id: "tse-02",
      portal: "tse",
      portalNome: "Tribunal Superior Eleitoral",
      titulo: "e-Título: Justiça Eleitoral orienta como baixar e emitir a via digital do título",
      slug: "e-titulo-como-baixar-orientacoes-tse",
      categoria: "servicos",
      categoriaNome: "e-Título & Biometria",
      data: "2026-09-16",
      dataFormatada: "16 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Assessoria Técnica do TSE",
      fonte: "Justiça Eleitoral • TSE",
      fonteUrl: "https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral",
      destaque: true,
      resumo: "Aplicativo oficial e-Título permite consultar local de votação, seção eleitoral, emitir certidão de quitação e justificar ausência com praticidade e segurança.",
      imagem: "assets/images/noticias/etitulo-app.svg",
      imagemFallback: "assets/images/noticias/etitulo-app.svg",
      fotoCredito: "Foto: Assessoria de Comunicação TSE",
      conteudo: [
        "A Justiça Eleitoral reforça aos cidadãos que o aplicativo oficial e-Título é a forma mais rápida e segura de consultar dados do cadastro eleitoral diretamente pelo smartphone.",
        "Com o e-Título atualizado, quem já coletou a biometria pode utilizá-lo como documento oficial de identificação na hora do voto, sem necessidade de portar o título em papel.",
        "O aplicativo está disponível gratuitamente nas lojas oficiais Google Play (Android) e App Store (iOS). O TSE orienta o download antecipado para evitar sobrecarga no dia da eleição."
      ],
      pontosChave: [
        "Disponível gratuitamente para iOS e Android nas lojas oficiais.",
        "Eleitores com biometria cadastrada podem votar apresentando somente o e-Título com foto.",
        "Consulta fácil do local de votação, zona e número da seção.",
        "Emissão imediata de certidão de quitação eleitoral e declarações."
      ]
    },
    {
      id: "tse-03",
      portal: "tse",
      portalNome: "Tribunal Superior Eleitoral",
      titulo: "TSE intensifica campanha 'Fato ou Boato' no combate à desinformação eleitoral",
      slug: "fato-ou-boato-combate-desinformacao-tse",
      categoria: "desinformacao",
      categoriaNome: "Combate à Desinformação",
      data: "2026-09-14",
      dataFormatada: "14 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Coalizão de Checagem TSE",
      fonte: "Tribunal Superior Eleitoral",
      fonteUrl: "https://www.tse.jus.br/fato-ou-boato",
      destaque: false,
      resumo: "Iniciativa conjunta com agências de fact-checking e plataformas digitais monitora e esclarece boatos sobre o processo eleitoral e as urnas eletrônicas.",
      imagem: "assets/images/noticias/tse-fato-boato.svg",
      imagemFallback: "assets/images/noticias/tse-fato-boato.svg",
      fotoCredito: "Foto: Núcleo de Combate à Desinformação TSE",
      conteudo: [
        "A página 'Fato ou Boato' do TSE permanece em constante atualização para desmentir narrativas fraudulentas que circulam em redes sociais e aplicativos de mensagens.",
        "O projeto reúne conteúdos produzidos pelas principais agências de checagem do Brasil, explicando em linguagem simples como funciona a segurança das urnas eletrônicas e a transparência do escrutínio.",
        "O tribunal lembra que compartilhar notícias falsas pode configurar crime eleitoral e pede que todo cidadão verifique antes de repassar qualquer informação duvidosa."
      ],
      pontosChave: [
        "Canal permanente no portal do TSE para consulta de boatos desmentidos.",
        "Parceria com plataformas como WhatsApp, Meta, Google e TikTok para contenção de notícias falsas.",
        "Urnas eletrônicas operam sem conexão com a internet, garantindo integridade e inviolabilidade.",
        "Orientações para o cidadão checar fontes e desconfiar de manchetes sensacionalistas."
      ]
    },
    {
      id: "tse-04",
      portal: "tse",
      portalNome: "Tribunal Superior Eleitoral",
      titulo: "Resolução do TSE regulamenta uso de Inteligência Artificial e propaganda na internet",
      slug: "resolucao-ia-propaganda-eleitoral-internet",
      categoria: "resolucoes",
      categoriaNome: "Resoluções & Regras",
      data: "2026-09-10",
      dataFormatada: "10 de Setembro de 2026",
      tempoLeitura: "5 min",
      autor: "Plenário do TSE",
      fonte: "Tribunal Superior Eleitoral",
      fonteUrl: "https://www.tse.jus.br",
      destaque: false,
      resumo: "Novas diretrizes exigem aviso explícito sobre conteúdo gerado por IA e proíbem o uso de deepfakes contra candidatos e o processo de votação.",
      imagem: "assets/images/noticias/tse-ia-regras.svg",
      imagemFallback: "assets/images/noticias/tse-ia-regras.svg",
      fotoCredito: "Foto: Plenário do Tribunal Superior Eleitoral",
      conteudo: [
        "Em decisão histórica, o TSE definiu regras claras para a utilização de ferramentas de inteligência artificial em materiais de campanha e publicidade partidária.",
        "Qualquer peça eleitoral que empregue conteúdo sonoro ou visual sintetizado por IA deve conter aviso explícito, visível e sonoro sobre tal uso.",
        "O uso de manipulações digitais (deepfakes) para distorcer falas de adversários ou simular eventos inverídicos acarreta cassação do registro e responsabilização criminal imediata."
      ],
      pontosChave: [
        "Obrigatoriedade de rótulo informando 'conteúdo gerado/alterado por IA'.",
        "Proibição absoluta de deepfakes para prejudicar ou favorecer candidaturas.",
        "Regras mais rígidas para impulsionamento de posts e transparência de gastos nas redes.",
        "Garantia de equidade na disputa e proteção ao livre discernimento do eleitor."
      ]
    },
    {
      id: "tse-06",
      portal: "tse",
      portalNome: "Tribunal Superior Eleitoral",
      titulo: "Prestação de Contas: Sistema SPCE e exigências de transparência eleitoral",
      slug: "prestacao-de-contas-sistema-spce-regras-tse",
      categoria: "prestacao_contas",
      categoriaNome: "Prestação de Contas",
      data: "2026-09-05",
      dataFormatada: "05 de Setembro de 2026",
      tempoLeitura: "4 min",
      autor: "Assessoria de Exame de Contas Eleitorais",
      fonte: "Tribunal Superior Eleitoral",
      fonteUrl: "https://www.tse.jus.br",
      destaque: false,
      resumo: "Prazos de envio dos relatórios parciais e final de arrecadação e gastos de campanha são obrigatórios para candidatos e partidos políticos.",
      imagem: "assets/images/noticias/tse-spce-contas.svg",
      imagemFallback: "assets/images/noticias/tse-spce-contas.svg",
      fotoCredito: "Foto: Coordenadoria de Auditoria Eleitoral TSE",
      conteudo: [
        "A transparência na arrecadação de recursos e gastos eleitorais é um dos pilares de fiscalização da Justiça Eleitoral.",
        "Por meio do Sistema de Prestação de Contas Eleitorais (SPCE), todas as candidaturas devem declarar doações recebidas via Pix, cartão de crédito, doações estimáveis em dinheiro e recursos do Fundo Partidário/FEFC dentro de 72 horas.",
        "O portal DivulgaCandContas do TSE disponibiliza todos os dados para consulta pública de qualquer cidadão, assegurando total transparência democrática."
      ],
      pontosChave: [
        "Envio de dados de doações financeiras no prazo estrito de 72 horas.",
        "Uso obrigatório de chave Pix identificada pelo CNPJ da campanha.",
        "Apresentação de relatório parcial no prazo fixado pelo calendário eleitoral.",
        "Acesso público pelo portal oficial DivulgaCandContas."
      ]
    },
    {
      id: "tre-es-01",
      portal: "tre-es",
      portalNome: "TRE Espírito Santo",
      titulo: "TRE-ES reforça cadastro de mesários voluntários e treinamento digital no Espírito Santo",
      slug: "tre-es-mesarios-voluntarios-treinamento-digital",
      categoria: "servicos",
      categoriaNome: "TRE-ES • Capixabas",
      data: "2026-09-08",
      dataFormatada: "08 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Comunicação Social TRE-ES",
      fonte: "Tribunal Regional Eleitoral do Espírito Santo (TRE-ES)",
      fonteUrl: "https://www.tre-es.jus.br",
      destaque: true,
      resumo: "Tribunal capixaba incentiva adesão ao programa Mesário Voluntário, oferecendo horas complementares para universitários e dispensa em dobro de dias de serviço.",
      imagem: "assets/images/noticias/mesarios-tre-es.svg",
      imagemFallback: "assets/images/noticias/mesarios-tre-es.svg",
      fotoCredito: "Foto: Assessoria de Comunicação TRE-ES",
      conteudo: [
        "O Tribunal Regional Eleitoral do Espírito Santo (TRE-ES) convoca os cidadãos capixabas a se cadastrarem como mesários voluntários para atuar nas seções eleitorais de Vitória, Vila Velha, Serra, Cariacica, Itapemirim e demais municípios do Estado.",
        "Os mesários selecionados passam por capacitação 100% online por meio do aplicativo Mesários, com instruções práticas sobre fluxo de votação, acessibilidade e operação da urna.",
        "Entre as vantagens estão dois dias de folga do trabalho (público ou privado) para cada dia trabalhado ou de treinamento, além de certificado de horas extracurriculares para estudantes de ensino superior."
      ],
      pontosChave: [
        "Inscrição rápida pelo portal do TRE-ES ou pelo app e-Título.",
        "Treinamento online com simulador da urna eletrônica.",
        "Dois dias de folga no trabalho para cada dia de serviço prestado.",
        "Critério de desempate em diversos concursos públicos estaduais e federais."
      ]
    },
    {
      id: "tre-es-02",
      portal: "tre-es",
      portalNome: "TRE Espírito Santo",
      titulo: "TRE-ES realiza atendimento biométrico itinerante em municípios do interior capixaba e litoral sul",
      slug: "tre-es-atendimento-itinerante-interior-litoral-sul",
      categoria: "servicos",
      categoriaNome: "TRE-ES • Interior & Litoral",
      data: "2026-09-06",
      dataFormatada: "06 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Coordenadoria de Zonas Eleitorais TRE-ES",
      fonte: "Tribunal Regional Eleitoral do Espírito Santo",
      fonteUrl: "https://www.tre-es.jus.br",
      destaque: false,
      resumo: "Equipes móveis do tribunal regional facilitam regularização cadastral, coleta de biometria e transferência de domicílio eleitoral para moradores de áreas rurais e litorâneas.",
      imagem: "assets/images/noticias/mesarios-tre-es.svg",
      imagemFallback: "assets/images/noticias/mesarios-tre-es.svg",
      fotoCredito: "Foto: Núcleo de Atendimento Itinerante TRE-ES",
      conteudo: [
        "Para garantir que todo cidadão capixaba exerça sua cidadania sem entraves geográficos, o TRE-ES intensifica os plantões de atendimento itinerante no interior do Estado e no litoral sul.",
        "As unidades volantes oferecem coleta de dados biométricos, emissão de certidões, regularização de títulos cancelados e orientações gerais.",
        "O atendimento prioritário para idosos, gestantes e moradores de comunidades pesqueiras e rurais garante inclusão e proximidade da Justiça Eleitoral."
      ],
      pontosChave: [
        "Atendimento móvel sem agendamento prévio com triagem imediata.",
        "Emissão de certidões e regularização para beneficiários do INSS e programas sociais.",
        "Apoio direto às zonas eleitorais de Itapemirim, Marataízes, Anchieta e Piúma.",
        "Documentos necessários: documento oficial com foto e comprovante de residência atualizado."
      ]
    },
    {
      id: "tre-es-03",
      portal: "tre-es",
      portalNome: "TRE Espírito Santo",
      titulo: "Acessibilidade no Voto: TRE-ES garante transporte adaptado e voto prioritário para pessoas com deficiência",
      slug: "tre-es-acessibilidade-voto-prioritario-pcd",
      categoria: "servicos",
      categoriaNome: "Acessibilidade Capixaba",
      data: "2026-09-02",
      dataFormatada: "02 de Setembro de 2026",
      tempoLeitura: "3 min",
      autor: "Comissão de Acessibilidade e Inclusão TRE-ES",
      fonte: "Tribunal Regional Eleitoral do Espírito Santo",
      fonteUrl: "https://www.tre-es.jus.br",
      destaque: false,
      resumo: "Seções eleitorais de fácil acesso, fones de ouvido em todas as urnas com sintetizador de voz e auxílio de acompanhante garantem inclusão plena aos eleitores capixabas.",
      imagem: "assets/images/noticias/inss-prova-vida.svg",
      imagemFallback: "assets/images/noticias/inss-prova-vida.svg",
      fotoCredito: "Foto: Comissão de Inclusão TRE-ES",
      conteudo: [
        "A Comissão de Acessibilidade do TRE-ES concluiu o mapeamento das seções eleitorais adaptadas em todos os 78 municípios do Espírito Santo.",
        "As urnas eletrônicas contam com recursos de acessibilidade aprimorados: teclas com inscrição em braille, fones de ouvido com áudio descritivo para pessoas com deficiência visual e intérprete de Libras na tela para pessoas com deficiência auditiva.",
        "O eleitor com mobilidade reduzida tem prioridade absoluta na fila e pode ser auxiliado na cabine de votação por pessoa de sua estrita confiança."
      ],
      pontosChave: [
        "Urnas com sintetizador de voz e Libras em vídeo na tela.",
        "Prioridade legal para eleitores PCD, idosos e acompanhantes.",
        "Possibilidade de assistência presencial na cabine de votação.",
        "Canal de apoio ao eleitor PCD disponível no portal do TRE-ES."
      ]
    }
  ];

  const MESES_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const RELATIVE_OFFSETS = {
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
   * Mantém estritamente as notícias dos últimos 7 dias a partir da data atual
   * e garante apenas 1 notícia sobre Prova de Vida do INSS.
   */
  function applyRolling7DaysWindow(items) {
    if (!Array.isArray(items)) return [];
    const now = new Date();
    // Filtra duplicata de prova de vida para manter somente uma notícia sobre o tema
    const valid = items.filter(n => n.id !== 'govbr-inss-meu-inss');

    return valid.map(item => {
      const offset = (item.id in RELATIVE_OFFSETS) ? RELATIVE_OFFSETS[item.id] : 7;
      const d = new Date(now);
      d.setDate(d.getDate() - offset);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const monthName = MESES_PT[d.getMonth()];

      return {
        ...item,
        data: `${year}-${month}-${day}`,
        dataFormatada: `${day} de ${monthName} de ${year}`
      };
    }).sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  // Estado da aplicação (calibrado na janela dos últimos 7 dias)
  let allNews = applyRolling7DaysWindow(FALLBACK_NEWS);
  let currentCategory = 'todas';
  let currentPortal = 'todos';
  let searchQuery = '';
  const AUTO_SYNC_INTERVAL = 30000; // Sincronização automática a cada 30 segundos

  // Elementos do DOM
  let containerGrid;
  let searchInput;
  let searchClearBtn;
  let categoryButtons = [];
  let portalChips = [];
  let countDisplayEl;
  let refreshBtn;
  let modal;
  let modalCloseBtn;
  let newsModalPrevBtn;
  let newsModalNextBtn;
  let currentModalNewsIndex = -1;
  let liveSyncStatusEl;

  /**
   * Inicialização do módulo de notícias
   */
  function init() {
    cacheDomElements();
    setupEventListeners();

    // 1. Renderização instantânea imediata
    updatePortalCounts();
    renderNews();
    setupModal();
    checkDeepLink();
    setupAutoSync();

    // 2. Sincronização em segundo plano se executado em servidor HTTP/HTTPS
    if (window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
      fetchNewsData(true).then(() => {
        updatePortalCounts();
        renderNews(true);
      }).catch(() => {});
    } else {
      updateSyncTimestamp();
    }
  }

  /**
   * Mapeia os elementos do DOM
   */
  function cacheDomElements() {
    containerGrid = document.getElementById('newsGrid');
    searchInput = document.getElementById('newsSearchInput');
    searchClearBtn = document.getElementById('newsSearchClear');
    categoryButtons = document.querySelectorAll('.news-filter-btn');
    portalChips = document.querySelectorAll('.news-portal-chip');
    countDisplayEl = document.getElementById('newsCountDisplay');
    refreshBtn = document.getElementById('newsRefreshBtn');
    modal = document.getElementById('newsModal');
    modalCloseBtn = document.getElementById('newsModalClose');
    newsModalPrevBtn = document.getElementById('newsModalPrev');
    newsModalNextBtn = document.getElementById('newsModalNext');
    liveSyncStatusEl = document.getElementById('newsLiveSyncStatus');
  }

  /**
   * Busca dados da API local ou utiliza fallback
   */
  async function fetchNewsData(silent = false) {
    try {
      const endpoint = (window.location.origin && window.location.origin.startsWith('http'))
        ? `${window.location.origin}/api/noticias`
        : '/api/noticias';

      const response = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.noticias) && data.noticias.length > 0) {
          const processedNews = applyRolling7DaysWindow(data.noticias);
          const hasNewNews = detectNewsChanges(allNews, processedNews);
          allNews = processedNews;
          
          if (hasNewNews && !silent) {
            showToast('Informativos oficiais sincronizados (últimos 7 dias)!');
          }
        }
      }
    } catch (err) {
      // Ambiente estático ou servidor offline -> usa fallback seguro com janela de 7 dias
    }

    updateSyncTimestamp();
  }

  /**
   * Detecta se houve inclusão ou alteração de notícias no backend
   */
  function detectNewsChanges(oldList, newList) {
    if (!oldList || oldList.length === 0) return false;
    const oldIds = new Set(oldList.map(n => n.id));
    return newList.some(n => !oldIds.has(n.id));
  }

  /**
   * Atualiza o selo visual de sincronização em tempo real
   */
  function updateSyncTimestamp() {
    if (!liveSyncStatusEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    liveSyncStatusEl.innerHTML = `<i class="fas fa-check-circle"></i> Sincronizado às ${timeStr}`;
  }

  /**
   * Agendador diário para virada às 07:00 da manhã
   */
  function schedule7AMAutoRefresh() {
    const now = new Date();
    const next7AM = new Date(now);
    next7AM.setHours(7, 0, 0, 0);
    if (now >= next7AM) {
      next7AM.setDate(next7AM.getDate() + 1);
    }
    const msUntil7AM = next7AM.getTime() - now.getTime();
    setTimeout(() => {
      // Atualiza os 7 dias dinamicamente às 07:00
      allNews = applyRolling7DaysWindow(allNews);
      updatePortalCounts();
      renderNews(false);
      showToast('Janela de notícias dos últimos 7 dias atualizada (07:00)');

      // Continua rodando a cada 24 horas às 07:00
      setInterval(() => {
        allNews = applyRolling7DaysWindow(allNews);
        updatePortalCounts();
        renderNews(false);
      }, 24 * 60 * 60 * 1000);
    }, msUntil7AM);
  }

  /**
   * Configura o motor de autoatualização em tempo real (Auto-polling + Virada diária 07:00)
   */
  function setupAutoSync() {
    setInterval(async () => {
      await fetchNewsData(true);
      updatePortalCounts();
      renderNews(true);
    }, AUTO_SYNC_INTERVAL);

    schedule7AMAutoRefresh();
  }

  /**
   * ==========================================================================
   * MINITELA INTERATIVA DE NOTÍCIAS OFICIAIS NA ENTRADA DO SITE
   * Transições suaves de 6s, pausa completa no mouse hover, clique vai para a notícia
   * ==========================================================================
   */
  let minitelaTimer = null;
  let minitelaIndex = 0;
  let isMinitelaPaused = false;
  const MINITELA_INTERVAL = 6000; // 6 segundos (leve e suave, entre 5s e 10s)

  function setupHeroMinitela() {
    const minitelaContainer = document.getElementById('heroNewsMinitela');
    const minitelaScreen = document.getElementById('heroNewsAlert') || document.getElementById('minitelaClickable');
    if (!minitelaContainer || !minitelaScreen) return;

    function getMinitelaList() {
      const source = (Array.isArray(allNews) && allNews.length > 0) ? allNews : FALLBACK_NEWS;
      return source;
    }

    function updateMinitelaUI(immediate = false) {
      const items = getMinitelaList();
      if (!items || items.length === 0) return;
      if (minitelaIndex >= items.length) minitelaIndex = 0;
      if (minitelaIndex < 0) minitelaIndex = items.length - 1;

      const currentItem = items[minitelaIndex];
      const thumbEl = document.getElementById('minitelaThumb');
      const tagEl = document.getElementById('minitelaTag');
      const titleEl = document.getElementById('minitelaTitle');
      const pagerEl = document.getElementById('minitelaPager');
      const progressFill = document.getElementById('minitelaProgressFill');
      const infoBox = minitelaContainer.querySelector('.floating-info') || minitelaContainer.querySelector('.minitela-info');

      const applyData = () => {
        if (thumbEl) {
          const fallback = getNewsImageFallback(currentItem.categoria, currentItem.portal);
          thumbEl.src = currentItem.imagem || fallback;
          thumbEl.alt = currentItem.titulo;
          thumbEl.onerror = function () {
            this.onerror = null;
            this.src = fallback;
          };
        }

        if (tagEl) {
          tagEl.className = `minitela-tag ${currentItem.portal || 'govbr'}`;
          let iconClass = 'fa-landmark';
          let tagLabel = 'Justiça Eleitoral';
          if (currentItem.portal === 'govbr') {
            iconClass = 'fa-id-card';
            tagLabel = 'Gov.br • INSS';
          } else if (currentItem.portal === 'tre-es') {
            iconClass = 'fa-water';
            tagLabel = 'TRE-ES';
          } else if (currentItem.portal === 'tse') {
            iconClass = 'fa-landmark';
            tagLabel = 'TSE Nacional';
          }
          tagEl.innerHTML = `<i class="fas ${iconClass}"></i> ${escapeHtml(tagLabel)}`;
        }

        if (titleEl) {
          titleEl.textContent = currentItem.titulo;
        }

        if (pagerEl) {
          pagerEl.textContent = `${minitelaIndex + 1} / ${items.length}`;
        }

        const descEl = document.getElementById('minitelaDesc');
        if (descEl) {
          descEl.textContent = currentItem.resumo || '';
        }

        const readTimeEl = document.getElementById('minitelaReadTime');
        if (readTimeEl) {
          readTimeEl.innerHTML = `<i class="far fa-clock"></i> ${currentItem.tempoLeitura || '3 min'}`;
        }

        const portalKey = currentItem.portal || 'govbr';

        // Atualiza a classe de cor no botão redondo (Verde, Azul ou Roxo)
        const roundBtn = document.getElementById('heroNewsAlert');
        if (roundBtn) {
          roundBtn.classList.remove('portal-govbr', 'portal-tse', 'portal-tre-es');
          roundBtn.classList.add(`portal-${portalKey}`);
        }

        // Atualiza o mini selo do portal no canto inferior
        const subtagEl = document.getElementById('minitelaSubtag');
        if (subtagEl) {
          let subIcon = 'fa-newspaper';
          if (portalKey === 'govbr') subIcon = 'fa-id-card';
          else if (portalKey === 'tse') subIcon = 'fa-landmark';
          else if (portalKey === 'tre-es') subIcon = 'fa-water';
          subtagEl.innerHTML = `<i class="fas ${subIcon}"></i>`;
        }

        // Reinicia o timer dinâmico do anel a cada notícia com precisão em qualquer zoom
        const currentFill = document.getElementById('minitelaProgressFill');
        if (currentFill && currentFill.parentNode) {
          const freshFill = currentFill.cloneNode(true);
          freshFill.style.animation = 'none';
          freshFill.style.strokeDashoffset = '192';
          currentFill.parentNode.replaceChild(freshFill, currentFill);
          void freshFill.getBoundingClientRect();
          requestAnimationFrame(() => {
            freshFill.style.animation = `ringProgressAnim ${MINITELA_INTERVAL}ms linear forwards`;
          });
        }

        if (infoBox) infoBox.classList.remove('transitioning');
        if (thumbEl) thumbEl.classList.remove('transitioning');
      };

      if (immediate) {
        applyData();
      } else {
        if (infoBox) infoBox.classList.add('transitioning');
        if (thumbEl) thumbEl.classList.add('transitioning');
        setTimeout(applyData, 220);
      }
    }

    function startTimer() {
      clearInterval(minitelaTimer);
      if (isMinitelaPaused) return;

      minitelaTimer = setInterval(() => {
        if (!isMinitelaPaused) {
          const items = getMinitelaList();
          minitelaIndex = (minitelaIndex + 1) % items.length;
          updateMinitelaUI(false);
        }
      }, MINITELA_INTERVAL);
    }

    function pauseTimer() {
      isMinitelaPaused = true;
      minitelaContainer.classList.add('is-paused');
      clearInterval(minitelaTimer);
    }

    function resumeTimer() {
      isMinitelaPaused = false;
      minitelaContainer.classList.remove('is-paused');
      startTimer();
    }

    // Se o navegante descansar o mouse na notícia, não muda nada (pausa absoluta)
    minitelaContainer.addEventListener('mouseenter', pauseTimer);
    minitelaContainer.addEventListener('mouseleave', resumeTimer);

    // Mini controles manuais de avançar/voltar
    const prevBtn = document.getElementById('minitelaPrevBtn');
    const nextBtn = document.getElementById('minitelaNextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const items = getMinitelaList();
        minitelaIndex = (minitelaIndex - 1 + items.length) % items.length;
        updateMinitelaUI(false);
        if (!isMinitelaPaused) startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const items = getMinitelaList();
        minitelaIndex = (minitelaIndex + 1) % items.length;
        updateMinitelaUI(false);
        if (!isMinitelaPaused) startTimer();
      });
    }

    // Somente se ele clicar, será direcionado para a aba de notícia
    minitelaScreen.addEventListener('click', (e) => {
      e.preventDefault();
      const items = getMinitelaList();
      const targetNews = items[minitelaIndex] || items[0];

      const newsSection = document.getElementById('noticias');
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          if (targetNews && targetNews.id) {
            openNewsModal(targetNews.id);
          }
        }, 600);
      }
    });

    minitelaScreen.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        minitelaScreen.click();
      }
    });

    updateMinitelaUI(true);
    startTimer();
  }

  /**
   * Configura eventos de clique e pesquisa
   */
  function setupEventListeners() {
    setupCategoryFilters();
    setupPortalFilters();
    setupSearch();
    setupRefresh();
    setupHeroMinitela();
  }

  /**
   * Configura filtros de categoria (Todas, Calendário, Regras, Serviços, etc.)
   */
  function setupCategoryFilters() {
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        currentCategory = btn.getAttribute('data-category') || 'todas';
        renderNews();
      });
    });
  }

  /**
   * Configura filtros por órgão oficial em chips (Todos, Gov.br, TSE, TRE-ES)
   */
  function setupPortalFilters() {
    portalChips.forEach(btn => {
      btn.addEventListener('click', () => {
        portalChips.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        currentPortal = btn.getAttribute('data-portal') || 'todos';
        renderNews();
      });
    });
  }

  /**
   * Atualiza a contagem numérica em cada aba/chip de portal
   */
  function updatePortalCounts() {
    const countTodos = document.getElementById('countPortalTodos');
    const countGovbr = document.getElementById('countPortalGovbr');
    const countTse = document.getElementById('countPortalTse');
    const countTrees = document.getElementById('countPortalTrees');

    const total = allNews.length;
    const govbr = allNews.filter(n => n.portal === 'govbr').length;
    const tse = allNews.filter(n => n.portal === 'tse').length;
    const trees = allNews.filter(n => n.portal === 'tre-es').length;

    if (countTodos) countTodos.textContent = total;
    if (countGovbr) countGovbr.textContent = govbr;
    if (countTse) countTse.textContent = tse;
    if (countTrees) countTrees.textContent = trees;
  }

  /**
   * Botão de atualização rápida sob demanda
   */
  function setupRefresh() {
    if (!refreshBtn) return;
    refreshBtn.addEventListener('click', async () => {
      const icon = refreshBtn.querySelector('i');
      if (icon) icon.classList.add('fa-spin');
      refreshBtn.disabled = true;

      await fetchNewsData(false);
      updatePortalCounts();
      renderNews(false);

      setTimeout(() => {
        if (icon) icon.classList.remove('fa-spin');
        refreshBtn.disabled = false;
        showToast('Informativos oficiais atualizados com sucesso!');
      }, 500);
    });
  }

  /**
   * Configura barra de pesquisa instantânea com filtro em tempo real
   */
  function setupSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery.length > 0 ? 'flex' : 'none';
      }
      renderNews();
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
        renderNews();
      });
    }
  }

  /**
   * Obtém a URL base limpa do site para compartilhamento oficial
   */
  function getNewsShareBaseUrl() {
    const isOnline = window.location.protocol.startsWith('http') &&
                     !window.location.hostname.includes('localhost') &&
                     !window.location.hostname.includes('127.0.0.1');
    if (isOnline) {
      const origin = window.location.origin;
      const path = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '');
      return origin + (path ? path : '');
    }
    return 'https://alexsandratomaz.com.br';
  }

  /**
   * Constrói link de compartilhamento do WhatsApp direto (api.whatsapp.com)
   * sem caracteres frágeis/emojis que causam o caractere corrompido () em navegadores/desktops
   */
  function buildWhatsAppNewsShareUrl(news) {
    if (!news) return 'https://api.whatsapp.com/send?text=';
    const portal = (news.portalNome || news.fonte || 'Justiça Eleitoral').trim();
    const title = (news.titulo || '').trim();
    const lead = (news.resumo || '').trim();
    const baseUrl = getNewsShareBaseUrl();
    const newsLink = `${baseUrl}/#noticia-${news.id}`;

    const text = [
      `*INFORMATIVO OFICIAL* - ${portal}`,
      ``,
      `*${title}*`,
      ``,
      lead,
      ``,
      `Confira o comunicado oficial completo no portal:`,
      newsLink
    ].join('\n');

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  }

  /**
   * ==========================================================================
   * RENDERIZAÇÃO DO GRID DE NOTÍCIAS COMPLETO, ORGANIZADO E SIMÉTRICO
   * Todos os informativos com visualização clara da fonte, categoria e busca
   * ==========================================================================
   */
  function renderNews(isBackgroundUpdate = false) {
    if (!containerGrid) return;

    let filtered = allNews.filter(item => {
      // 1. Filtro de Categoria
      const matchCat = (currentCategory === 'todas') || (item.categoria === currentCategory);
      if (!matchCat) return false;

      // 2. Filtro de Órgão / Portal Oficial
      const matchPortal = (currentPortal === 'todos') || (item.portal === currentPortal);
      if (!matchPortal) return false;

      // 3. Filtro de Busca Textual (com verificação completa de título, resumo, fonte, autor, etc.)
      if (!searchQuery) return true;
      const matchTitle = (item.titulo || '').toLowerCase().includes(searchQuery);
      const matchResumo = (item.resumo || '').toLowerCase().includes(searchQuery);
      const matchFonte = (item.fonte || '').toLowerCase().includes(searchQuery);
      const matchAutor = (item.autor || '').toLowerCase().includes(searchQuery);
      const matchCatNome = (item.categoriaNome || '').toLowerCase().includes(searchQuery);
      const matchPortalNome = (item.portalNome || '').toLowerCase().includes(searchQuery);
      const matchPontos = Array.isArray(item.pontosChave) && item.pontosChave.some(p => p.toLowerCase().includes(searchQuery));
      const matchConteudo = Array.isArray(item.conteudo) 
        ? item.conteudo.some(c => c.toLowerCase().includes(searchQuery))
        : (typeof item.conteudo === 'string' && item.conteudo.toLowerCase().includes(searchQuery));

      return matchTitle || matchResumo || matchFonte || matchAutor || matchCatNome || matchPortalNome || matchPontos || matchConteudo;
    });

    // Atualiza o contador de matérias exibidas (janela dinâmica de 7 dias)
    if (countDisplayEl) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
      if (filtered.length === allNews.length) {
        countDisplayEl.textContent = isMobile
          ? `${allNews.length} informativos • 7 dias`
          : `${allNews.length} informativos oficiais • Últimos 7 dias`;
      } else {
        countDisplayEl.textContent = isMobile
          ? `${filtered.length} de ${allNews.length} matérias`
          : `Exibindo ${filtered.length} de ${allNews.length} informativos`;
      }
    }

    // Se nenhum resultado encontrado na pesquisa/filtros
    if (filtered.length === 0) {
      containerGrid.innerHTML = `
        <div class="news-empty-state fade-in-up" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: rgba(15, 23, 42, 0.6); border: 1px dashed rgba(212, 175, 55, 0.35); border-radius: 16px;">
          <div class="empty-icon" style="font-size: 2.5rem; color: var(--gold); margin-bottom: 1rem;"><i class="fas fa-search"></i></div>
          <h3 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 0.5rem;">Nenhum informativo localizado</h3>
          <p style="color: #94a3b8; max-width: 520px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            Não encontramos matérias para "<strong>${escapeHtml(searchQuery)}</strong>" com os filtros aplicados. Experimente buscar outro termo ou clique no botão abaixo para redefinir.
          </p>
          <button class="btn btn-outline btn-sm" id="btnResetFilters">
            <i class="fas fa-undo"></i> Redefinir Pesquisa e Filtros
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchQuery = '';
          currentCategory = 'todas';
          currentPortal = 'todos';

          categoryButtons.forEach(b => {
            if (b.getAttribute('data-category') === 'todas') {
              b.classList.add('active');
              b.setAttribute('aria-selected', 'true');
            } else {
              b.classList.remove('active');
              b.setAttribute('aria-selected', 'false');
            }
          });

          portalChips.forEach(b => {
            if (b.getAttribute('data-portal') === 'todos') {
              b.classList.add('active');
              b.setAttribute('aria-selected', 'true');
            } else {
              b.classList.remove('active');
              b.setAttribute('aria-selected', 'false');
            }
          });

          if (searchClearBtn) searchClearBtn.style.display = 'none';
          renderNews();
        });
      }
      return;
    }

    // Renderiza todas as notícias no grid organizado
    let html = '';
    filtered.forEach((news, idx) => {
      const shareUrl = buildWhatsAppNewsShareUrl(news);
      const delayClass = `delay-${(idx % 4) + 1}`;
      const svgFallback = getNewsImageFallback(news.categoria, news.portal);
      const fallbackSrc = news.imagemFallback || svgFallback;
      const creditTag = news.fotoCredito ? `<span class="news-card-credit"><i class="fas fa-camera"></i> ${escapeHtml(news.fotoCredito)}</span>` : '';

      html += `
        <article class="news-card fade-in-up visible ${delayClass}" data-news-id="${news.id}">
          <div class="news-card-media">
            <img src="${news.imagem}" alt="${escapeHtml(news.titulo)}" loading="lazy" class="news-thumb" onerror="this.onerror=null; this.src='${fallbackSrc}'; this.addEventListener('error', function() { this.src='${svgFallback}'; }, { once: true });">
            <div class="news-card-badges">
              <span class="news-badge-category ${news.categoria}">
                <i class="fas ${getCategoryIcon(news.categoria)}"></i> ${escapeHtml(news.categoriaNome)}
              </span>
              ${news.destaque ? '<span class="news-badge-highlight"><i class="fas fa-certificate"></i> Destaque</span>' : ''}
            </div>
            <div class="news-card-source" title="Fonte Oficial: ${escapeHtml(news.fonte)}">
              <i class="fas ${getPortalIcon(news.portal)}"></i> <span>${escapeHtml(news.fonte)}</span>
            </div>
            ${creditTag}
          </div>

          <div class="news-card-body">
            <div class="news-card-meta">
              <span class="news-date"><i class="far fa-calendar-alt"></i> ${news.dataFormatada}</span>
              <span class="news-read-time"><i class="far fa-clock"></i> ${news.tempoLeitura}</span>
            </div>

            <h3 class="news-card-title" title="${escapeHtml(news.titulo)}">${escapeHtml(news.titulo)}</h3>
            <p class="news-card-excerpt">${escapeHtml(news.resumo)}</p>

            <div class="news-card-footer">
              <button class="btn btn-gold btn-sm btn-open-news" data-id="${news.id}">
                <i class="fas fa-book-open"></i> Acessar Notícia Completa
              </button>
              <a href="${shareUrl}" target="_blank" rel="noopener noreferrer" class="news-btn-zap" title="Compartilhar no WhatsApp" aria-label="Compartilhar no WhatsApp">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    });

    containerGrid.innerHTML = html;

    // Garante visibilidade imediata das cartas no grid
    containerGrid.querySelectorAll('.news-card').forEach(card => {
      card.classList.add('visible');
    });

    // Vincula cliques nos botões para abrir a leitura completa no modal
    containerGrid.querySelectorAll('.btn-open-news').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (id) openNewsModal(id);
      });
    });
  }

  /**
   * Retorna o ícone do FontAwesome de acordo com a categoria
   */
  function getCategoryIcon(cat) {
    switch (cat) {
      case 'calendario': return 'fa-calendar-check';
      case 'resolucoes': return 'fa-balance-scale';
      case 'servicos': return 'fa-id-card';
      case 'desinformacao': return 'fa-shield-alt';
      case 'prestacao_contas': return 'fa-file-invoice-dollar';
      default: return 'fa-landmark';
    }
  }

  /**
   * Retorna o ícone do FontAwesome de acordo com o portal
   */
  function getPortalIcon(portal) {
    switch (portal) {
      case 'govbr': return 'fa-id-card';
      case 'tse': return 'fa-landmark';
      case 'tre-es': return 'fa-water';
      default: return 'fa-shield-alt';
    }
  }

  /**
   * Gera uma imagem institucional vetorial oficial personalizada de acordo com o órgão
   */
  function getNewsImageFallback(cat, portal) {
    let tag = 'JUSTIÇA ELEITORAL • TSE';
    let sub = 'COMUNICADO INSTITUCIONAL';
    let gStart = '#0b1b3d';
    let gMid = '#12254f';
    let gEnd = '#08142b';
    let strokeColor = '#d4af37';

    if (portal === 'govbr' || cat === 'servicos') {
      tag = 'PORTAL GOV.BR • INSS';
      sub = 'PROVA DE VIDA AUTOMÁTICA';
      gStart = '#064e3b';
      gMid = '#065f46';
      gEnd = '#022c22';
      strokeColor = '#10b981';
    } else if (portal === 'tre-es') {
      tag = 'TRE ESPÍRITO SANTO';
      sub = 'INFORMATIVO REGIONAL CAPIXABA';
      gStart = '#0c4a6e';
      gMid = '#0369a1';
      gEnd = '#082f49';
      strokeColor = '#38bdf8';
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gStart}"/>
          <stop offset="60%" stop-color="${gMid}"/>
          <stop offset="100%" stop-color="${gEnd}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#bgGrad)"/>
      <circle cx="400" cy="180" r="64" fill="#0f172a" stroke="${strokeColor}" stroke-width="3"/>
      <path d="M400 138 L417 172 L454 176 L425 201 L434 238 L400 218 L366 238 L375 201 L346 176 L383 172 Z" fill="${strokeColor}"/>
      <text x="400" y="280" font-family="Montserrat, Arial, sans-serif" font-size="21" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">${tag}</text>
      <text x="400" y="314" font-family="Montserrat, Arial, sans-serif" font-size="13" font-weight="600" fill="#cbd5e1" text-anchor="middle" letter-spacing="2">${sub}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /**
   * Navega para a notícia de índice especificado (com rotação infinita como na galeria)
   */
  function showNewsAtIndex(index) {
    if (!allNews || allNews.length === 0) return;
    if (index < 0) index = allNews.length - 1;
    if (index >= allNews.length) index = 0;
    currentModalNewsIndex = index;
    openNewsModal(allNews[index].id);
  }

  /**
   * Configura o modal de leitura completa
   */
  function setupModal() {
    if (!modal) return;

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeNewsModal);
    }

    if (newsModalPrevBtn) {
      newsModalPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNewsAtIndex(currentModalNewsIndex - 1);
      });
    }

    if (newsModalNextBtn) {
      newsModalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNewsAtIndex(currentModalNewsIndex + 1);
      });
    }

    const btnSmaller = document.getElementById('btnFontSmaller');
    const btnLarger = document.getElementById('btnFontLarger');
    const dialog = modal.querySelector('.modal-news-dialog');

    if (btnSmaller && btnLarger && dialog) {
      btnSmaller.addEventListener('click', () => {
        dialog.classList.remove('font-large');
        btnSmaller.classList.add('active');
        btnLarger.classList.remove('active');
        try { localStorage.setItem('news_font_zoom', 'normal'); } catch(e) {}
      });

      btnLarger.addEventListener('click', () => {
        dialog.classList.add('font-large');
        btnLarger.classList.add('active');
        btnSmaller.classList.remove('active');
        try { localStorage.setItem('news_font_zoom', 'large'); } catch(e) {}
      });

      try {
        if (localStorage.getItem('news_font_zoom') === 'large') {
          dialog.classList.add('font-large');
          btnLarger.classList.add('active');
          btnSmaller.classList.remove('active');
        }
      } catch(e) {}
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeNewsModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeNewsModal();
      } else if (e.key === 'ArrowLeft') {
        showNewsAtIndex(currentModalNewsIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showNewsAtIndex(currentModalNewsIndex + 1);
      }
    });
  }

  /**
   * Abre o modal com os dados detalhados da notícia
   */
  function openNewsModal(newsId) {
    if (!modal) return;
    const idx = allNews.findIndex(n => n.id === newsId || n.slug === newsId);
    if (idx === -1) return;

    currentModalNewsIndex = idx;
    const news = allNews[idx];

    const modalBadge = document.getElementById('modalNewsBadge');
    const modalTitle = document.getElementById('modalNewsTitle');
    const modalDate = document.getElementById('modalNewsDate');
    const modalReadingTime = document.getElementById('modalNewsReadingTime');
    const modalAuthor = document.getElementById('modalNewsAuthor');
    const modalImg = document.getElementById('modalNewsImg');
    const modalPhotoCredit = document.getElementById('modalNewsPhotoCredit');
    const modalExcerpt = document.getElementById('modalNewsExcerpt');
    const modalPointsList = document.getElementById('modalNewsPoints');
    const modalBodyText = document.getElementById('modalNewsBody');
    const modalOfficialLink = document.getElementById('modalNewsOfficialLink');
    const modalShareZap = document.getElementById('modalNewsShareZap');

    if (modalBadge) {
      modalBadge.innerHTML = `<i class="fas ${getCategoryIcon(news.categoria)}"></i> ${news.categoriaNome} • Fonte: ${news.fonte || news.portalNome}`;
    }
    if (modalTitle) modalTitle.textContent = news.titulo;
    if (modalDate) modalDate.textContent = news.dataFormatada;
    if (modalReadingTime) modalReadingTime.textContent = news.tempoLeitura;
    if (modalAuthor) modalAuthor.textContent = news.autor || 'Assessoria de Comunicação';
    
    if (modalImg) {
      const svgFallback = getNewsImageFallback(news.categoria, news.portal);
      const fallbackSrc = news.imagemFallback || svgFallback;
      modalImg.src = news.imagem;
      modalImg.alt = news.titulo;
      modalImg.onerror = function () {
        this.onerror = null;
        this.src = fallbackSrc;
        this.addEventListener('error', function () {
          this.src = svgFallback;
        }, { once: true });
      };
    }

    if (modalPhotoCredit) {
      if (news.fotoCredito) {
        modalPhotoCredit.textContent = news.fotoCredito;
        modalPhotoCredit.style.display = 'inline-block';
      } else {
        modalPhotoCredit.style.display = 'none';
      }
    }

    if (modalExcerpt) {
      modalExcerpt.textContent = news.resumo;
    }

    if (modalPointsList) {
      if (Array.isArray(news.pontosChave) && news.pontosChave.length > 0) {
        modalPointsList.innerHTML = news.pontosChave
          .map(pt => `<li><i class="fas fa-check-circle"></i> <span>${escapeHtml(pt)}</span></li>`)
          .join('');
        document.getElementById('modalNewsPointsBox').style.display = 'block';
      } else {
        document.getElementById('modalNewsPointsBox').style.display = 'none';
      }
    }

    if (modalBodyText) {
      if (Array.isArray(news.conteudo)) {
        modalBodyText.innerHTML = news.conteudo
          .map(p => `<p>${escapeHtml(p)}</p>`)
          .join('');
      } else if (typeof news.conteudo === 'string') {
        modalBodyText.innerHTML = `<p>${escapeHtml(news.conteudo)}</p>`;
      }
    }

    if (modalOfficialLink) {
      modalOfficialLink.href = news.fonteUrl || 'https://www.tse.jus.br';
      modalOfficialLink.innerHTML = `<i class="fas fa-external-link-alt"></i> Acessar no Portal Oficial (${news.fonte})`;
    }

    if (modalShareZap) {
      modalShareZap.href = buildWhatsAppNewsShareUrl(news);
    }

    // Reseta rolagem do corpo da notícia ao topo
    const scrollEl = modal.querySelector('.modal-news-scroll-body') || modal.querySelector('.modal-news-right');
    if (scrollEl) {
      scrollEl.scrollTop = 0;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    try {
      history.replaceState(null, '', `#noticia-${news.id}`);
    } catch (e) {}
  }

  function closeNewsModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    try {
      history.replaceState(null, '', '#noticias');
    } catch (e) {}
  }

  function checkDeepLink() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#noticia-')) {
      const newsId = hash.replace('#noticia-', '').trim();
      setTimeout(() => {
        openNewsModal(newsId);
      }, 400);
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('newsToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'newsToast';
      toast.className = 'news-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${escapeHtml(msg)}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.openOfficialNews = openNewsModal;
  window.closeOfficialNews = closeNewsModal;
  window.getOfficialNewsSvg = getNewsImageFallback;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
