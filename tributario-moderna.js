// Modern JavaScript for enhanced user experience - Tax Law Specialized
// Google Tag Manager DataLayer
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Track page view
gtag('event', 'page_view', {
    'event_category': 'engagement',
    'event_label': 'tributario_page',
    'page_title': document.title,
    'page_location': window.location.href
});

document.addEventListener('DOMContentLoaded', function() {
    // Track page entrance
    gtag('event', 'page_entrance', {
        'event_category': 'engagement',
        'event_label': 'tributario_entrance',
        'value': 1
    });
    // Add scrolled class to header on scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize chatbot after DOM is loaded
    initializeChatbot();
});

// Initialize chatbot functionality
function initializeChatbot() {
    const chatbotInput = document.getElementById('chatbot-input-field');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Focus input when chatbot opens
        const chatbotButton = document.querySelector('.chatbot-button');
        if (chatbotButton) {
            chatbotButton.addEventListener('click', () => {
                setTimeout(() => {
                    const container = document.getElementById('chatbot-container');
                    if (container && container.classList.contains('active')) {
                        chatbotInput.focus();
                    }
                }, 300);
            });
        }
    }
}

// Mobile menu toggle (for future mobile menu implementation)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';

    // Insert mobile toggle before navbar
    navbar.parentNode.insertBefore(mobileToggle, navbar);

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
};

// Form submission handler for consultation form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.hero-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            const requiredFields = ['nome', 'email', 'telefone', 'servico'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = '#dc2626';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = document.getElementById('email');
            if (data.email && !emailRegex.test(data.email)) {
                emailInput.style.borderColor = '#dc2626';
                isValid = false;
            }

            if (isValid) {
                // Track form submission
                gtag('event', 'form_submit', {
                    'event_category': 'lead_generation',
                    'event_label': 'consultation_form',
                    'service_type': data.servico,
                    'value': 10
                });

                // Show success message
                const button = this.querySelector('.btn');
                const originalText = button.textContent;
                button.textContent = 'Enviando...';
                button.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    // Track successful form completion
                    gtag('event', 'form_complete', {
                        'event_category': 'lead_generation',
                        'event_label': 'consultation_success',
                        'value': 50
                    });

                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    this.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1500);
            } else {
                // Track form validation error
                gtag('event', 'form_error', {
                    'event_category': 'form_interaction',
                    'event_label': 'validation_error',
                    'value': 1
                });

                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            }
        });
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and benefit items
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .contact-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize mobile menu for smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Add resize listener for mobile menu
    window.addEventListener('resize', () => {
        const existingToggle = document.querySelector('.mobile-toggle');
        if (window.innerWidth <= 768 && !existingToggle) {
            createMobileMenu();
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
            document.querySelector('.navbar').classList.remove('mobile-active');
        }
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current) + '+';

            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            }
        }, 40);
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#dc2626';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = 'var(--accent-red)';
        });
    });
});


// Chatbot functionality
function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    const isOpening = !container.classList.contains('active');

    container.classList.toggle('active');

    // Track chatbot interaction
    if (isOpening) {
        gtag('event', 'chatbot_open', {
            'event_category': 'ai_interaction',
            'event_label': 'chatbot_opened',
            'value': 1
        });
    } else {
        gtag('event', 'chatbot_close', {
            'event_category': 'ai_interaction',
            'event_label': 'chatbot_closed',
            'value': 1
        });
    }
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const inputField = document.getElementById('chatbot-input-field');
    const message = inputField.value.trim();

    if (!message) return;

    // Disable input while processing
    inputField.disabled = true;
    const sendButton = inputField.nextElementSibling;
    sendButton.disabled = true;

    // Track chatbot message
    gtag('event', 'chatbot_message', {
        'event_category': 'ai_interaction',
        'event_label': 'user_message_sent',
        'message_length': message.length,
        'value': 1
    });

    // Add user message
    addMessage(message, 'user');
    inputField.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response (async)
    try {
        const botResponse = await getBotResponse(message);
        hideTypingIndicator();
        addMessage(botResponse, 'bot');

        // Track successful bot response
        gtag('event', 'chatbot_response', {
            'event_category': 'ai_interaction',
            'event_label': 'bot_response_success',
            'response_length': botResponse.length,
            'value': 1
        });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        hideTypingIndicator();
        addMessage('Desculpe, houve um erro. Tente novamente em instantes.', 'bot');

        // Track bot error
        gtag('event', 'chatbot_error', {
            'event_category': 'ai_interaction',
            'event_label': 'bot_response_error',
            'error_message': error.message || 'Unknown error',
            'value': 1
        });
    } finally {
        // Re-enable input
        inputField.disabled = false;
        sendButton.disabled = false;
        inputField.focus();
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Handle line breaks and formatting
    const formattedText = text.replace(/\n/g, '<br>');
    messageContent.innerHTML = formattedText;

    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);

    // Smooth scroll to bottom
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

