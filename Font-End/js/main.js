/* ==========================================================================
   PORTAL OFICIAL - ALEXSANDRA TOMAZ 2223
   main.js - Navegação fluida, animações e player de vídeo popup
   ========================================================================== */

// Desativa a restauração automática de rolagem do navegador para garantir
// que qualquer atualização (reload/F5/pull-to-refresh) volte sempre à tela de início
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

let pageReloadHandled = false;

function isPageReload() {
  if (pageReloadHandled) return false;
  try {
    const navEntries = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation') : [];
    if (navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    if (window.performance && performance.navigation) {
      return performance.navigation.type === 1;
    }
  } catch (e) {}
  return false;
}

function resetToHomeScreen() {
  // Limpa parâmetros e âncoras da URL (como ?video=..., ?foto=..., #videos, #compromissos)
  try {
    history.replaceState(null, '', window.location.pathname);
  } catch (e) {}

  // Fecha qualquer modal que pudesse estar aberto e cancela vídeos em reprodução
  const vModal = document.getElementById('videoModal');
  if (vModal) {
    vModal.classList.remove('active');
    const vIframe = document.getElementById('videoIframe');
    if (vIframe) vIframe.src = '';
  }
  const pModal = document.getElementById('photoModal');
  if (pModal) {
    pModal.classList.remove('active');
  }
  const nModal = document.getElementById('newsModal');
  if (nModal) {
    nModal.classList.remove('active');
  }
  document.body.style.overflow = '';

  // Rola instantaneamente para o topo absoluto (Tela Inicial)
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Atualiza classe ativa da navbar para "Início"
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '#inicio') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Executa o reset de rolagem no boot se a página foi recarregada
if (isPageReload()) {
  resetToHomeScreen();
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    resetToHomeScreen();
  }
});

function startApp() {
  if (isPageReload()) {
    resetToHomeScreen();
  }
  // Marca o reset de reload como concluído para que todos os cliques de navegação funcionem livremente
  pageReloadHandled = true;

  try { initNavbar(); } catch (e) { console.warn('[NAVBAR]', e); }
  try { initScrollAnimations(); } catch (e) { console.warn('[ANIMATIONS]', e); }
  try { initPhotoGallery(); } catch (e) { console.warn('[GALLERY]', e); }
  try { initVideoModal(); } catch (e) { console.warn('[VIDEOS]', e); }
  try { handleDirectHash(); } catch (e) { console.warn('[HASH]', e); }
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

    // Fechar automaticamente se a tela for redimensionada para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200 && window.innerHeight > 650 && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }, { passive: true });
  }

  // Navegação suave com clique nos links do menu e compensação da navbar flutuante
  const navAnchors = document.querySelectorAll('.brand-logo, .nav-link, .nav-menu a, .hero-ctas a, .footer-links a');

  function getFloatingHeaderOffset() {
    if (!navbar) return 95;
    const rect = navbar.getBoundingClientRect();
    const topOffset = rect.top > 0 ? rect.top : (window.scrollY > 40 ? 10 : 16);
    return Math.round(rect.height + topOffset + 16);
  }

  navAnchors.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || !href.startsWith('#')) return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();

        // Fechar menu mobile se estiver aberto
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          if (toggleBtn) {
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }

        // Rolar suavemente com compensação dinâmica da aba flutuante
        if (href === '#inicio') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          try {
            history.pushState(null, '', window.location.pathname);
          } catch (err) {}
        } else {
          const offset = getFloatingHeaderOffset();
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });

          try {
            history.pushState(null, '', href);
          } catch (err) {}
        }

        // Atualizar estado ativo na navbar
        document.querySelectorAll('.nav-link').forEach(nl => {
          if (nl.getAttribute('href') === href) {
            nl.classList.add('active');
          } else {
            nl.classList.remove('active');
          }
        });

        // Revelar elementos caso ainda estejam aguardando animação
        targetElement.classList.add('visible');
        targetElement.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
      }
    });
  });

  // ScrollSpy: destaca o link da seção ativa conforme a página é rolada
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  function updateScrollSpy() {
    const currentOffset = navbar ? (navbar.offsetHeight + 35) : 100;
    const scrollPos = window.pageYOffset + currentOffset;
    let currentId = 'inicio';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 80) {
      currentId = 'contato';
    }

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();
}

