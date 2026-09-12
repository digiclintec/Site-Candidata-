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
   3. MODAL DE VÍDEOS OFICIAIS (PLAYER EMBED COM AUTOPLAY E PARADA AUTOMÁTICA)
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
      // Se clicou no link externo direto do YouTube, navega normalmente
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
