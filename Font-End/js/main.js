/* ==========================================================================
   PORTAL OFICIAL - ALEXSANDRA TOMAZ 2223
   main.js - Navegação fluida, animações e player de vídeo popup
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
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

    // Fechar menu ao clicar em qualquer link ou botão interno
    navMenu.querySelectorAll('a').forEach(link => {
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
   2. OBSERVER DE ANIMAÇÃO AO ROLAR (FADE-IN-UP)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. MODAL DE VÍDEOS OFICIAIS (PLAYER EMBED LIMPO, SEM BRANDING DO YOUTUBE)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const videoModal = document.getElementById('videoModal');
  if (!videoModal) return;

  const videoIframe = document.getElementById('videoIframe');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalShareZap = document.getElementById('videoModalShareZap');
  const closeBtn = videoModal.querySelector('.video-modal-close');

  function openVideo(videoId, videoTitle) {
    if (!videoId) {
      alert('Vídeo em preparação. Em breve disponível no portal oficial!');
      return;
    }
    if (videoIframe) {
      // Parâmetros para ocultar ao máximo elementos da plataforma YouTube:
      // 1. youtube-nocookie.com: minimiza tracking e cookies de terceiros
      // 2. modestbranding=1: remove logo do YouTube na barra
      // 3. rel=0: restringe vídeos recomendados estritamente ao canal oficial
      // 4. iv_load_policy=3: desativa anotações/cards intrusivos
      // 5. playsinline=1: mantém o vídeo no modal do site em smartphones
      // 6. controls=1 & color=white: controles essenciais limpos
      videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&controls=1&color=white`;
    }
    if (videoModalTitle) {
      videoModalTitle.textContent = videoTitle || 'Alexsandra Tomaz 2223 • Deputada Federal';
    }
    if (videoModalShareZap) {
      // Se o site estiver rodando em domínio online real (ex: https://seudominio.com), usa o link do site; caso contrário, usa o Instagram oficial confirmado
      const isOnlineSite = window.location.protocol.startsWith('http') && 
                           !window.location.hostname.includes('localhost') && 
                           !window.location.hostname.includes('127.0.0.1');
      const shareUrl = isOnlineSite ? window.location.href : 'https://www.instagram.com/alexsandra_pl_itapemirim/';

      const shareText = encodeURIComponent(
        `Assista ao vídeo oficial de Alexsandra Tomaz (Deputada Federal 2223 • PL Espírito Santo):\n` +
        `"${videoTitle || 'Compromisso com o Espírito Santo e com o Brasil'}"\n\n` +
        `Acompanhe as novidades oficiais:\n${shareUrl}`
      );
      videoModalShareZap.href = `https://api.whatsapp.com/send?text=${shareText}`;
    }
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    // Interrompe imediatamente áudio e reprodução
    if (videoIframe) {
      videoIframe.src = '';
    }
  }

  // Event listeners para cards de vídeo
  document.querySelectorAll('.video-card').forEach(card => {
    const videoId = card.getAttribute('data-video-id');
    const videoTitle = card.getAttribute('data-video-title');

    card.addEventListener('click', (e) => {
      e.preventDefault();
      openVideo(videoId, videoTitle);
    });

    // Resolução progressiva para máxima nitidez (720p HD / WebP)
    const thumbImg = card.querySelector('.video-thumb-img');
    if (thumbImg && videoId) {
      const hdCandidates = [
        `https://i.ytimg.com/vi_webp/${videoId}/hq720.webp`,
        `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
        `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      ];

      let candidateIndex = 0;
      function probeNextCandidate() {
        if (candidateIndex >= hdCandidates.length) return;
        const candidateUrl = hdCandidates[candidateIndex++];
        const tester = new Image();
        tester.onload = function() {
          // Se for maior que 120px (não é o placeholder vazio padrão do YouTube), aplica imediatamente
          if (this.naturalWidth > 120) {
            thumbImg.src = candidateUrl;
          } else {
            probeNextCandidate();
          }
        };
        tester.onerror = probeNextCandidate;
        tester.src = candidateUrl;
      }
      probeNextCandidate();
    }
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