/* --------------------------------------------------------------------------
   2. OBSERVER DE ANIMAÇÃO AO ROLAR (TRANSIÇÕES SUAVES E FLUIDAS)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  // Se o navegador não suportar IntersectionObserver, revela tudo imediatamente
  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('visible'));
    return;
  }

  // Observer com transição marcante conforme os boxes entram na tela ao rolar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -25px 0px'
  });

  animatedElements.forEach(el => {
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });

  // Fallback de segurança generoso para garantir que tudo seja visível
  setTimeout(() => {
    animatedElements.forEach(el => el.classList.add('visible'));
  }, 4000);
}

/* --------------------------------------------------------------------------
   3. GALERIA DE FOTOS & MODAL LIGHTBOX (LEVE, RÁPIDO E INTUITIVO)
   -------------------------------------------------------------------------- */
function initPhotoGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const photoModal = document.getElementById('photoModal');

  // Filtros por Categoria com transição suave
  if (filterBtns.length && galleryCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden-filter');
            setTimeout(() => card.classList.add('visible'), 30);
          } else {
            card.classList.add('hidden-filter');
          }
        });
      });
    });
  }

  // Lightbox Modal para Fotos e Legendas Enfatizadas
  if (photoModal && galleryCards.length) {
    const modalImg = document.getElementById('modalPhotoImg');
    const modalBadge = document.getElementById('modalPhotoBadge');
    const modalTitle = document.getElementById('modalPhotoTitle');
    const modalQuote = document.getElementById('modalPhotoQuote');
    const modalText = document.getElementById('modalPhotoText');
    const modalPoints = document.getElementById('modalPhotoPoints');
    const modalShareZap = document.getElementById('modalPhotoShareZap');
    const closeBtn = photoModal.querySelector('.photo-modal-close');
    const prevBtn = photoModal.querySelector('.photo-modal-nav.prev');
    const nextBtn = photoModal.querySelector('.photo-modal-nav.next');

    const cardsArray = Array.from(galleryCards);
    let currentIndex = 0;

    function renderCardInModal(index) {
      if (index < 0) index = cardsArray.length - 1;
      if (index >= cardsArray.length) index = 0;
      currentIndex = index;

      const card = cardsArray[currentIndex];
      const img = card.querySelector('.gallery-card-img');
      const badge = card.querySelector('.gallery-caption-badge');
      const title = card.querySelector('.gallery-caption-title');
      const quote = card.querySelector('.gallery-caption-quote');
      const desc = card.querySelector('.gallery-caption-text');
      const points = card.querySelector('.gallery-points-list');

      if (modalImg && img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Foto Oficial Alexsandra Tomaz';
      }

      if (modalBadge && badge) {
        modalBadge.innerHTML = badge.innerHTML;
      }

      if (modalTitle && title) {
        modalTitle.textContent = title.textContent.trim();
      }

      if (modalQuote && quote) {
        modalQuote.textContent = quote.textContent.trim();
        modalQuote.style.display = 'block';
      } else if (modalQuote) {
        modalQuote.style.display = 'none';
      }

      if (modalText && desc) {
        modalText.textContent = desc.textContent.trim();
      }

      if (modalPoints && points) {
        modalPoints.innerHTML = points.innerHTML;
      }

      const cardId = card.getAttribute('data-card-id') || (currentIndex + 1);
      const cardTitle = title ? title.textContent.trim() : 'Alexsandra Tomaz 2223';
      const cardQuote = quote ? quote.textContent.trim() : '';
      const cardTag = badge ? badge.textContent.trim() : 'Propostas com Clareza';
      const cardImgSrc = img ? img.src : '';

      if (modalShareZap) {
        modalShareZap.onclick = (e) => {
          e.preventDefault();
          const shareItem = {
            type: 'proposta',
            id: cardId,
            title: cardTitle,
            quote: cardQuote,
            tag: `Propostas • ${cardTag}`,
            image: cardImgSrc,
            url: getPhotoShareUrl(cardId)
          };
          if (typeof window.openOfficialShareModal === 'function') {
            window.openOfficialShareModal(shareItem);
          } else {
            const msg = getWhatsAppPhotoShareMessage(cardId, cardTitle, cardQuote);
            window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
          }
        };
      }

    }

    function getNavCards() {
      const activeFilterBtn = document.querySelector('.gallery-filter-btn.active');
      const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      if (!currentFilter || currentFilter === 'all') return cardsArray;
      const filtered = cardsArray.filter(card => card.getAttribute('data-category') === currentFilter);
      return filtered.length > 0 ? filtered : cardsArray;
    }

    function navigateModal(direction) {
      const navCards = getNavCards();
      const currentCard = cardsArray[currentIndex];
      let activeIndex = navCards.indexOf(currentCard);
      if (activeIndex === -1) activeIndex = 0;
      let nextIndex = activeIndex + direction;
      if (nextIndex < 0) nextIndex = navCards.length - 1;
      if (nextIndex >= navCards.length) nextIndex = 0;
      const targetCard = navCards[nextIndex];
      const targetGlobalIndex = cardsArray.indexOf(targetCard);
      renderCardInModal(targetGlobalIndex !== -1 ? targetGlobalIndex : 0);
    }

    function openModal(index) {
      renderCardInModal(index);
      photoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      photoModal.classList.remove('active');
      document.body.style.overflow = '';
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }

    // Expor globalmente para navegação direta e links compartilhados
    window.openOfficialPhoto = openModal;
    window.closeOfficialPhoto = closeModal;

    cardsArray.forEach((card, index) => {
      const imgFrame = card.querySelector('.gallery-image-frame');
      const zoomBtn = card.querySelector('.gallery-zoom-action');
      const shareBtn = card.querySelector('.photo-share-btn');

      if (imgFrame) {
        imgFrame.addEventListener('click', () => openModal(index));
      }
      if (zoomBtn) {
        zoomBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(index);
        });
      }
      if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const cardId = card.getAttribute('data-card-id') || (index + 1);
          const cardTitle = card.getAttribute('data-card-title') || card.querySelector('.gallery-caption-title')?.textContent?.trim() || 'Alexsandra Tomaz 2223';
          const cardQuote = card.querySelector('.gallery-caption-quote')?.textContent?.trim() || '';
          const cardTag = card.querySelector('.gallery-caption-badge')?.textContent?.trim() || 'Proposta Oficial';
          const cardImg = card.querySelector('.gallery-card-img')?.src || '';
          const shareUrl = getPhotoShareUrl(cardId);

          const shareItem = {
            type: 'proposta',
            id: cardId,
            title: cardTitle,
            quote: cardQuote,
            tag: `Propostas • ${cardTag}`,
            image: cardImg,
            url: shareUrl
          };

          if (typeof window.openOfficialShareModal === 'function') {
            window.openOfficialShareModal(shareItem);
          } else {
            const msg = getWhatsAppPhotoShareMessage(cardId, cardTitle, cardQuote);
            window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
          }
        });
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateModal(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateModal(1);
      });
    }

    // Navegação por toque (swipe) em celulares e tablets
    const modalLeft = photoModal.querySelector('.modal-photo-left');
    if (modalLeft) {
      let touchStartX = 0;
      let touchStartY = 0;

      modalLeft.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      modalLeft.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
            if (deltaX < 0) {
              navigateModal(1);
            } else {
              navigateModal(-1);
            }
          }
        }
      }, { passive: true });
    }

    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!photoModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    });
  }
}

