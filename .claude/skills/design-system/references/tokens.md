# Design Tokens

Tailwind CSS v4 with default theme. No custom `@theme` overrides. CSS entry: `@import 'tailwindcss'` only.

## Colors — Gray Scale

| CSS Variable | OKLCH | Tailwind Class | Usage |
|---|---|---|---|
| `--color-gray-50` | `oklch(98.5% .002 247.839)` | `bg-gray-50` | Page background |
| `--color-gray-100` | `oklch(96.7% .003 264.542)` | `border-gray-100`, `hover:bg-gray-100` | Card borders, hover states |
| `--color-gray-200` | `oklch(92.8% .006 264.531)` | `bg-gray-200`, `border-gray-200` | Skeletons, header border, filter chip border |
| `--color-gray-300` | `oklch(87.2% .01 258.338)` | `border-gray-300`, `text-gray-300` | Form input borders, empty state icons |
| `--color-gray-400` | `oklch(70.7% .022 261.325)` | `text-gray-400` | Muted text, meta info, step numbers |
| `--color-gray-500` | `oklch(55.1% .027 264.364)` | `text-gray-500` | Secondary text, back links |
| `--color-gray-600` | `oklch(44.6% .03 256.802)` | `text-gray-600` | Body text, description, filter chip text |
| `--color-gray-700` | `oklch(37.3% .034 259.733)` | `text-gray-700` | Form labels |
| `--color-gray-900` | `oklch(21% .034 264.665)` | `text-gray-900` | Headings, titles |
| `--color-white` | `#ffffff` | `bg-white`, `text-white` | Surfaces, primary button text |

## Colors — Amber (Primary Brand)

| CSS Variable | OKLCH | Tailwind Class | Usage |
|---|---|---|---|
| `--color-amber-100` | `oklch(96.2% .059 95.617)` | `bg-amber-100` | Step number bg, breakfast badge bg |
| `--color-amber-200` | `oklch(92.4% .12 95.746)` | `bg-amber-200` | Breakfast placeholder bg |
| `--color-amber-500` | `oklch(76.9% .188 70.08)` | `bg-amber-500` | Primary buttons, active filters, bullet dots, focus ring |
| `--color-amber-600` | `oklch(66.6% .179 58.318)` | `hover:bg-amber-600`, `text-amber-600` | Button hover, text links |
| `--color-amber-700` | `oklch(55.5% .163 48.998)` | `text-amber-700`, `hover:text-amber-700` | Step number text, link hover |
| `--color-amber-800` | `oklch(47.3% .137 46.201)` | `text-amber-800` | Breakfast badge text |

## Colors — Red (Destructive)

| CSS Variable | OKLCH | Tailwind Class | Usage |
|---|---|---|---|
| `--color-red-50` | `oklch(97.1% .013 17.38)` | `hover:bg-red-50` | Delete button hover bg |
| `--color-red-200` | `oklch(88.5% .062 18.334)` | `border-red-200` | Delete button border |
| `--color-red-400` | `oklch(70.4% .191 22.216)` | `text-red-400` | Remove item icon |
| `--color-red-500` | `oklch(63.7% .237 25.331)` | `text-red-500` | Error text, delete button text |
| `--color-red-600` | `oklch(57.7% .245 27.325)` | `hover:text-red-600` | Remove icon hover |

## Colors — Category Badges

| Category | Badge bg | Badge text | Placeholder bg |
|---|---|---|---|
| breakfast | `bg-amber-100` | `text-amber-800` | `bg-amber-200` |
| lunch | `bg-green-100` | `text-green-800` | `bg-green-200` |
| dinner | `bg-blue-100` | `text-blue-800` | `bg-blue-200` |
| dessert | `bg-pink-100` | `text-pink-800` | `bg-pink-200` |
| snack | `bg-orange-100` | `text-orange-800` | `bg-orange-200` |

## Typography

| Tailwind Class | Size | Line-height | Usage |
|---|---|---|---|
| `text-xs` | 0.75rem (12px) | ~1.333 | Badges, error messages |
| `text-sm` | 0.875rem (14px) | ~1.429 | Labels, body, meta, inputs |
| `text-lg` | 1.125rem (18px) | ~1.556 | Section headings, card titles |
| `text-xl` | 1.25rem (20px) | 1.4 | Nav brand |
| `text-2xl` | 1.5rem (24px) | ~1.333 | Page headings |
| `text-3xl` | 1.875rem (30px) | 1.2 | Detail page heading (sm+) |
| `text-4xl` | 2.25rem (36px) | ~1.111 | Placeholder emoji |

| Weight Class | Value | Usage |
|---|---|---|
| `font-medium` | 500 | Labels, badges, nav button, submit |
| `font-semibold` | 600 | Section headings, card titles |
| `font-bold` | 700 | Page headings, nav brand |

## Spacing

Base: `--spacing: 0.25rem` (4px). All utilities are multiples of this.

| Class | Value | Common usage |
|---|---|---|
| `gap-1` / `mt-1` / `mb-1` | 4px | Label-to-input, error margin |
| `gap-2` / `px-2` / `py-2` / `space-y-2` | 8px | Inline gaps, badge padding, list spacing |
| `px-3` / `py-3` / `gap-3` / `mb-3` / `space-y-3` | 12px | Input padding, instruction list spacing |
| `gap-4` / `px-4` / `mb-4` | 16px | Grid gap (small), container padding (mobile) |
| `gap-6` / `p-6` / `mb-6` / `space-y-6` | 24px | Card padding, form spacing, recipe grid gap |
| `gap-8` / `py-8` / `mb-8` | 32px | Page padding, detail column gap |
| `py-16` | 64px | Empty state vertical padding |

## Border Radius

| CSS Variable | Value | Tailwind Class | Usage |
|---|---|---|---|
| — | 4px | `rounded` | Skeleton bars |
| `--radius-lg` | 8px | `rounded-lg` | Buttons, inputs, filter chips |
| `--radius-xl` | 12px | `rounded-xl` | Cards, panels, images |
| — | pill | `rounded-full` | Badges, dots, step circles |

## Shadows

| Tailwind Class | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)` | Cards at rest, detail panel |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)` | Card hover state |

## Animations

| Property | Value |
|---|---|
| Default transition duration | `0.15s` |
| Default easing | `cubic-bezier(.4, 0, .2, 1)` |
| Pulse animation | `pulse 2s cubic-bezier(.4, 0, .6, 1) infinite` |

| Transition Class | Properties |
|---|---|
| `transition-colors` | color, background-color, border-color, outline-color, text-decoration-color, fill, stroke |
| `transition-shadow` | box-shadow |

## Breakpoints

| Prefix | Min-width |
|---|---|
| `sm:` | 640px (40rem) |
| `md:` | 768px (48rem) |
| `lg:` | 1024px (64rem) |
