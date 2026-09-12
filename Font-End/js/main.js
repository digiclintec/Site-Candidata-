/* ==========================================================================
   PORTAL OFICIAL - ALEXSANDRA TOMAZ
   main.js - Lógica de Navegação, Filtros, Contadores e Modais
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initProposalFilters();
  initScrollAnimations();
  initModals();
  initVideoModal();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MENU MOBILE
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.header-navbar');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Efeito de scroll na navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle do menu mobile
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. ANIMAÇÃO DE CONTADORES DE IMPACTO
   -------------------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-value[data-target]');
  if (!counterElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${prefix}${Math.floor(current).toLocaleString('pt-BR')}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-counter-bar');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   3. FILTROS DE BANDEIRAS E PROPOSTAS
   -------------------------------------------------------------------------- */
function initProposalFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const proposalCards = document.querySelectorAll('.proposal-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Suavemente centraliza a aba ativa no scroll horizontal mobile
      if (window.innerWidth <= 768) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      const category = btn.getAttribute('data-filter');

      proposalCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. OBSERVER DE ANIMAÇÃO AO ROLAR (FADE-IN-UP)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. MODAL INTERATIVO DOS 7 PILARES OFICIAIS
   -------------------------------------------------------------------------- */
const proposalData = {
  familia: {
    tag: "Pilar 01 • Princípios e Família",
    title: "Família Forte e Liberdade Religiosa",
    content: `
      <p>Defender políticas de fortalecimento da família e a liberdade dos pais na formação dos filhos, além da proteção ao livre exercício da fé e das manifestações religiosas dentro dos limites constitucionais.</p>
      
      <h4>Diretrizes Prioritárias:</h4>
      <ul>
        <li><strong>Defesa da liberdade religiosa:</strong> Garantia plena do direito de culto e crença para todos os cidadãos.</li>
        <li><strong>Valorização da família:</strong> Reconhecimento da família como núcleo fundamental e insubstituível da sociedade.</li>
        <li><strong>Educação e Pais:</strong> Participação ativa e soberana dos pais na educação moral e formação dos seus filhos.</li>
        <li><strong>Proteção da Infância:</strong> Salvaguarda de crianças e adolescentes contra qualquer tipo de abuso ou doutrinação indevida.</li>
        <li><strong>Dignidade e Segurança:</strong> Políticas públicas que respeitem e promovam a integridade de mulheres, crianças e lares.</li>
      </ul>
    `
  },
  trabalho: {
    tag: "Pilar 02 • Dignidade Social e Renda",
    title: "Trabalho que Compensa",
    content: `
      <p>Defender um modelo no qual a entrada no mercado formal não represente uma perda abrupta de proteção social para famílias de baixa renda.</p>
      
      <p>A proposta é estudar mecanismos de transição que estimulem o beneficiário a aceitar um emprego formal e conquistar independência financeira, em vez de criar uma escolha forçada entre trabalhar registrado ou manter integralmente determinado benefício.</p>
      
      <h4>Objetivo Central:</h4>
      <div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid var(--gold); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <strong style="color: var(--gold);">Transformar a assistência social em ponte para a autonomia, o emprego e a renda digna.</strong>
      </div>

      <h4>Ações Estruturantes:</h4>
      <ul>
        <li>Incentivo real à formalização sem penalização automática e imediata.</li>
        <li>Programas de capacitação prática integrados às vagas do mercado local.</li>
        <li>Estímulo à emancipação econômica duradoura das famílias beneficiárias.</li>
      </ul>
    `
  },
  "seguranca-juridica": {
    tag: "Pilar 03 • Negócios e Emprego",
    title: "Segurança Jurídica para Quem Emprega",
    content: `
      <p>Alexsandra conhece como empresária as dificuldades de contratar e manter trabalhadores formalmente. Sua bandeira é buscar regras mais simples, claras e seguras para pequenas empresas e empregadores, preservando integralmente os direitos legais dos trabalhadores.</p>
      
      <h4>Diretrizes e Compromissos:</h4>
      <ul>
        <li><strong>Simplificação da contratação:</strong> Desburocratizar os processos para quem gera oportunidades de trabalho.</li>
        <li><strong>Redução da burocracia:</strong> Eliminar exigências redundantes que travam o crescimento dos pequenos negócios.</li>
        <li><strong>Incentivos à formalização:</strong> Criar condições para a geração de novos postos de trabalho com carteira assinada.</li>
        <li><strong>Segurança jurídica:</strong> Regras claras e estabilidade nas relações entre contratantes e colaboradores.</li>
        <li><strong>Apoio aos autônomos:</strong> Estímulo à formalização e proteção de trabalhadores autônomos e prestadores de serviço.</li>
        <li><strong>Crescimento das equipes:</strong> Redução dos obstáculos e custos acessórios para que as pequenas empresas possam expandir seu quadro de funcionários.</li>
      </ul>
    `
  },
  caminhoneiros: {
    tag: "Pilar 04 • Transporte de Cargas",
    title: "Caminhoneiros e Quem Vive da Estrada",
    content: `
      <p>Como caminhoneira, Alexsandra pretende levar para Brasília pautas construídas a partir da realidade vivida na pele por quem trabalha dia e noite transportando as riquezas que alimentam e constroem o país.</p>
      
      <h4>Prioridades da Categoria:</h4>
      <ul>
        <li><strong>Segurança nas rodovias:</strong> Combate ostensivo ao roubo de cargas e à violência nas principais rotas de transporte.</li>
        <li><strong>Condições de trabalho e descanso:</strong> Espaços dignos, banheiros limpos e pontos seguros de parada e pernoite.</li>
        <li><strong>Infraestrutura viária:</strong> Fiscalização e investimento em estradas de qualidade, reduzindo quebras mecânicas e acidentes.</li>
        <li><strong>Combate a custos abusivos:</strong> Redução de taxas e entraves burocráticos que sufocam a rentabilidade do frete.</li>
        <li><strong>Valorização profissional:</strong> Reconhecimento e representação legítima dos caminhoneiros autônomos no parlamento.</li>
      </ul>
    `
  },
  mulheres: {
    tag: "Pilar 05 • Representatividade Real",
    title: "Mais Voz para as Mulheres",
    content: `
      <p>Defender maior participação feminina nos espaços de decisão política, especialmente na Câmara dos Deputados e no Congresso Nacional.</p>
      
      <p>Alexsandra pretende levar para Brasília a experiência de mulheres que acumulam responsabilidades reais do dia a dia como <strong>mães, esposas, profissionais, empresárias e trabalhadoras</strong>.</p>
      
      <h4>Nossa Visão:</h4>
      <ul>
        <li><strong>Representatividade plural:</strong> Ampliar a presença feminina sem tratar as mulheres como um grupo homogêneo, respeitando diferentes valores, crenças e visões de sociedade.</li>
        <li><strong>Suporte à mulher provedora:</strong> Apoio concreto às mulheres que conciliam família, trabalho e empreendedorismo.</li>
        <li><strong>Proteção e Dignidade:</strong> Políticas efetivas de segurança física e jurídica para a mulher.</li>
      </ul>
    `
  },
  seguranca: {
    tag: "Pilar 06 • Ordem e Cidadania",
    title: "Segurança Pública e Combate à Impunidade",
    content: `
      <p>Defender legislação e políticas que fortaleçam o enfrentamento à criminalidade, valorizem as forças de segurança e reduzam a sensação de impunidade que atinge a sociedade.</p>
      
      <h4>Diretrizes de Atuação:</h4>
      <ul>
        <li><strong>Combate ao crime organizado:</strong> Asfixia financeira das facções e reforço nas ações de inteligência e fronteiras.</li>
        <li><strong>Proteção às vítimas:</strong> Centralidade e assistência integral aos cidadãos de bem atingidos pela violência.</li>
        <li><strong>Valorização dos policiais:</strong> Respaldo jurídico, equipamentos de qualidade e reconhecimento aos agentes da segurança pública.</li>
        <li><strong>Aperfeiçoamento penal:</strong> Leis mais firmes dentro das garantias constitucionais para coibir a reincidência.</li>
        <li><strong>Prevenção à violência familiar:</strong> Ações preventivas e punição rigorosa a agressões contra mulheres, crianças e lares.</li>
        <li><strong>Cumprimento efetivo da lei:</strong> Fim das brechas que alimentam a impunidade.</li>
      </ul>
    `
  },
  empreendedorismo: {
    tag: "Pilar 07 • Desenvolvimento Econômico",
    title: "Empreendedorismo e Geração de Emprego",
    content: `
      <p>Usar a experiência empresarial de Alexsandra Tomaz para defender quem produz, investe, arrisca e gera empregos no Brasil.</p>
      
      <h4>Prioridades Econômicas:</h4>
      <ul>
        <li><strong>Menos burocracia para pequenos negócios:</strong> Facilidade para abrir, licenciar e expandir micro e pequenas empresas.</li>
        <li><strong>Ambiente favorável a investimentos:</strong> Previsibilidade e incentivo a quem gera emprego local.</li>
        <li><strong>Incentivo ao empreendedorismo:</strong> Acesso simplificado a capacitação e linhas de fomento produtivo.</li>
        <li><strong>Valorização dos empresários:</strong> Reconhecimento do papel crucial do comerciante, prestador de serviços e pequeno industrial.</li>
        <li><strong>Qualificação profissional:</strong> Conectar a formação técnica às reais necessidades das empresas.</li>
        <li><strong>Aproximação social:</strong> Unir assistência, capacitação técnica e inserção direta no mercado de trabalho.</li>
      </ul>
    `
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('infoModal');
  if (!modalBackdrop) return;

  const modalCloseBtn = modalBackdrop.querySelector('.modal-close-btn');
  const modalTag = modalBackdrop.querySelector('.modal-tag');
  const modalTitle = modalBackdrop.querySelector('.modal-title');
  const modalBody = modalBackdrop.querySelector('.modal-body');

  // Abrir modal de proposta
  document.querySelectorAll('[data-open-proposal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proposalKey = btn.getAttribute('data-open-proposal');
      const data = proposalData[proposalKey];
      if (data) {
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        openModal(modalBackdrop);
      }
    });
  });

  // Fechar no botão X
  modalCloseBtn.addEventListener('click', () => {
    closeModal(modalBackdrop);
  });

  // Fechar ao clicar fora
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal(modalBackdrop);
    }
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal(modalBackdrop);
    }
  });
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   6. MODAL DE VÍDEOS OFICIAIS (PLAYER EMBED COM AUTOPLAY E PARADA AUTOMÁTICA)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const videoModal = document.getElementById('videoModal');
  if (!videoModal) return;

  const videoIframe = document.getElementById('videoIframe');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalExternalLink = document.getElementById('videoModalExternalLink');
  const closeBtn = videoModal.querySelector('.video-modal-close');

  function openVideo(videoId, videoTitle) {
    if (!videoId) return;
    if (videoIframe) {
      videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    }
    if (videoModalTitle) {
      videoModalTitle.textContent = videoTitle || 'Alexsandra Tomaz 2223';
    }
    if (videoModalExternalLink) {
      videoModalExternalLink.href = `https://youtube.com/shorts/${videoId}`;
    }
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    // Interrompe imediatamente o áudio e reprodução do vídeo
    if (videoIframe) {
      videoIframe.src = '';
    }
  }

  // Event listeners para cards de vídeo com videoId
  document.querySelectorAll('.video-card[data-video-id]').forEach(card => {
    const videoId = card.getAttribute('data-video-id');
    const videoTitle = card.getAttribute('data-video-title');

    card.addEventListener('click', (e) => {
      // Se clicou no link externo direto do YouTube, deixa navegar
      if (e.target.closest('.video-link-external')) {
        return;
      }
      e.preventDefault();
      openVideo(videoId, videoTitle);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideo();
    });
  }

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideo();
    }
  });
}