/* --------------------------------------------------------------------------
   UTILITÁRIOS DE URL & COMPARTILHAMENTO
   -------------------------------------------------------------------------- */
function getBaseSiteUrl() {
  const isOnlineSite = window.location.protocol.startsWith('http') && 
                       !window.location.hostname.includes('localhost') && 
                       !window.location.hostname.includes('127.0.0.1');
  if (isOnlineSite) {
    const origin = window.location.origin;
    const path = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '');
    return origin + (path ? path : '');
  }
  return 'https://alexsandratomaz.com.br';
}

function getVideoShareUrl(videoId) {
  const base = getBaseSiteUrl();
  return `${base}/?video=${videoId}#video-${videoId}`;
}

function getWhatsAppVideoShareMessage(videoId, videoTitle) {
  const shareUrl = getVideoShareUrl(videoId);
  const titleText = videoTitle || 'Alexsandra Tomaz 2223 • Deputada Federal';
  return encodeURIComponent(
    `Assista ao vídeo oficial de Alexsandra Tomaz (Deputada Federal 2223 • PL Espírito Santo):\n` +
    `"${titleText}"\n\n` +
    `Assista direto no portal oficial:\n${shareUrl}`
  );
}

function getPhotoShareUrl(cardId) {
  const base = getBaseSiteUrl();
  return `${base}/?foto=${cardId}#foto-${cardId}`;
}

function getWhatsAppPhotoShareMessage(cardId, cardTitle, cardQuote) {
  const shareUrl = getPhotoShareUrl(cardId);
  const titleText = cardTitle || 'Alexsandra Tomaz 2223 • Deputada Federal';
  const quoteSnippet = cardQuote ? `\n"${cardQuote}"` : '';
  return encodeURIComponent(
    `Confira o que Alexsandra Tomaz 2223 defende para o Espírito Santo!\n\n` +
    `*${titleText}*${quoteSnippet}\n\n` +
    `Acesse a proposta completa no portal oficial:\n${shareUrl}`
  );
}