// Tax Law Chatbot with Specialized Responses
const CHATBOT_CONFIG = {
    // Context do escritório para IA - SISTEMA ESPECIALIZADO EM DIREITO TRIBUTÁRIO
    SYSTEM_CONTEXT: `Você é Clara, assistente virtual EXCLUSIVAMENTE do escritório de advocacia tributária Martins Palmeira e Bergamo.

⚖️ FOCO OBRIGATÓRIO: APENAS DIREITO TRIBUTÁRIO EMPRESARIAL

INFORMAÇÕES DO ESCRITÓRIO:
- Especialização: EXCLUSIVAMENTE Direito Tributário Empresarial
- Localização: Swiss Park Office - Av. Antonio Artioli, 570, Sala 108, Campinas-SP
- WhatsApp: (19) 99863-0306
- Email: contato@martinspalmeiraebergamo.com.br
- Horário: Seg-Sex: 9h-18h + Plantão WhatsApp 24h
- Experiência: 15+ anos, 500+ casos tributários, 200+ empresas

SERVIÇOS ESPECIALIZADOS:
1. Recuperação de Impostos Pagos a Maior (ICMS, IPI, PIS/COFINS, ISS)
2. Compensação de Créditos Tributários (aproveitamento de créditos)
3. Advogado Tributarista Empresarial (planejamento e consultoria)
4. Defesa em Autuações Fiscais (Receita Federal, Estadual, Municipal)
5. Consultoria Tributária Preventiva (compliance fiscal)
6. Auditoria Tributária (revisão de passivos)

REGRAS RÍGIDAS - NUNCA VIOLE:
🚨 RESPONDA APENAS sobre: direito tributário, impostos, ICMS, IPI, PIS/COFINS, ISS, IR, autuações fiscais, Receita Federal, planejamento tributário, consultoria fiscal
🚨 JAMAIS responda sobre: direito trabalhista, civil, criminal, família, consumidor
🚨 Se perguntarem sobre outros assuntos: "Sou especializada exclusivamente em direito tributário empresarial. Para outras questões jurídicas, recomendo contatar um escritório generalista. Posso ajudá-lo com questões tributárias?"
🚨 Não forneça consultoria específica - sempre direcione para consulta
🚨 Seja técnica mas acessível
🚨 Máximo 3 frases por resposta
🚨 Sempre ofereça contato: WhatsApp (19) 99863-0306`
};

// SISTEMA DE VALIDAÇÃO PARA TÓPICOS TRIBUTÁRIOS
function isTaxLawTopic(message) {
    const taxKeywords = [
        // Termos diretos de direito tributário
        'tributário', 'tributária', 'tributo', 'imposto', 'taxa', 'contribuição',
        'icms', 'ipi', 'pis', 'cofins', 'iss', 'ir', 'irpj', 'csll', 'inss',
        'receita federal', 'receita estadual', 'prefeitura', 'fisco', 'fiscal',
        'autuação', 'auto de infração', 'multa fiscal', 'notificação fiscal',
        'compensação', 'crédito tributário', 'restituição', 'ressarcimento',
        'planejamento tributário', 'elisão fiscal', 'consultoria fiscal',
        'auditoria tributária', 'passivo tributário', 'contingência fiscal',
        'parcelamento', 'refis', 'pert', 'paes', 'recuperação judicial',
        'simples nacional', 'lucro presumido', 'lucro real', 'arbitrado',
        'substituição tributária', 'antecipação tributária', 'diferimento',
        // Termos do escritório
        'martins palmeira', 'bergamo', 'advocacia', 'advogado', 'escritório',
        'consulta', 'serviços', 'contrato', 'whatsapp', 'telefone', 'contato'
    ];

    const nonTaxKeywords = [
        // Direito Trabalhista
        'trabalhista', 'trabalho', 'clt', 'empregado', 'funcionário', 'demissão',
        // Direito Civil
        'divórcio', 'separação', 'inventário', 'herança',
        // Direito Criminal
        'crime', 'prisão', 'delegacia',
        // Outros
        'consumidor', 'procon'
    ];

    const messageLower = message.toLowerCase().trim();

    // SAUDAÇÕES E PERGUNTAS GERAIS - SEMPRE ACEITAR
    const basicGreetings = /^(ol[aá]|oi|hello|hey|e a[ií]|blz|tudo bem|bom dia|boa tarde|boa noite)[\s\!]*$/i.test(messageLower);
    const basicQuestions = /\b(como|onde|quando|quanto|que|qual|quem|por que|porque|o que|ajuda|ajudar|info|informa[çc][ãa]o|dúvida|d[uú]vida|pergunta)\b/i.test(messageLower);
    const serviceQuestions = /\b(servi[çc]os?|atua[çc][ãa]o|especialidade|fazem|trabalham|oferecem|atendimento)\b/i.test(messageLower);
    const contactQuestions = /\b(contato|telefone|whatsapp|falar|ligar|email|endere[çc]o|localiza[çc][ãa]o|fica)\b/i.test(messageLower);

    // Se é saudação básica ou pergunta geral, sempre aceitar
    if (basicGreetings || basicQuestions || serviceQuestions || contactQuestions) {
        return true;
    }

    // Se contém palavras explicitamente proibidas, rejeitar
    const hasNonTaxKeywords = nonTaxKeywords.some(keyword =>
        messageLower.includes(keyword)
    );

    if (hasNonTaxKeywords) return false;

    // Se contém palavras tributárias específicas, aceitar
    const hasTaxKeywords = taxKeywords.some(keyword =>
        messageLower.includes(keyword)
    );

    if (hasTaxKeywords) return true;

    // Para mensagens muito curtas (até 3 palavras), aceitar (provavelmente saudações)
    if (messageLower.split(' ').length <= 3) return true;

    // Para outras mensagens, aceitar por padrão (serão redirecionadas se necessário)
    return true;
}

