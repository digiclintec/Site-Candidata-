/* ==========================================================================
   PORTAL OFICIAL - ALEXSANDRA TOMAZ 2223
   main.js - Navegação fluida, animações e player de vídeo popup
   ========================================================================== */

function startApp() {
  try { initNavbar(); } catch (e) { console.warn('[NAVBAR]', e); }
  try { initScrollAnimations(); } catch (e) { console.warn('[ANIMATIONS]', e); }
  try { initVideoModal(); } catch (e) { console.warn('[VIDEOS]', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

/* --------------------------------------------------------------------------
   1. NAVBAR & MENU MOBILE
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.header-navbar');
  if (!navbar) return;
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Efeito de scroll na navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

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
   2. OBSERVER DE ANIMAÇÃO AO ROLAR (FADE-IN-UP COM RESILIÊNCIA TOTAL NO IOS)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  // 1. Revela imediatamente tudo o que já estiver visível na tela inicial
  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('visible');
    }
  });

  // 2. Garantia anti-tela-escura: após 400ms, garante que todo o conteúdo apareça no iOS
  setTimeout(() => {
    animatedElements.forEach(el => el.classList.add('visible'));
  }, 400);

  // 3. Se o navegador não suportar IntersectionObserver, revela tudo
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '60px 0px 60px 0px'
  });

  animatedElements.forEach(el => {
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });
}

/* --------------------------------------------------------------------------
   3. MODAL DE VÍDEOS OFICIAIS (ALTA PERFORMANCE NO MOBILE & IPHONE)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const videoModal = document.getElementById('videoModal');
  if (!videoModal) return;

  const videoIframe = document.getElementById('videoIframe');
  const videoLoader = document.getElementById('videoLoader');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalShareZap = document.getElementById('videoModalShareZap');
  const videoModalDirect = document.getElementById('videoModalDirect');
  const closeBtn = videoModal.querySelector('.video-modal-close');

  function openVideo(videoId, videoTitle) {
    if (!videoId) {
      alert('Vídeo em preparação. Em breve disponível no portal oficial!');
      return;
    }

    // Feedback visual imediato: exibe o spinner enquanto o iframe conecta
    if (videoLoader) {
      videoLoader.style.display = 'flex';
    }

    if (videoIframe) {
      videoIframe.onload = () => {
        if (videoLoader) videoLoader.style.display = 'none';
      };

      // No iOS/Safari, youtube.com com playsinline=1 inicia muito mais rápido que youtube-nocookie
      videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&controls=1&enablejsapi=1`;
    }

    if (videoModalTitle) {
      videoModalTitle.textContent = videoTitle || 'Alexsandra Tomaz 2223 • Deputada Federal';
    }

    if (videoModalDirect) {
      videoModalDirect.href = `https://www.youtube.com/watch?v=${videoId}`;
    }

    if (videoModalShareZap) {
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
    if (videoIframe) {
      videoIframe.src = '';
    }
    if (videoLoader) {
      videoLoader.style.display = 'none';
    }
  }

  // Event listeners para cards de vídeo (leves e diretos, sem sobrecarga de rede)
  document.querySelectorAll('.video-card').forEach(card => {
    const videoId = card.getAttribute('data-video-id');
    const videoTitle = card.getAttribute('data-video-title');

    card.addEventListener('click', (e) => {
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
