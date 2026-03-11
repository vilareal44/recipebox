# Design Tokens Reference

## Table of Contents
- [Color Palette](#color-palette)
- [Category Semantic Colors](#category-semantic-colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Border Radius](#border-radius)
- [Shadows](#shadows)
- [Animations & Transitions](#animations--transitions)
- [Breakpoints](#breakpoints)
- [Container Widths](#container-widths)

## Color Palette

### Gray Scale

| Tailwind Class | Hex | Usage |
|----------------|-----|-------|
| `gray-50` | #f9fafb | Page background (`bg-gray-50`) |
| `gray-100` | #f3f4f6 | Card border (`border-gray-100`), skeleton bg, inactive button border |
| `gray-200` | #e5e7eb | Header border (`border-gray-200`), skeleton bars (`bg-gray-200`), input border |
| `gray-300` | #d1d5db | Input/secondary button border (`border-gray-300`), empty state icon |
| `gray-400` | #9ca3af | Subtle text (`text-gray-400`): meta data on cards, step numbers in form |
| `gray-500` | #6b7280 | Muted text (`text-gray-500`): meta row, empty state heading, back link |
| `gray-600` | #4b5563 | Secondary text (`text-gray-600`): body, description, ingredient/instruction text, inactive filter |
| `gray-700` | #374151 | Label text (`text-gray-700`) |
| `gray-900` | #111827 | Primary text (`text-gray-900`): headings, titles |
| `white` | #ffffff | Surface (`bg-white`): cards, header, buttons |

### Amber (Brand / Primary)

| Tailwind Class | Hex | Usage |
|----------------|-----|-------|
| `amber-100` | #fef3c7 | Breakfast badge bg, step number bg (`bg-amber-100`) |
| `amber-200` | #fde68a | Breakfast placeholder bg |
| `amber-500` | #f59e0b | Primary button bg, active filter bg, focus ring, ingredient bullet |
| `amber-600` | #d97706 | Button hover, brand icon, link text, ghost link text |
| `amber-700` | #b45309 | Step number text (`text-amber-700`), link hover |
| `amber-800` | #92400e | Breakfast badge text (`text-amber-800`) |

### Red (Destructive / Error)

| Tailwind Class | Hex | Usage |
|----------------|-----|-------|
| `red-50` | #fef2f2 | Delete button hover bg (`hover:bg-red-50`) |
| `red-200` | #fecaca | Delete button border (`border-red-200`) |
| `red-400` | #f87171 | Remove item button text (`text-red-400`) |
| `red-500` | #ef4444 | Error text, delete button text, remove button hover |
| `red-600` | #dc2626 | Remove button hover text (`hover:text-red-600`) |

## Category Semantic Colors

Each category uses a consistent 100/800 pair for badges and a 200-level for placeholders:

| Category | Badge Background | Badge Text | Placeholder |
|----------|-----------------|------------|-------------|
| breakfast | `bg-amber-100` #fef3c7 | `text-amber-800` #92400e | `bg-amber-200` #fde68a |
| lunch | `bg-green-100` #dcfce7 | `text-green-800` #166534 | `bg-green-200` #bbf7d0 |
| dinner | `bg-blue-100` #dbeafe | `text-blue-800` #1e40af | `bg-blue-200` #bfdbfe |
| dessert | `bg-pink-100` #fce7f3 | `text-pink-800` #9d174d | `bg-pink-200` #fbcfe8 |
| snack | `bg-orange-100` #ffedd5 | `text-orange-800` #9a3412 | `bg-orange-200` #fed7aa |

## Typography

### Font Stack
- Sans: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
- Mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

### Text Scale (used in the app)

| Class | Size | Line Height | Used For |
|-------|------|-------------|----------|
| `text-xs` | 0.75rem (12px) | 1.333 | Badges, error messages |
| `text-sm` | 0.875rem (14px) | 1.429 | Labels, inputs, meta text, buttons, descriptions |
| (default) | 1rem (16px) | 1.5 | Body text, descriptions |
| `text-lg` | 1.125rem (18px) | 1.556 | Card titles, section headings, empty state heading |
| `text-xl` | 1.25rem (20px) | 1.4 | Brand title "RecipeBox", not-found heading |
| `text-2xl` | 1.5rem (24px) | 1.333 | Page headings (mobile), section headings |
| `text-3xl` | 1.875rem (30px) | 1.2 | Page headings (sm+ via `sm:text-3xl`) |
| `text-4xl` | 2.25rem (36px) | 1.111 | (Available but unused) |

### Font Weights

| Class | Weight | Used For |
|-------|--------|----------|
| `font-medium` | 500 | Buttons, badges, labels, step numbers |
| `font-semibold` | 600 | Card titles, section headings |
| `font-bold` | 700 | Page titles, brand title |

## Spacing

### Base Unit
`--spacing: 0.25rem` (4px). All spacing utilities are multiples of this.

### Common Spacing Patterns

| Pattern | Classes | Pixels |
|---------|---------|--------|
| Page horizontal padding | `px-4 sm:px-6` | 16px → 24px |
| Page vertical padding | `py-8` | 32px |
| Card internal padding | `p-6 sm:p-8` | 24px → 32px |
| Header height | `h-16` | 64px |
| Button padding (primary) | `px-4 py-2` | 16px / 8px |
| Button padding (submit) | `px-6 py-2.5` | 24px / 10px |
| Button padding (secondary) | `px-3 py-2` | 12px / 8px |
| Input padding | `px-3 py-2` | 12px / 8px |
| Badge padding | `px-2 py-1` | 8px / 4px |
| Section margin bottom | `mb-6` or `mb-8` | 24px or 32px |
| Grid gap (cards) | `gap-6` | 24px |
| Grid gap (content) | `gap-8` | 32px |
| Grid gap (form) | `gap-4` | 16px |
| Form field gap | `space-y-6` | 24px |
| List item gap | `space-y-2` or `space-y-3` | 8px or 12px |
| Inline icon gap | `gap-1` or `gap-2` | 4px or 8px |
| Filter bar gap | `gap-2` | 8px |
| Meta items gap | `gap-4` (cards), `gap-6` (detail) | 16px, 24px |
| Empty state vertical | `py-16` | 64px |

## Border Radius

| Token | Class | Value | Used On |
|-------|-------|-------|---------|
| xl | `rounded-xl` | 0.75rem (12px) | Cards, form containers, skeleton images, hero images |
| lg | `rounded-lg` | 0.5rem (8px) | Buttons, inputs, selects, filter tabs |
| full | `rounded-full` | pill | Category badges, ingredient bullets, step number circles |
| default | `rounded` | 0.25rem (4px) | Skeleton text bars |

## Shadows

| Level | Class | CSS Value | Used On |
|-------|-------|-----------|---------|
| Small | `shadow-sm` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` | Cards at rest |
| Medium | `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Cards on hover only |

No other shadow levels are used. Header, buttons, inputs, badges — all have no shadow.

## Animations & Transitions

### Transitions

| Class | Properties | Duration | Easing |
|-------|-----------|----------|--------|
| `transition-colors` | color, background-color, border-color, text-decoration-color, fill, stroke | 150ms | ease-in-out |
| `transition-shadow` | box-shadow | 150ms | ease-in-out |

### Loading Animation

| Class | Keyframes | Usage |
|-------|-----------|-------|
| `animate-pulse` | Opacity 1 → 0.5 → 1 (2s loop) | All skeleton loaders |

### Transforms (rare)

| Class | Value | Usage |
|-------|-------|-------|
| `hover:scale-105` | 105% | (Available, not currently used on cards) |

## Breakpoints

| Prefix | Min-width | Usage |
|--------|-----------|-------|
| `sm` | 640px | Form grid 3-col, card padding increase, button width change |
| `md` | 768px | Grid 2-col, content 2-col split |
| `lg` | 1024px | Grid 3-col |

## Container Widths

| Class | Value | Usage |
|-------|-------|-------|
| `max-w-6xl` | 72rem (1152px) | Page content container (header + main) |
| `max-w-xs` | 20rem (320px) | (Available, unused) |