// Função principal para obter resposta do bot
async function getBotResponse(userMessage) {
    try {
        console.log('Mensagem recebida:', userMessage);

        // Pequeno delay para simular digitação
        await new Promise(resolve => setTimeout(resolve, 300));

        // Usar respostas locais especializadas em tributário
        const response = getTaxBotResponseLocal(userMessage);

        console.log('Resposta gerada:', response);
        return response;

    } catch (error) {
        console.error('Erro no chatbot:', error);
        // Resposta de erro mais amigável
        return 'Oi! Tive um probleminha técnico, mas estou aqui para ajudar com questões tributárias! Pode repetir sua pergunta ou entrar em contato pelo WhatsApp (19) 99863-0306.';
    }
}

// CHATBOT ESPECIALIZADO EM DIREITO TRIBUTÁRIO
function getTaxBotResponseLocal(userMessage) {
    const message = userMessage.toLowerCase().trim();
    console.log('Processando mensagem tributária:', message);

    // Saudações - PRIMEIRA PRIORIDADE
    if (message.includes('ola') || message.includes('olá') || message.includes('oi') ||
        message.includes('bom dia') || message.includes('boa tarde') || message.includes('boa noite') ||
        message.includes('hello') || message.includes('hey')) {
        const greetings = [
            'Olá! Sou Clara, assistente do escritório Martins Palmeira e Bergamo. Como posso ajudá-lo com questões tributárias?',
            'Oi! Somos especialistas em direito tributário empresarial. Pode me contar sua dúvida fiscal que vou orientá-lo!',
            'Olá! Tem alguma dúvida sobre impostos ou questões tributárias? Estou aqui para ajudar!',
            'Oi! Sou Clara do escritório tributário Martins Palmeira e Bergamo. Como posso ajudá-lo hoje?'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Perguntas sobre saber/conhecer/dúvidas
    if (message.includes('gostaria de saber') || message.includes('quero saber') ||
        message.includes('duvida') || message.includes('dúvida') || message.includes('pergunta') ||
        message.includes('me tire') || message.includes('esclareça') || message.includes('explique')) {
        return 'Claro! Estou aqui para esclarecer dúvidas sobre direito tributário. Pode perguntar sobre impostos, autuações fiscais, recuperação de créditos, ou nossos serviços. O que você gostaria de saber?';
    }

    // Perguntas sobre ajuda
    if (message.includes('ajuda') || message.includes('ajudar') || message.includes('me ajude') ||
        message.includes('preciso de') || message.includes('como você') || message.includes('pode')) {
        return 'Claro! Posso ajudá-lo com questões tributárias: recuperação de impostos, defesa em autuações, planejamento fiscal, consultoria tributária. Qual sua dúvida específica?';
    }

    // Serviços
    if (message.includes('serviço') || message.includes('fazem') || message.includes('trabalham') ||
        message.includes('especialidade') || message.includes('oferecem')) {
        return 'Nossos serviços tributários:\n\n💰 RECUPERAÇÃO de impostos pagos a maior\n🛡️ DEFESA em autuações fiscais\n📊 CONSULTORIA tributária preventiva\n⚖️ PLANEJAMENTO tributário empresarial\n\nSobre qual você quer saber mais?';
    }

    // Recuperação de impostos
    if (message.includes('recuperação') || message.includes('recuperar') || message.includes('restituição') ||
        message.includes('ressarcimento') || message.includes('pago a maior') || message.includes('crédito')) {
        return 'Recuperação de impostos é nossa especialidade! Analisamos ICMS, IPI, PIS/COFINS, ISS pagos indevidamente. Muitas empresas têm direito a milhares em créditos. Quer uma análise gratuita? WhatsApp (19) 99863-0306';
    }

    // Autuações fiscais
    if (message.includes('autuação') || message.includes('auto de infração') || message.includes('multa') ||
        message.includes('receita federal') || message.includes('fisco') || message.includes('fiscal')) {
        return 'Defesa em autuações fiscais é fundamental! Analisamos o auto de infração, elaboramos defesa técnica e representamos sua empresa junto aos órgãos fiscais. Prazo é crucial! WhatsApp (19) 99863-0306';
    }

    // Impostos específicos
    if (message.includes('icms') || message.includes('ipi') || message.includes('pis') ||
        message.includes('cofins') || message.includes('iss') || message.includes('ir') ||
        message.includes('imposto')) {
        return 'Trabalhamos com todos os impostos empresariais: ICMS, IPI, PIS/COFINS, ISS, IR, CSLL. Oferecemos recuperação, planejamento e defesa. Qual imposto tem gerado dúvidas na sua empresa?';
    }

    // Planejamento tributário
    if (message.includes('planejamento') || message.includes('consultoria') || message.includes('preventiva') ||
        message.includes('compliance') || message.includes('elisão') || message.includes('economia')) {
        return 'Planejamento tributário pode reduzir significativamente sua carga fiscal! Analisamos sua operação e sugerimos estratégias legais de economia. Consultoria preventiva evita problemas futuros. Vamos conversar? (19) 99863-0306';
    }

    // Contato
    if (message.includes('contato') || message.includes('telefone') || message.includes('whatsapp') ||
        message.includes('email') || message.includes('falar') || message.includes('ligar')) {
        return 'Entre em contato conosco:\n📱 WhatsApp: (19) 99863-0306\n📧 Email: contato@martinspalmeiraebergamo.com.br\n🕐 Seg-Sex: 9h-18h + Plantão 24h\n📍 Campinas-SP';
    }

    // Localização
    if (message.includes('onde') || message.includes('endereço') || message.includes('localização') ||
        message.includes('fica') || message.includes('campinas')) {
        return 'Nosso escritório fica em Campinas-SP:\n📍 Swiss Park Office\n📍 Av. Antonio Artioli, 570\n📍 Edifício Locarno - Sala 108\n🅿️ Estacionamento próprio';
    }

    // Horários
    if (message.includes('horário') || message.includes('que horas') || message.includes('funciona') ||
        message.includes('aberto') || message.includes('atende')) {
        return 'Nosso horário: Segunda a Sexta das 9h às 18h, mas temos plantão 24h pelo WhatsApp (19) 99863-0306 para emergências tributárias!';
    }

    // Preços
    if (message.includes('preço') || message.includes('valor') || message.includes('quanto') ||
        message.includes('custo') || message.includes('honorário') || message.includes('cobram')) {
        return 'Nossos valores variam conforme a complexidade do caso tributário. Oferecemos consulta inicial para avaliação e orçamento personalizado. Entre em contato pelo WhatsApp (19) 99863-0306!';
    }

    // Agradecimentos
    if (message.includes('obrigad') || message.includes('valeu') || message.includes('agradeço') ||
        message.includes('muito bom') || message.includes('ótimo') || message.includes('perfeito')) {
        return 'Fico feliz em ajudar! Tem mais alguma dúvida sobre questões tributárias? Estou aqui para orientá-lo!';
    }

    // Resposta padrão para qualquer outra mensagem
    return 'Entendi sua pergunta! Para uma orientação específica sobre sua situação tributária, recomendo falar diretamente com nossos advogados pelo WhatsApp (19) 99863-0306. Assim podemos analisar seu caso detalhadamente!';
}

// Função auxiliar para respostas aleatórias - COM VALIDAÇÃO
function getRandomResponse(responses) {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
        console.error('Erro: Array de respostas inválido', responses);
        return 'Olá! Como posso ajudá-lo com questões tributárias?';
    }

    const randomIndex = Math.floor(Math.random() * responses.length);
    const selectedResponse = responses[randomIndex];
    console.log('Resposta selecionada:', selectedResponse);
    return selectedResponse;
}

// Indicadores visuais melhorados
function showTypingIndicator() {
    // Remove indicador existente se houver
    hideTypingIndicator();

    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <span class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
            Clara está digitando...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);

    // Smooth scroll
    setTimeout(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}