/* --------------------------------------------------------------------------
   4. MODAL DE VÍDEOS OFICIAIS (ALTA PERFORMANCE NO MOBILE & IPHONE)
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
      videoModalShareZap.onclick = (e) => {
        e.preventDefault();
        const shareUrl = getVideoShareUrl(videoId);
        const videoThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const shareItem = {
          type: 'video',
          id: videoId,
          title: videoTitle || 'Alexsandra Tomaz 2223 • Deputada Federal',
          tag: 'Vídeo Oficial • YouTube',
          image: videoThumb,
          url: shareUrl
        };
        if (typeof window.openOfficialShareModal === 'function') {
          window.openOfficialShareModal(shareItem);
        } else {
          const shareText = getWhatsAppVideoShareMessage(videoId, videoTitle);
          window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
        }
      };
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
    try {
      history.replaceState(null, '', window.location.pathname);
    } catch (e) {}
  }

  // Expor globalmente para navegação direta e links compartilhados
  window.openOfficialVideo = openVideo;
  window.closeOfficialVideo = closeVideo;

  // Event listeners para cards de vídeo (clique no card abre o player)
  document.querySelectorAll('.video-card').forEach(card => {
    const videoId = card.getAttribute('data-video-id');
    const videoTitle = card.getAttribute('data-video-title');

    card.addEventListener('click', (e) => {
      // Se clicou no botão de compartilhar do WhatsApp no card, não abre o player
      if (e.target.closest('.video-share-btn')) {
        return;
      }
      e.preventDefault();
      openVideo(videoId, videoTitle);
    });
  });

  // Botões de compartilhamento oficial dentro de cada card de vídeo
  document.querySelectorAll('.video-share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const videoId = btn.getAttribute('data-video-id');
      const videoTitle = btn.getAttribute('data-video-title');
      const videoCard = btn.closest('.video-card');
      const videoTag = videoCard?.querySelector('.video-category-tag')?.textContent?.trim() || 'Vídeo Oficial';
      const videoThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const shareUrl = getVideoShareUrl(videoId);

      const shareItem = {
        type: 'video',
        id: videoId,
        title: videoTitle || 'Alexsandra Tomaz 2223 • Deputada Federal',
        tag: `Vídeo Oficial • ${videoTag}`,
        image: videoThumb,
        url: shareUrl
      };

      if (typeof window.openOfficialShareModal === 'function') {
        window.openOfficialShareModal(shareItem);
      } else {
        const shareText = getWhatsAppVideoShareMessage(videoId, videoTitle);
        window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
      }
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

/* --------------------------------------------------------------------------
   5. NAVEGAÇÃO DIRETA POR HASH / LINK COMPARTILHADO (#video-..., ?video=...)
   -------------------------------------------------------------------------- */
