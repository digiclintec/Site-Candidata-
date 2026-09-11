# Portal Oficial - Alexsandra Tomaz 🇧🇷

Site oficial de campanha e portal institucional moderno, de alto impacto, responsivo e interativo para a candidata **Alexsandra Tomaz**, inspirado nas melhores práticas de portais políticos nacionais (como `flaviobolsonaro.net`).

---

## 📁 Estrutura do Projeto

```
Site-Alexsandra Tomaz/
│
├── Font-End/                        # Todo o código do Front-end (Visual & Interatividade)
│   ├── index.html                   # Página principal com todas as seções oficiais
│   ├── css/
│   │   ├── style.css                # Design System nobre (Navy Blue, Dourado e Verde)
│   │   ├── animations.css           # Micro-interações, efeitos de luz e pulso
│   │   └── responsive.css           # Otimização para celular, tablet e computadores
│   ├── js/
│   │   ├── main.js                  # Controle de menu, filtros, modais e contadores
│   │   ├── forms.js                 # Validação de cadastro e integração com WhatsApp
│   │   └── materials.js             # Compartilhamento e download de materiais
│   └── assets/images/               # Imagens oficiais, santinho e fotos em alta definição
│       ├── alexsandra-portrait.jpg  # Foto oficial de perfil
│       ├── alexsandra-action.jpg    # Foto em evento com a comunidade
│       └── alexsandra-flyer.jpg     # Santinho digital e panfleto de campanha
│
└── Back-end/                        # API e Servidor local leve (Zero dependências externas)
    ├── server.js                    # Servidor HTTP com API de apoiadores e contatos
    ├── package.json                 # Comandos de inicialização
    └── data/                        # Banco de dados local em formato JSON
        ├── apoiadores.json          # Lista de voluntários e apoiadores cadastrados
        └── contatos.json            # Mensagens recebidas pelo portal
```

---

## 🚀 Como Executar o Projeto

Você tem duas formas muito fáceis de abrir o site:

### Opção 1: Executar o Servidor Integrado (Recomendado)
Abra o terminal na pasta do projeto e digite:
```powershell
cd '.\Back-end'
node server.js
```
O servidor iniciará automaticamente na porta `3001`:
* 🌐 **Site Completo:** [http://localhost:3001](http://localhost:3001)
* 📊 **Lista de Apoiadores (API):** [http://localhost:3001/api/apoiadores](http://localhost:3001/api/apoiadores)

### Opção 2: Abrir o Front-End Diretamente no Navegador
Se preferir visualizar apenas o visual imediatamente, basta dar duplo clique no arquivo:
`f:\Site-Alexsandra Tomaz\Font-End\index.html`
Ele abrirá diretamente no Google Chrome, Microsoft Edge ou no seu navegador padrão.

---

## ✨ Recursos Implementados no Portal

1. **Topo Oficial & Barra Patriota:** Identificação oficial da campanha 2026, links e redes sociais.
2. **Navbar Suspensa em Vidro (Glassmorphism):** Menu com rolagem suave e botão de ação rápida "Quero Apoiar".
3. **Hero Section de Alto Impacto:**
   - Foto oficial de destaque em alta resolução.
   - Slogan de forte apelo emocional e de liderança.
   - Selos de autoridade ("100% Ficha Limpa", "Voz da Comunidade", "Defesa da Família").
   - Badges flutuantes interativos e número de campanha (#2026).
4. **Faixa de Contadores de Impacto:** Contadores animados ao rolar a página (Apoiadores, Cidades, Projetos e Anos de Dedicação).
5. **Sobre Mim (Biografia & Trajetória):**
   - Foto em evento com a comunidade.
   - Citação marcante da candidata.
   - Linha do tempo com marcos históricos de sua atuação social.
6. **Bandeiras & Propostas (Inspirado no modelo de Flávio Bolsonaro):**
   - Filtros por tema (Saúde, Educação, Segurança, Economia, Família).
   - Modal com o projeto de lei e metas de cada proposta detalhada.
7. **Canal Fato ou Boato (Anti-Fake News):**
   - Seção comparativa oficial desmentindo ataques da oposição com provas e fontes.
8. **Notícias & Agenda de Campanha:** Cobertura de discursos, eventos e projetos em formato de portal jornalístico.
9. **Central de Materiais de Campanha (Download Hub):**
   - Baixar Santinho Oficial digital em alta definição.
   - Solicitar pacote de figurinhas no WhatsApp.
   - Baixar imagem de perfil oficial.
   - Compartilhamento em 1 clique para redes sociais.
10. **Central do Apoiador / Seja Voluntário:**
    - Formulário completo para engajamento de rua, redes e reuniões familiares.
    - Salvamento automático no Back-end e redirecionamento para o WhatsApp da coordenação.
11. **Rodapé Oficial & Transparência:**
    - CNPJ da campanha, identificação da coligação e conformidade com as regras do TSE.
    - Botão flutuante permanente do WhatsApp.
