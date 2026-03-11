---
name: design-system
description: Design system reference — design tokens, component patterns, and anti-patterns for the RecipeBox UI codebase. Use this skill whenever creating, modifying, or reviewing any UI code (components, pages, layouts, styles). Ensures correct semantic tokens, typography, spacing, component variants, and layout patterns. Triggers on any frontend/UI work in apps/web/.
---

# RecipeBox Design System

## Design Philosophy

1. **Warm minimal** — clean white cards on gray-50 background, amber as the sole brand color
2. **Utility-first** — raw Tailwind CSS v4 classes, no component library, no custom CSS
3. **Consistent surfaces** — all content containers use the same card shell: `bg-white rounded-xl shadow-sm border border-gray-100`
4. **Category-semantic colors** — each recipe category has a dedicated color pair used everywhere consistently
5. **Progressive loading** — every data-dependent view has an `animate-pulse` skeleton matching the real layout
6. **Responsive with 3 tiers** — single column (mobile) → 2 columns (md:768px) → 3 columns (lg:1024px)

## Quick Reference

### Colors

| Role | Class(es) | Hex |
|------|-----------|-----|
| Background | `bg-gray-50` | #f9fafb |
| Surface / Card | `bg-white` | #ffffff |
| Border | `border-gray-100`, `border-gray-200` | #f3f4f6, #e5e7eb |
| Text primary | `text-gray-900` | #111827 |
| Text secondary | `text-gray-600` | #4b5563 |
| Text muted | `text-gray-500` | #6b7280 |
| Text subtle | `text-gray-400` | #9ca3af |
| Brand / CTA | `bg-amber-500`, `hover:bg-amber-600` | #f59e0b, #d97706 |
| Brand icon | `text-amber-600` | #d97706 |
| Brand accent | `bg-amber-100 text-amber-700/800` | #fef3c7 |
| Focus ring | `focus:ring-amber-500` | #f59e0b |
| Destructive | `text-red-500`, `border-red-200` | #ef4444, #fecaca |
| Error text | `text-red-500` | #ef4444 |

### Category Colors

| Category | Badge | Placeholder |
|----------|-------|-------------|
| breakfast | `bg-amber-100 text-amber-800` | `bg-amber-200` |
| lunch | `bg-green-100 text-green-800` | `bg-green-200` |
| dinner | `bg-blue-100 text-blue-800` | `bg-blue-200` |
| dessert | `bg-pink-100 text-pink-800` | `bg-pink-200` |
| snack | `bg-orange-100 text-orange-800` | `bg-orange-200` |

### Typography

| Role | Classes |
|------|---------|
| Page title | `text-2xl sm:text-3xl font-bold text-gray-900` |
| Section heading | `text-2xl font-bold text-gray-900` |
| Card title | `text-lg font-semibold text-gray-900` |
| Body | `text-gray-600` (default size) |
| Small / meta | `text-sm text-gray-500` or `text-sm text-gray-400` |
| Label | `text-sm font-medium text-gray-700` |
| Extra small | `text-xs` (badges, errors) |
| Brand title | `text-xl font-bold` |

### Spacing

| Pattern | Value |
|---------|-------|
| Base unit | 4px (`--spacing: 0.25rem`) |
| Page padding | `px-4 sm:px-6` |
| Page vertical | `py-8` |
| Card padding | `p-6 sm:p-8` |
| Section gap | `mb-6`, `mb-8` |
| Grid gap | `gap-6` (cards), `gap-8` (content sections), `gap-4` (form grid) |
| List item gap | `space-y-2` (ingredients), `space-y-3` (instructions) |
| Form field gap | `space-y-6` |

### Components

| Component | Key classes |
|-----------|------------|
| Card shell | `bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden` |
| Primary button | `bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors` |
| Submit button | Same + `px-6 py-2.5 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed` |
| Secondary button | `border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 px-3 py-2 text-sm` |
| Destructive button | `border border-red-200 rounded-lg text-red-500 hover:bg-red-50 px-3 py-2 text-sm` |
| Input / Select | `w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent` |
| Category badge | `text-xs font-medium px-2 py-1 rounded-full` + category color |
| Filter tab (active) | `px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 text-white` |
| Filter tab (inactive) | `px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-100 border border-gray-200` |
| Ghost link button | `text-sm text-amber-600 hover:text-amber-700 inline-flex items-center gap-1` |
| Back link | `inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors` |

### Border Radius

| Element | Class |
|---------|-------|
| Cards, form containers, images | `rounded-xl` (0.75rem) |
| Buttons, inputs, filter tabs | `rounded-lg` (0.5rem) |
| Badges | `rounded-full` (pill) |
| Skeleton bars | `rounded` (0.25rem) |

### Shadows

| Surface | Classes |
|---------|---------|
| Cards at rest | `shadow-sm` |
| Cards on hover | `hover:shadow-md` (with `transition-shadow`) |
| All other elements | No shadow |

### Icons (lucide-react)

| Context | Size |
|---------|------|
| Inline UI (buttons, meta) | `w-4 h-4` |
| Header brand | `w-6 h-6` |
| Empty state illustration | `w-16 h-16 text-gray-300` |

## Critical Rules (Top 10)

1. **ALWAYS** use `bg-white rounded-xl shadow-sm border border-gray-100` for content cards
2. **ALWAYS** use amber-500/600 for primary actions — never other colors for CTAs
3. **ALWAYS** use the `categoryColors` map for badge colors — never assign category colors ad-hoc
4. **ALWAYS** provide `animate-pulse` skeleton states for loading views
5. **ALWAYS** use `max-w-6xl mx-auto px-4 sm:px-6` for page-level containers
6. **NEVER** use raw Tailwind colors outside the established palette (gray, amber, red, + category colors)
7. **NEVER** add custom CSS — use only Tailwind utility classes
8. **NEVER** use shadows beyond `shadow-sm` / `hover:shadow-md` on cards
9. **NEVER** use border-radius values other than `rounded-xl` (cards), `rounded-lg` (buttons/inputs), `rounded-full` (badges), `rounded` (skeletons)
10. **ALWAYS** use `transition-colors` or `transition-shadow` on interactive elements

## When to Load References

| Need | File |
|------|------|
| Full token tables (all colors, typography, spacing values) | [references/tokens.md](references/tokens.md) |
| Component implementation with exact JSX and classes | [references/components.md](references/components.md) |
| Layout patterns, page structure, loading/empty states | [references/patterns.md](references/patterns.md) |
| What NOT to do, with correct alternatives | [references/anti-patterns.md](references/anti-patterns.md) |
