# 📊 GUIA COMPLETO: Google Tag Manager - Advocacia Tributária

## 🚀 ETAPA 1: Configuração Inicial do GTM

### 1.1 Criar Conta no Google Tag Manager
1. Acesse: https://tagmanager.google.com/
2. Clique em "Criar conta"
3. Preencha:
   - **Nome da conta**: Martins Palmeira e Bergamo
   - **Nome do contêiner**: Site Tributário
   - **Plataforma de destino**: Web

### 1.2 ID do Container
- **SEU ID**: `GTM-MRH3B3P9`
- ✅ **JÁ CONFIGURADO** no arquivo HTML

### 1.3 Instalação no Site
✅ **JÁ IMPLEMENTADO** - O código GTM já foi adicionado em:
- `<head>`: Script principal do GTM
- `<body>`: Tag noscript para fallback

---

## 🏷️ ETAPA 2: Configurar Tags no GTM

### 2.1 Google Analytics 4 (GA4)
1. **No GTM**, vá em "Tags" → "Nova"
2. **Configuração da Tag**:
   - Tipo: Google Analytics - GA4 Configuration
   - Measurement ID: Seu ID do GA4 (G-XXXXXXXXXX)
3. **Acionador**: All Pages
4. **Nome**: GA4 - Configuration

### 2.2 Tag de Conversão - Formulário
1. **Nova Tag**: Google Analytics - GA4 Event
2. **Configurações**:
   - Configuration Tag: Selecione a tag GA4 criada acima
   - Event Name: `form_submit`
   - Parâmetros personalizados:
     - `event_category`: `{{Event Category}}`
     - `event_label`: `{{Event Label}}`
     - `service_type`: `{{Service Type}}`
     - `value`: `{{Event Value}}`
3. **Acionador**: Custom Event → `form_submit`

### 2.3 Tag de Conversão - WhatsApp
1. **Nova Tag**: Google Analytics - GA4 Event
2. **Configurações**:
   - Event Name: `whatsapp_click`
   - Parâmetros:
     - `event_category`: `contact`
     - `event_label`: `{{Click Text}}`
     - `value`: `1`
3. **Acionador**: Custom Event → `whatsapp_click`

### 2.4 Tag de IA/Chatbot
1. **Nova Tag**: Google Analytics - GA4 Event
2. **Configurações**:
   - Event Name: `chatbot_interaction`
   - Parâmetros:
     - `event_category`: `ai_interaction`
     - `interaction_type`: `{{Event Label}}`
     - `value`: `{{Event Value}}`
3. **Acionador**: Custom Event → (chatbot_open, chatbot_message, chatbot_response)

---

## 🔧 ETAPA 3: Configurar Variáveis

### 3.1 Variáveis Integradas (Ativar)
- Click Text
- Click URL
- Page Title
- Page URL
- Referrer

### 3.2 Variáveis Personalizadas
1. **Event Category**:
   - Tipo: Data Layer Variable
   - Nome da variável: `event_category`

2. **Event Label**:
   - Tipo: Data Layer Variable
   - Nome da variável: `event_label`

3. **Service Type**:
   - Tipo: Data Layer Variable
   - Nome da variável: `service_type`

4. **Event Value**:
   - Tipo: Data Layer Variable
   - Nome da variável: `value`

---

## 🎯 ETAPA 4: Configurar Acionadores (Triggers)

### 4.1 Acionador - Formulário
1. **Novo Acionador**: Evento personalizado
2. **Nome do evento**: `form_submit`
3. **Tipo**: Equals
4. **Condição**: Este acionador é disparado em: Todos os eventos personalizados

### 4.2 Acionador - WhatsApp
1. **Novo Acionador**: Evento personalizado
2. **Nome do evento**: `whatsapp_click`

### 4.3 Acionador - Chatbot
1. **Novo Acionador**: Evento personalizado
2. **Nome do evento**: Regex: `chatbot_(open|close|message|response|error)`

---

## 📈 ETAPA 5: Configurar Metas no Google Analytics

### 5.1 Evento de Conversão - Formulário
1. No GA4, vá em "Configurar" → "Eventos"
2. Clique em "Criar evento"
3. **Condições**:
   - `event_name` equals `form_complete`
4. **Marcar como conversão**: ✅ Sim

### 5.2 Evento de Conversão - WhatsApp
1. **Criar evento**: `whatsapp_contact`
2. **Condições**:
   - `event_name` equals `whatsapp_click`
3. **Marcar como conversão**: ✅ Sim

### 5.3 Evento de Engajamento - Chatbot
1. **Criar evento**: `chatbot_engagement`
2. **Condições**:
   - `event_name` equals `chatbot_message`
3. **Marcar como conversão**: Opcional

---

