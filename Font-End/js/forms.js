/* ==========================================================================
   PORTAL OFICIAL - ALEXSANDRA TOMAZ
   forms.js - Cadastro de Apoiadores, Validação e Integração WhatsApp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initVolunteerForm();
  initPhoneMask();
});

function initPhoneMask() {
  const phoneInput = document.getElementById('volunteerPhone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    if (!x[2]) {
      e.target.value = x[1];
    } else if (!x[3]) {
      e.target.value = `(${x[1]}) ${x[2]}`;
    } else {
      e.target.value = `(${x[1]}) ${x[2]}-${x[3]}`;
    }
  });
}

function initVolunteerForm() {
  const form = document.getElementById('volunteerForm');
  const alertBox = document.getElementById('formAlert');
  if (!form || !alertBox) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Coleta dos dados
    const name = document.getElementById('volunteerName').value.trim();
    const whatsapp = document.getElementById('volunteerPhone').value.trim();
    const city = document.getElementById('volunteerCity').value.trim();
    const occupation = document.getElementById('volunteerOccupation')?.value.trim() || '';
    const message = document.getElementById('volunteerMessage')?.value.trim() || '';

    // Coleta das opções de ajuda marcadas
    const helpOptions = [];
    document.querySelectorAll('input[name="help_type"]:checked').forEach(cb => {
      helpOptions.push(cb.value);
    });

    if (!name || !whatsapp || !city) {
      showAlert(alertBox, 'Por favor, preencha todos os campos obrigatórios (Nome, WhatsApp e Cidade).', 'error');
      return;
    }

    // Feedback de carregamento
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';

    const supporterData = {
      nome: name,
      whatsapp: whatsapp,
      cidade: city,
      ocupacao: occupation,
      modalidades: helpOptions,
      mensagem: message,
      dataCadastro: new Date().toISOString()
    };

    let apiSuccess = false;

    // Tentativa de envio para a API Node.js/Express
    try {
      const response = await fetch('http://localhost:3001/api/apoiadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supporterData)
      });
      if (response.ok) {
        apiSuccess = true;
      }
    } catch (err) {
      console.log('API Back-end não detectada localmente, salvando no armazenamento do navegador...');
    }

    // Salvar também em localStorage para resiliência local
    const savedList = JSON.parse(localStorage.getItem('alexsandra_apoiadores') || '[]');
    savedList.push(supporterData);
    localStorage.setItem('alexsandra_apoiadores', JSON.stringify(savedList));

    // Montar texto amigável para envio direto via WhatsApp
    const phoneClean = whatsapp.replace(/\D/g, '');
    const helpText = helpOptions.length > 0 ? helpOptions.join(', ') : 'Apoiando e divulgando';
    const whatsappMsg = encodeURIComponent(
      `Olá Alexsandra Tomaz e equipe! 🇧🇷\n\n` +
      `Acabei de me cadastrar como apoiador no site oficial!\n` +
      `*Nome:* ${name}\n` +
      `*Cidade/Bairro:* ${city}\n` +
      `*Como quero ajudar:* ${helpText}\n\n` +
      `Contem com meu apoio para transformar nossa cidade e estado!`
    );

    // Número padrão da coordenação de campanha (substituível)
    const campaignPhone = "5521999999999";
    const waUrl = `https://wa.me/${campaignPhone}?text=${whatsappMsg}`;

    showAlert(alertBox, `
      <strong>Parabéns, ${name}! Seu cadastro foi realizado com sucesso! 🎉</strong><br>
      <span style="font-size: 0.88rem; margin-top: 0.3rem; display: inline-block;">
        Você já faz parte da nossa corrente de vitória.
      </span>
      <div style="margin-top: 0.8rem;">
        <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="font-size: 0.82rem; padding: 0.5rem 1rem;">
          <i class="fab fa-whatsapp"></i> Confirmar no WhatsApp da Campanha
        </a>
      </div>
    `, 'success');

    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  });
}

function showAlert(alertEl, messageHtml, type) {
  alertEl.className = `form-status-alert ${type}`;
  alertEl.innerHTML = messageHtml;
  alertEl.style.display = 'block';

  if (type === 'error') {
    setTimeout(() => {
      alertEl.style.display = 'none';
    }, 5000);
  }
}
