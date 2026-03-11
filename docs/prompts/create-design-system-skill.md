Preciso que você extraia o Design System deste projeto e crie uma skill do Claude Code para que toda futura implementação de UI seja consistente.

## O que fazer

### 1. Analise o Design System existente

Use multiplos agentes para explorar e identificar os padrões de UI/UX utilizados nesse projeto.  
Leia os arquivos de estilo do projeto (CSS/SCSS principal, tailwind config, theme config, design tokens, etc.) e os componentes UI base (botões, cards, inputs, tabs, badges, modals, drawers, selects, etc.). Identifique:

- **Design philosophy**: Qual é a filosofia visual? (ex: minimal, material, glassmorphism, flat, etc.)
- **Color tokens**: Todas as cores semânticas (background, foreground, primary, accent, destructive, success, warning, error, info, border, etc.) com hex e classes CSS/Tailwind correspondentes
- **Typography scale**: Todos os tamanhos/pesos tipográficos com classes utilitárias, line-height, letter-spacing
- **Spacing system**: Grid base (4px? 8px?), padrões de padding/margin/gap usados consistentemente
- **Border radius tokens**: Valores por componente (inputs, cards, buttons, modals, etc.)
- **Shadow/elevation tokens**: Quais componentes usam sombra e quais não
- **Animation tokens**: Durations, easing curves, transitions padrão
- **Component variants**: Para cada componente UI base, extraia as variantes (sizes, styles) com as classes exatas

### 2. Crie a skill em `.claude/skills/design-system/`

Crie a seguinte estrutura:

```
.claude/skills/design-system/
├── SKILL.md              # Arquivo principal da skill
└── references/
    ├── tokens.md         # Tabela completa de todos os tokens (cores, tipografia, spacing, radius, shadows, animations)
    ├── components.md     # Implementação gold-standard de cada componente UI base (classes exatas do código)
    ├── patterns.md       # Padrões de composição: layouts, listas, estados vazios, scroll horizontal, loading states
    └── anti-patterns.md  # Regras "NUNCA faça X → FAÇA Y" organizadas por categoria
```

### 3. Formato do SKILL.md

Use este frontmatter:

```yaml
---
name: design-system
description: Design system reference — design tokens, component patterns, and anti-patterns for the UI codebase. Use this skill whenever creating, modifying, or reviewing any UI code. Ensures correct semantic tokens, typography, spacing, component variants, and layout patterns.
---
```

O conteúdo do SKILL.md deve incluir:
- **Design Philosophy** (5-6 princípios curtos)
- **Quick Reference** tables para: Colors, Typography, Spacing, Components, Border Radius, Shadows
- **Critical Rules (Top 10)** — as regras mais importantes como NEVER/ALWAYS
- **When to Load References** — ponteiros para os arquivos em `references/`

### 4. Formato dos reference files

**tokens.md**: Tabelas completas com CSS Variable | Hex | Tailwind Class | Usage para cada categoria de token.

**components.md**: Para cada componente UI base, extraia as classes exatas do código-fonte. Inclua variantes, sizes, e exemplos de uso em JSX/TSX. Componentes típicos: Button, Card, Input, Tabs, Badge, Drawer/Sheet, Dialog/Modal, Select, Skeleton, PageHeader (se existir).

**patterns.md**: Padrões de composição extraídos de componentes reais:
- Layout principal (app shell, sidebar, nav)
- Estrutura de página padrão
- Headers de seção
- Listas com dividers
- Estados vazios (empty states)
- Loading states (skeletons)
- CTAs fixos
- Scroll containers
- Ícones (library, tamanhos padrão)

**anti-patterns.md**: Tabelas "NEVER | DO Instead" organizadas por categoria:
- Colors (nunca usar cores raw do Tailwind)
- Typography (nunca usar ad-hoc text sizes)
- Spacing (aderir ao grid)
- Shadows (quem pode e quem não pode ter shadow)
- Components (erros comuns de estilo por componente)
- Layout (max-width, z-index, padding)
- Border Radius (consistência por tipo de elemento)
- Icons (library, tamanhos, estados)

### 5. Regras importantes

- Extraia TUDO do código existente — não invente valores. Leia os arquivos reais.
- Use tabelas markdown para máxima scannability.
- Mantenha o SKILL.md conciso (~120 linhas) com quick references. Detalhes vão nos reference files.
- Cada anti-pattern deve ter um "DO instead" concreto com a classe/componente correto.
- Inclua exemplos de código JSX/TSX reais extraídos dos componentes existentes.

### 6. Atualize o CLAUDE.md

Adicione uma seção "Design System" no CLAUDE.md do projeto com:
- As 5-6 regras mais críticas (NEVER/ALWAYS)
- Ponteiro para a skill: "Full reference: `.claude/skills/design-system/SKILL.md`"