## 🔍 ETAPA 6: Eventos Implementados no Site

### 6.1 Eventos de Página
```javascript
// Entrada na página
gtag('event', 'page_entrance', {
    'event_category': 'engagement',
    'event_label': 'tributario_entrance'
});
```

### 6.2 Eventos de Formulário
```javascript
// Envio do formulário
gtag('event', 'form_submit', {
    'event_category': 'lead_generation',
    'event_label': 'consultation_form',
    'service_type': 'recuperacao', // Dinâmico baseado na seleção
    'value': 10
});

// Sucesso do formulário
gtag('event', 'form_complete', {
    'event_category': 'lead_generation',
    'event_label': 'consultation_success',
    'value': 50
});
```

### 6.3 Eventos de WhatsApp
```html
<!-- Nos links WhatsApp -->
onclick="gtag('event', 'whatsapp_click', {
    'event_category': 'contact',
    'event_label': 'header_whatsapp',
    'value': 1
});"
```

### 6.4 Eventos de Chatbot/IA
```javascript
// Abertura do chatbot
gtag('event', 'chatbot_open', {
    'event_category': 'ai_interaction',
    'event_label': 'chatbot_opened',
    'value': 1
});

// Mensagem enviada
gtag('event', 'chatbot_message', {
    'event_category': 'ai_interaction',
    'event_label': 'user_message_sent',
    'message_length': message.length
});

// Resposta da IA
gtag('event', 'chatbot_response', {
    'event_category': 'ai_interaction',
    'event_label': 'bot_response_success',
    'response_length': botResponse.length
});
```

---

## 📊 ETAPA 7: Relatórios e Análise

### 7.1 Principais Métricas para Acompanhar
- **Taxa de Conversão de Formulário**: `form_complete` / `page_view`
- **Engajamento WhatsApp**: Cliques em `whatsapp_click`
- **Uso do Chatbot**: Taxa de abertura e mensagens
- **Qualidade de Leads**: Tipos de serviços mais solicitados

### 7.2 Configurar Funis no GA4
1. **Funil de Conversão**:
   - Etapa 1: `page_view` (Entrada)
   - Etapa 2: `form_submit` (Interesse)
   - Etapa 3: `form_complete` (Conversão)

### 7.3 Configurar Audiences
1. **Usuários Interessados**: Enviaram formulário mas não completaram
2. **Leads Qualificados**: Completaram formulário
3. **Usuários Engajados**: Usaram chatbot

---

## 🚨 ETAPA 8: Teste e Validação

### 8.1 Modo de Visualização do GTM
1. No GTM, clique em "Visualizar"
2. Abra seu site em nova aba
3. Teste todos os eventos:
   - ✅ Carregamento da página
   - ✅ Envio de formulário
   - ✅ Cliques em WhatsApp
   - ✅ Interações com chatbot

### 8.2 Verificação em Tempo Real no GA4
1. No GA4, vá em "Relatórios" → "Em tempo real"
2. Teste cada evento e verifique se aparecem
3. Confirme parâmetros personalizados

### 8.3 Publicar Tags
1. No GTM, clique em "Enviar"
2. Adicione nome da versão: "Setup inicial - Advocacia Tributária"
3. Clique em "Publicar"

---

## 📞 PRÓXIMOS PASSOS

### 8.1 Integração com Facebook Pixel
- Adicionar Facebook Pixel para remarketing
- Configurar eventos personalizados

### 8.2 Integração com Google Ads
- Conectar com Google Ads para conversões
- Configurar remarketing audiences

### 8.3 Análise Avançada
- Configurar relatórios personalizados
- Implementar Enhanced Ecommerce (se aplicável)

---

## 🎯 RESUMO DE CONVERSÕES CONFIGURADAS

| Evento | Categoria | Valor | Conversão |
|--------|-----------|-------|-----------|
| `page_entrance` | engagement | 1 | ❌ |
| `form_submit` | lead_generation | 10 | ❌ |
| `form_complete` | lead_generation | 50 | ✅ |
| `whatsapp_click` | contact | 1 | ✅ |
| `chatbot_message` | ai_interaction | 1 | Opcional |

**🏆 CONVERSÕES PRINCIPAIS**: Formulário completado + Clique WhatsApp

---

## 📋 CHECKLIST FINAL

- [ ] GTM instalado no site
- [ ] ID do container atualizado no HTML
- [ ] GA4 conectado
- [ ] Variáveis configuradas
- [ ] Tags criadas
- [ ] Acionadores configurados
- [ ] Eventos testados em modo visualização
- [ ] Tags publicadas
- [ ] Conversões marcadas no GA4
- [ ] Relatórios configurados

✅ **IMPLEMENTAÇÃO COMPLETA!** Seu tracking tributário está operacional.