function handleDirectHash() {
  // 1. Extrair parâmetros de query (?video=..., ?foto=...)
  let videoParam = null;
  let photoParam = null;
  try {
    const urlParams = new URLSearchParams(window.location.search);
    videoParam = urlParams.get('video') || urlParams.get('v');
    photoParam = urlParams.get('foto') || urlParams.get('p') || urlParams.get('proposta');
  } catch (e) {}

  const hash = window.location.hash || '';

  // Se não há hash nem parâmetros, nada a fazer
  if (!hash && !videoParam && !photoParam) return;

  // ========================================================================
  // A. TRATAMENTO DE VÍDEO COMPARTILHADO (?video=... ou #video-...)
  // ========================================================================
  let targetVideoCard = null;
  let shouldAutoPlayVideo = false;

  if (videoParam) {
    if (/^\d+$/.test(videoParam)) {
      const idx = parseInt(videoParam, 10) - 1;
      const cards = document.querySelectorAll('.video-card');
      if (cards[idx]) targetVideoCard = cards[idx];
    } else {
      targetVideoCard = document.getElementById(`video-${videoParam}`) ||
                        document.querySelector(`.video-card[data-video-id="${videoParam}"]`);
    }
    if (targetVideoCard) shouldAutoPlayVideo = true;
  }

  if (!targetVideoCard && hash && /^#video-/i.test(hash)) {
    const rawId = hash.replace(/^#video-/i, '');
    if (/^\d+$/.test(rawId)) {
      const idx = parseInt(rawId, 10) - 1;
      const cards = document.querySelectorAll('.video-card');
      if (cards[idx]) targetVideoCard = cards[idx];
    } else {
      targetVideoCard = document.getElementById(`video-${rawId}`) ||
                        document.getElementById(rawId) ||
                        document.querySelector(`.video-card[data-video-id="${rawId}"]`);
    }
    if (targetVideoCard) shouldAutoPlayVideo = true;
  }

  if (targetVideoCard) {
    const videoId = targetVideoCard.getAttribute('data-video-id');
    const videoTitle = targetVideoCard.getAttribute('data-video-title');

    targetVideoCard.classList.add('visible');
    const parentSection = targetVideoCard.closest('section');
    if (parentSection) {
      parentSection.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
    }

    setTimeout(() => {
      targetVideoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetVideoCard.classList.add('highlight-target');
      setTimeout(() => targetVideoCard.classList.remove('highlight-target'), 4000);
    }, 250);

    if (shouldAutoPlayVideo && videoId && typeof window.openOfficialVideo === 'function') {
      setTimeout(() => {
        window.openOfficialVideo(videoId, videoTitle);
      }, 400);
    }
    return;
  }

  // ========================================================================
  // B. TRATAMENTO DE PROPOSTA / FOTO COMPARTILHADA (?foto=... ou #foto-...)
  // ========================================================================
  let targetPhotoCard = null;
  let shouldOpenPhotoModal = false;
  let photoIndexToOpen = -1;

  if (photoParam) {
    if (/^\d+$/.test(photoParam)) {
      const idx = parseInt(photoParam, 10) - 1;
      const cards = document.querySelectorAll('.gallery-card');
      if (cards[idx]) {
        targetPhotoCard = cards[idx];
        photoIndexToOpen = idx;
      }
    } else {
      targetPhotoCard = document.getElementById(`foto-${photoParam}`) ||
                        document.getElementById(`proposta-${photoParam}`) ||
                        document.querySelector(`.gallery-card[data-card-id="${photoParam}"]`);
      if (targetPhotoCard) {
        const allCards = Array.from(document.querySelectorAll('.gallery-card'));
        photoIndexToOpen = allCards.indexOf(targetPhotoCard);
      }
    }
    if (targetPhotoCard) shouldOpenPhotoModal = true;
  }

  if (!targetPhotoCard && hash && /^(#foto-|#proposta-)/i.test(hash)) {
    const rawId = hash.replace(/^(#foto-|#proposta-)/i, '');
    if (/^\d+$/.test(rawId)) {
      const idx = parseInt(rawId, 10) - 1;
      const cards = document.querySelectorAll('.gallery-card');
      if (cards[idx]) {
        targetPhotoCard = cards[idx];
        photoIndexToOpen = idx;
      }
    } else {
      targetPhotoCard = document.getElementById(`foto-${rawId}`) ||
                        document.getElementById(`proposta-${rawId}`) ||
                        document.getElementById(rawId) ||
                        document.querySelector(`.gallery-card[data-card-id="${rawId}"]`);
      if (targetPhotoCard) {
        const allCards = Array.from(document.querySelectorAll('.gallery-card'));
        photoIndexToOpen = allCards.indexOf(targetPhotoCard);
      }
    }
    if (targetPhotoCard) shouldOpenPhotoModal = true;
  }

  if (targetPhotoCard) {
    targetPhotoCard.classList.add('visible');
    const parentSection = targetPhotoCard.closest('section');
    if (parentSection) {
      parentSection.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
    }

    setTimeout(() => {
      targetPhotoCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetPhotoCard.classList.add('highlight-target');
      setTimeout(() => targetPhotoCard.classList.remove('highlight-target'), 4000);
    }, 250);

    if (shouldOpenPhotoModal && photoIndexToOpen >= 0 && typeof window.openOfficialPhoto === 'function') {
      setTimeout(() => {
        window.openOfficialPhoto(photoIndexToOpen);
      }, 400);
    }
    return;
  }



  // Se o hash for apenas a seção geral de vídeos (#videos), apenas rola até a seção
  if (hash === '#videos') {
    const videosSection = document.getElementById('videos');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // Navegação para qualquer outra âncora (#sobre, #compromissos, #galeria, etc.)
  if (hash) {
    try {
      const genericTarget = document.querySelector(hash);
      if (genericTarget) {
        genericTarget.classList.add('visible');
        const parent = genericTarget.closest('section');
        if (parent) {
          parent.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
        }
        setTimeout(() => {
          genericTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    } catch (e) {}
  }
}

window.addEventListener('hashchange', () => {
  try { handleDirectHash(); } catch (e) { console.warn('[HASH]', e); }
});

window.addEventListener('load', () => {
  const modal = document.getElementById('videoModal');
  if (modal && modal.classList.contains('active')) return;
  try { handleDirectHash(); } catch (e) { console.warn('[LOAD_HASH]', e); }
});
