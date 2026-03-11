---
name: design-system
description: Design system reference — design tokens, component patterns, and anti-patterns for the RecipeBox UI. Use this skill whenever creating, modifying, or reviewing any UI code in apps/web. Ensures correct color tokens, typography, spacing, component variants, and layout patterns. Triggers on any UI task involving React components, Tailwind classes, pages, forms, or styling.
---

# RecipeBox Design System

## Design Philosophy

1. **Minimal & warm** — Clean white cards on gray-50 background, amber accent
2. **Native HTML only** — No component library; plain elements with Tailwind classes
3. **Consistent tokens** — Same classes everywhere; no ad-hoc values
4. **Progressive density** — Mobile-first single column, expanding at md/lg breakpoints
5. **Subtle depth** — shadow-sm at rest, shadow-md on hover; no heavy elevation
6. **Amber is the brand** — All interactive/primary elements use amber-500/600

## Quick Reference

### Colors

| Role | Class | Hex (approx) |
|------|-------|---------------|
| Page background | `bg-gray-50` | #f9fafb |
| Card/surface | `bg-white` | #ffffff |
| Border | `border-gray-100` (cards), `border-gray-200` (header, inputs inactive), `border-gray-300` (form inputs) | |
| Primary text | `text-gray-900` | #111827 |
| Secondary text | `text-gray-600` | #4b5563 |
| Muted text | `text-gray-500` | #6b7280 |
| Subtle text | `text-gray-400` | #9ca3af |
| Primary action | `bg-amber-500` / `hover:bg-amber-600` | #f59e0b / #d97706 |
| Primary text link | `text-amber-600` / `hover:text-amber-700` | #d97706 / #b45309 |
| Destructive | `text-red-500`, `border-red-200`, `hover:bg-red-50` | |
| Focus ring | `focus:ring-2 focus:ring-amber-500` | |

### Category Badge Colors

| Category | Badge classes | Placeholder bg |
|----------|--------------|----------------|
| breakfast | `bg-amber-100 text-amber-800` | `bg-amber-200` |
| lunch | `bg-green-100 text-green-800` | `bg-green-200` |
| dinner | `bg-blue-100 text-blue-800` | `bg-blue-200` |
| dessert | `bg-pink-100 text-pink-800` | `bg-pink-200` |
| snack | `bg-orange-100 text-orange-800` | `bg-orange-200` |

### Typography

| Element | Classes |
|---------|---------|
| Page heading | `text-2xl font-bold text-gray-900` (+ `sm:text-3xl` for detail) |
| Section heading | `text-lg font-semibold text-gray-900` |
| Card title | `text-lg font-semibold text-gray-900` |
| Nav brand | `text-xl font-bold` |
| Form label | `text-sm font-medium text-gray-700` |
| Body text | `text-sm text-gray-600` |
| Muted meta | `text-sm text-gray-400` or `text-gray-500` |
| Badge | `text-xs font-medium` |
| Error | `text-red-500 text-xs` |

### Spacing

| Context | Value |
|---------|-------|
| Grid base | 4px (`--spacing: 0.25rem`) |
| Container | `max-w-6xl mx-auto px-4 sm:px-6` |
| Page content padding | `py-8` |
| Card body padding | `p-6` (cards), `p-6 sm:p-8` (form pages) |
| Section gap | `space-y-6` (forms), `gap-6` (grid), `gap-8` (detail columns) |
| Field gap | `mb-1` (label to input), `mt-1` (input to error) |

### Border Radius

| Element | Class |
|---------|-------|
| Buttons, inputs, filter chips | `rounded-lg` (8px) |
| Cards, panels | `rounded-xl` (12px) |
| Badges, dots, circles | `rounded-full` |
| Skeleton bars | `rounded` (4px) |

### Shadows

| State | Class |
|-------|-------|
| Card at rest | `shadow-sm` |
| Card on hover | `hover:shadow-md` |
| No shadow | Form inputs, badges, buttons |

### Icons (lucide-react)

| Context | Size |
|---------|------|
| Standard (inline, buttons) | `w-4 h-4` |
| Nav/header | `w-6 h-6` |
| Empty state | `w-16 h-16` |

## Critical Rules (Top 10)

1. **ALWAYS** use `amber-500`/`amber-600` for primary actions — never blue, green, or other colors
2. **ALWAYS** use `bg-white rounded-xl shadow-sm border border-gray-100` for content cards
3. **ALWAYS** use the shared input class: `w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`
4. **ALWAYS** use `max-w-6xl mx-auto px-4 sm:px-6` for page containers
5. **NEVER** use raw Tailwind color stops directly (e.g. `bg-slate-300`) — use the gray/amber palette established in this system
6. **NEVER** add shadows to buttons or inputs — only cards get shadows
7. **NEVER** use font sizes outside the established scale (xs, sm, lg, xl, 2xl, 3xl)
8. **ALWAYS** use `lucide-react` for icons; `w-4 h-4` standard, `w-6 h-6` nav, `w-16 h-16` empty states
9. **ALWAYS** use `animate-pulse` with `bg-gray-200` blocks for loading skeletons
10. **ALWAYS** add `transition-colors` to interactive elements (buttons, links)

## When to Load References

- **Building or modifying a component** → Read `references/components.md`
- **Need exact token values (hex, OKLCH, CSS vars)** → Read `references/tokens.md`
- **Composing a page layout, list, empty state, or loading state** → Read `references/patterns.md`
- **Reviewing code for design consistency** → Read `references/anti-patterns.md`
