# TrackinG SI - Mockup Interativo

Mockup web interativo para demonstração do **TrackinG SI**, produto da NG Solutions para vistorias técnicas em sites de telecomunicações.

## Sobre o Projeto

Este é um protótipo navegável criado para apresentação visual do fluxo de trabalho. Todos os dados são mockados e nenhuma funcionalidade real é processada - o objetivo é demonstrar a experiência do usuário de forma realista.

## Stack Técnico

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **CSS3** - Estilos com Custom Properties
- **JavaScript ES6+** - Lógica de navegação

## Cores (Manual de Marca NG Solutions)

- **Azul Primário:** `#42738d` - Elementos principais da interface
- **Laranja Destaque:** `#f19f53` - CTAs e botões de ação
- **Cinza Secundário:** `#bdbbbb` - Textos secundários

## Estrutura do Fluxo

1. **Splash Screen** (3s) - Logo TrackinG SI com animação
2. **Lista de Vistorias** - 3 cards com estados diferentes
3. **Questionário EPI** - Checklist de 6 equipamentos
4. **Selfie com EPI** - Captura simulada com validações
5. **Confirmação** - Retorna à lista com status atualizado

## Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

O mockup estará disponível em `http://localhost:5173`

## Dados Mockados

### Vistorias
- **VST-2024-089** - Torre Greenfield (APTA)
- **VST-2024-090** - Rooftop Comercial (HORÁRIO COMERCIAL)
- **VST-2024-091** - Torre Rural (BLOQUEADA)

### EPIs
1. Capacete
2. Colete Refletivo
3. Botina de Segurança
4. Óculos de Proteção
5. Luvas
6. Cinto de Segurança

## Funcionalidades Interativas

- Timer automático no splash screen
- Click em cards de vistoria disponível
- Bloqueio de vistorias sem pré-requisitos
- Checklist interativo de EPIs
- Simulação de captura de foto com flash
- Validações mockadas na selfie
- Navegação voltar funcional
- Transições suaves entre telas

## Responsividade

Interface otimizada para viewport mobile (máximo 480px), centralizada em telas maiores.

## Arquivos de Controle

- `.context/mockup-progress.json` - Progresso da implementação
- `.context/mockup-structure.json` - Estrutura do projeto

## Observações

- Este é um **mockup navegável**, não um aplicativo funcional
- Dados são hardcoded, sem persistência real
- Foco em fidelidade visual ao manual de marca NG Solutions
- Logo sempre respeitando proporções (símbolo ng + ponto laranja)

---

**TrackinG SI** by NG Solutions
# tracking-sl
