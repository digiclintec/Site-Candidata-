/* ==========================================================================
   PORTAL OFICIAL - ALEXSANDRA TOMAZ
   materials.js - Hub de Download e Compartilhamento de Materiais
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initShareButtons();
});

function initShareButtons() {
  const shareWaBtn = document.getElementById('shareWhatsApp');
  const copyLinkBtn = document.getElementById('copySiteLink');

  const pageUrl = window.location.href;
  const shareText = encodeURIComponent(
    `Conheça o site oficial de Alexsandra Tomaz 2223!\n` +
    `Veja as propostas para saúde, educação, segurança e o futuro da nossa gente:\n` +
    `${pageUrl}`
  );

  if (shareWaBtn) {
    shareWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(pageUrl).then(() => {
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Link Copiado!';
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
        }, 2500);
      });
    });
  }
}
