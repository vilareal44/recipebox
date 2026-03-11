# Anti-Patterns Reference

## Table of Contents
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shadows](#shadows)
- [Border Radius](#border-radius)
- [Components](#components)
- [Layout](#layout)
- [Icons](#icons)
- [Forms](#forms)
- [Loading States](#loading-states)

---

## Colors

| NEVER | DO Instead |
|-------|-----------|
| Use raw Tailwind colors like `bg-blue-500` for buttons | Use `bg-amber-500 hover:bg-amber-600` for primary CTAs |
| Use arbitrary colors `bg-[#ff6600]` | Use only the established palette: gray, amber, red, + category colors |
| Use `text-black` for text | Use `text-gray-900` for headings, `text-gray-600` for body |
| Mix color systems (e.g., `slate-` with `gray-`) | Stick to `gray-` scale exclusively for neutrals |
| Assign ad-hoc colors to category badges | Use the `categoryColors` map: amber=breakfast, green=lunch, blue=dinner, pink=dessert, orange=snack |
| Use `text-green-500` or `text-blue-500` for success/info | Only amber for positive actions, red for errors/destructive |
| Use `bg-gray-100` for the page background | Use `bg-gray-50` for page background, `bg-white` for cards |

## Typography

| NEVER | DO Instead |
|-------|-----------|
| Use `text-base` explicitly | Omit size class for 16px body text (it's the default) |
| Use `text-5xl` or larger | Max heading size is `text-2xl sm:text-3xl` |
| Use `font-light` or `font-thin` | Use `font-medium` (500), `font-semibold` (600), or `font-bold` (700) |
| Use `font-extrabold` or `font-black` | Max weight is `font-bold` (700) |
| Use `tracking-wide` or custom letter-spacing | Use default letter-spacing (Tailwind defaults) |
| Use heading sizes for labels | Labels are always `text-sm font-medium text-gray-700` |
| Use `text-gray-800` for headings | Use `text-gray-900` for headings and titles |

## Spacing

| NEVER | DO Instead |
|-------|-----------|
| Use `px-8` or larger for page horizontal padding | Use `px-4 sm:px-6` consistently |
| Use `py-4` for page vertical padding | Use `py-8` for main content area |
| Use `gap-3` or `gap-5` for card grids | Use `gap-6` for card grids |
| Use `space-y-4` for form fields | Use `space-y-6` for form field groups |
| Use `p-4` for card content | Use `p-6 sm:p-8` for card/form containers |
| Use `mb-4` between page title and content | Use `mb-6` between page title and content card |
| Use `p-8` without responsive prefix | Use `p-6 sm:p-8` for progressive spacing |
| Use `gap-1` between filter tab buttons | Use `gap-2` for filter bar |

## Shadows

| NEVER | DO Instead |
|-------|-----------|
| Add `shadow-sm` to buttons or inputs | Only cards get shadows |
| Use `shadow-lg` or `shadow-xl` | Max shadow is `shadow-md` (only on card hover) |
| Add `shadow-md` as a default (non-hover) state | Cards rest at `shadow-sm`, elevate to `shadow-md` on hover |
| Add shadows to the header | Header uses `border-b border-gray-200` instead of shadow |
| Use `drop-shadow-*` utilities | Use `shadow-*` box shadows only |

## Border Radius

| NEVER | DO Instead |
|-------|-----------|
| Use `rounded-md` on cards | Use `rounded-xl` for cards and content containers |
| Use `rounded-xl` on buttons or inputs | Use `rounded-lg` for buttons, inputs, select, filter tabs |
| Use `rounded-lg` on badges | Use `rounded-full` for category badges (pill shape) |
| Use `rounded-2xl` or `rounded-3xl` | Max radius is `rounded-xl` (cards), `rounded-full` (badges) |
| Use `rounded-none` or `rounded-sm` on visible elements | Minimum visible radius is `rounded` (skeleton bars) |

## Components

| NEVER | DO Instead |
|-------|-----------|
| Create a card without `border border-gray-100` | Always include `shadow-sm border border-gray-100` on card shells |
| Use `bg-gray-50` for card surfaces | Cards are always `bg-white` |
| Style delete/destructive buttons like primary buttons | Destructive: `border border-red-200 text-red-500 hover:bg-red-50` |
| Use green for success buttons | Primary actions always use amber-500/600 |
| Skip `transition-colors` on buttons/links | All interactive elements need transition classes |
| Use `opacity-75` for disabled buttons | Use `disabled:opacity-50 disabled:cursor-not-allowed` |
| Create custom input styles per field | Reuse the shared `inputClass` constant for ALL inputs/textareas/selects |
| Skip focus ring styles on inputs | Always include `focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent` |

## Layout

| NEVER | DO Instead |
|-------|-----------|
| Use `max-w-4xl` or `max-w-7xl` for page containers | Use `max-w-6xl mx-auto` consistently |
| Use `container` class | Use `max-w-6xl mx-auto px-4 sm:px-6` |
| Use arbitrary z-index values | Header is `z-10`; avoid higher z-index unless absolutely necessary |
| Skip `overflow-hidden` on cards with images | Always add `overflow-hidden` when card has images above content |
| Use `flex-col` for card grids | Use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Use `w-screen` or `100vw` | Content is always constrained by `max-w-6xl` |
| Put padding on the grid container | Put `p-6`/`p-8` on individual cards; grid uses `gap-6` |

## Icons

| NEVER | DO Instead |
|-------|-----------|
| Use icons from libraries other than `lucide-react` | Always import from `lucide-react` |
| Use `w-5 h-5` for inline icons | Use `w-4 h-4` for inline/UI icons |
| Use `w-8 h-8` for header brand icon | Use `w-6 h-6` for header brand icon |
| Use `w-12 h-12` for empty state icons | Use `w-16 h-16` for empty state illustration icons |
| Color inline icons with brand color | Inline icons inherit text color; brand icon in header is `text-amber-600` |
| Skip `shrink-0` on icons in flex containers | Add `shrink-0` when icon is in a flex row with variable-length text |

## Forms

| NEVER | DO Instead |
|-------|-----------|
| Use `mb-2` for label-to-input spacing | Use `mb-1` (or `mb-2` only for dynamic list section labels) |
| Show error messages in `text-sm` | Errors are always `text-red-500 text-xs mt-1` |
| Use `required` attribute on inputs | Validation is handled by Zod schema on submit |
| Make submit button always full-width | Use `w-full sm:w-auto` for responsive submit buttons |
| Allow removing the last item in a dynamic list | Only show remove button when list has >1 item |
| Put add/remove buttons inside the input | Add button is below the list; remove is beside each row |

## Loading States

| NEVER | DO Instead |
|-------|-----------|
| Use a spinner or loading text | Use `animate-pulse` skeleton with `bg-gray-200` shapes |
| Show a blank page while loading | Always show skeleton that approximates the final layout |
| Use different skeleton shapes than the real content | Skeleton widths should approximate real content: `w-1/4` badges, `w-3/4` titles, `w-full` body |
| Render only 1 skeleton card | Always render 3 skeleton cards in grid views |
| Skip skeleton on edit pages | All pages with async data need a skeleton loading state |
| Use `bg-gray-300` for skeleton bars | Use `bg-gray-200` consistently for all skeleton elements |
