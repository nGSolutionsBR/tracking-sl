# Comandos de Controle - TrackinG SI Mockup

## Status do Projeto

**Status Atual:** ✅ Completo e funcionando

**URL de Acesso:** http://localhost:5173

**Fases Implementadas:**
- ✅ FASE 1 - Fundação (Splash Screen, CSS, Navegação)
- ✅ FASE 2 - Lista de Vistorias (3 cards mockados)
- ✅ FASE 3 - Questionário EPI (6 itens interativos)
- ✅ FASE 4 - Selfie (Captura simulada com validações)
- ✅ FASE 5 - Refinamento (Transições e responsividade)

## Comandos Disponíveis

### Desenvolvimento
```bash
cd tracking-sl-mockup
npm run dev
```

### Build de Produção
```bash
cd tracking-sl-mockup
npm run build
```

### Preview do Build
```bash
cd tracking-sl-mockup
npm run preview
```

## Testes do Fluxo

### 1. Splash Screen
- Deve aparecer por 3 segundos
- Logo "ng" com ponto laranja visível
- Animação de fade in
- Transição automática para lista

### 2. Lista de Vistorias
- 3 cards visíveis
- Card 1 (VST-2024-089): botão "INICIAR VISTORIA" em laranja
- Card 2 (VST-2024-090): botão "INICIAR VISTORIA" em laranja
- Card 3 (VST-2024-091): botão "AGUARDANDO" em cinza (bloqueado)
- Click no card bloqueado mostra alerta
- Click em card disponível avança para questionário

### 3. Questionário EPI
- 6 itens de EPIs mostrados
- Checkbox interativo em cada item
- Contador mostra "X de 6 itens confirmados"
- Botão "CONTINUAR" desabilitado até marcar todos
- Botão fica laranja quando todos marcados
- Botão voltar (←) retorna para lista

### 4. Selfie
- Área de câmera com placeholder
- Botão "TIRAR FOTO" em laranja
- Efeito de flash ao capturar
- Preview mostra foto mockada
- 3 validações aparecem (rosto, capacete, iluminação)
- Botão "REFAZER" volta para câmera
- Botão "CONFIRMAR E AVANÇAR" finaliza
- Mostra alerta de sucesso e volta para lista

## Checklist de Validação

### Cores do Manual de Marca
- [ ] Azul primário (#42738d) nos headers e títulos
- [ ] Laranja destaque (#f19f53) nos botões de ação
- [ ] Cinza secundário (#bdbbbb) em textos secundários
- [ ] Logo "ng" com ponto laranja sempre visível

### Responsividade
- [ ] Máximo 480px de largura em desktop
- [ ] Centralizado horizontalmente
- [ ] Headers fixos no topo
- [ ] Rodapés fixos na parte inferior
- [ ] Touch targets mínimo de 44px

### Navegação
- [ ] Splash → Lista (automático 3s)
- [ ] Lista → Questionário (click em card disponível)
- [ ] Questionário → Selfie (todos EPIs marcados)
- [ ] Selfie → Lista (confirmação)
- [ ] Botão voltar funcional em todas as telas

## Estrutura de Arquivos

```
tracking-sl-mockup/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx
│   │   ├── SplashScreen.css
│   │   ├── VistoriasList.jsx
│   │   ├── VistoriasList.css
│   │   ├── QuestionarioEPI.jsx
│   │   ├── QuestionarioEPI.css
│   │   ├── SelfiePage.jsx
│   │   └── SelfiePage.css
│   ├── App.jsx (Dados mockados e navegação)
│   ├── App.css (Variáveis CSS do manual de marca)
│   ├── index.css (Reset CSS)
│   └── main.jsx
├── .context/
│   ├── mockup-progress.json
│   ├── mockup-structure.json
│   └── comandos.md (este arquivo)
└── README.md

```

## Dados Mockados

### Vistorias (src/App.jsx:9-40)
```javascript
const mockVistorias = [
  { codigo: "VST-2024-089", tipo: "normal", status: "disponivel" },
  { codigo: "VST-2024-090", tipo: "comercial", status: "disponivel" },
  { codigo: "VST-2024-091", tipo: "noturna", status: "bloqueada" }
]
```

### EPIs (src/components/QuestionarioEPI.jsx:4-11)
```javascript
const episList = [
  { id: 1, nome: 'Capacete' },
  { id: 2, nome: 'Colete Refletivo' },
  { id: 3, nome: 'Botina de Segurança' },
  { id: 4, nome: 'Óculos de Proteção' },
  { id: 5, nome: 'Luvas' },
  { id: 6, nome: 'Cinto de Segurança' }
]
```

## Próximos Passos (Opcional)

Se houver necessidade de melhorias:
- [ ] Adicionar mais transições CSS
- [ ] Implementar animações adicionais
- [ ] Criar telas adicionais do fluxo
- [ ] Adicionar mais estados de vistoria
- [ ] Implementar localStorage para persistência simulada
- [ ] Adicionar tema escuro (dark mode)

---

**Última atualização:** 2025-11-04
**Status:** ✅ Mockup completo e funcional
