# Anti-Patterns

## Colors

| NEVER | DO Instead |
|---|---|
| Use `slate-`, `zinc-`, `neutral-`, `stone-` palette | Use `gray-` palette exclusively |
| Use raw color stops like `bg-blue-500` for actions | Use `bg-amber-500 hover:bg-amber-600` for primary actions |
| Use `text-black` for headings | Use `text-gray-900` |
| Use arbitrary color values `bg-[#xxx]` | Use established palette tokens |
| Mix different gray scales in the same view | Stick to a single gray stop per semantic role |
| Use `bg-red-500` for destructive buttons | Use `text-red-500 border-red-200 hover:bg-red-50` (outline style) |
| Use `bg-green-500` for success buttons | Use `bg-amber-500` for all primary actions; use `toast.success()` for feedback |

## Typography

| NEVER | DO Instead |
|---|---|
| Use `text-base` (16px) for body text | Use `text-sm` (14px) — the standard body size |
| Use `font-normal` (400) for labels | Use `font-medium` (500) for labels |
| Use `text-lg` or larger for form labels | Use `text-sm font-medium text-gray-700` |
| Use `font-extrabold` or `font-black` | Use `font-bold` (700) max for headings |
| Add letter-spacing or tracking utilities | Use default letter-spacing |
| Use arbitrary text sizes `text-[17px]` | Use scale: xs, sm, lg, xl, 2xl, 3xl |

## Spacing

| NEVER | DO Instead |
|---|---|
| Use `gap-5`, `p-5`, `p-7` (odd multiples) | Use even multiples: gap-2, gap-3, gap-4, gap-6, gap-8 |
| Use arbitrary spacing `p-[13px]` | Use Tailwind spacing scale |
| Use different container widths per page | Use `max-w-6xl mx-auto px-4 sm:px-6` consistently |
| Add `mb-*` to the last item in a list | Use `space-y-*` or `gap-*` on the container |
| Mix `space-y-*` and explicit `mb-*` in same container | Pick one approach per container |

## Shadows

| NEVER | DO Instead |
|---|---|
| Add `shadow-*` to buttons | Buttons have no shadow; use `transition-colors` for hover feedback |
| Add `shadow-*` to form inputs | Inputs use `focus:ring-2 focus:ring-amber-500` for focus |
| Use `shadow-lg` or `shadow-xl` | Use `shadow-sm` at rest, `hover:shadow-md` for cards |
| Add shadow to badges or chips | Badges and chips are flat |

## Components

| NEVER | DO Instead |
|---|---|
| Import shadcn/ui, Radix, Headless UI, MUI | Use native HTML elements with Tailwind classes |
| Create a `Button` component with multiple variants | Use inline classes matching established patterns |
| Use `<button>` for navigation | Use `<Link>` styled as a button for navigation |
| Use `<a>` for internal links | Use `<Link>` from react-router |
| Forget `transition-colors` on interactive elements | Always add `transition-colors` to buttons and links |
| Use `cursor-pointer` on buttons | Buttons already have pointer cursor by default |
| Use different input styles across forms | Use the shared `inputClass` constant for all inputs/textareas/selects |
| Style destructive buttons with filled red background | Use outline style: `border-red-200 text-red-500 hover:bg-red-50` |

## Layout

| NEVER | DO Instead |
|---|---|
| Use `max-w-4xl`, `max-w-5xl`, `max-w-7xl` | Use `max-w-6xl` — the single container width |
| Nest content containers | One `max-w-6xl` at the layout level is enough |
| Use absolute positioning for layout | Use flexbox or grid |
| Use z-index values other than `z-10` for header | Header is `z-10`; avoid z-index elsewhere |
| Skip `overflow-hidden` on cards with images | Always add `overflow-hidden` to cards that contain images |
| Forget mobile-first responsive classes | Start with mobile layout, add `sm:`, `md:`, `lg:` breakpoints |

## Border Radius

| NEVER | DO Instead |
|---|---|
| Use `rounded-md` for cards | Use `rounded-xl` for cards and panels |
| Use `rounded-xl` for buttons or inputs | Use `rounded-lg` for buttons, inputs, filter chips |
| Use `rounded-lg` for badges | Use `rounded-full` for badges, dots, step circles |
| Mix radius values for same component type | All cards get `rounded-xl`, all buttons get `rounded-lg` |
| Use arbitrary radius `rounded-[10px]` | Use scale: rounded, rounded-lg, rounded-xl, rounded-full |

## Icons

| NEVER | DO Instead |
|---|---|
| Import icons from `react-icons`, `heroicons`, `@mui/icons` | Use `lucide-react` exclusively |
| Use `w-5 h-5` for standard icons | Use `w-4 h-4` for standard, `w-6 h-6` for nav, `w-16 h-16` for empty states |
| Use icon-only buttons without adequate hit area | Add `p-2` for icon-only clickable elements |
| Use different icon sets across the app | Stick to `lucide-react` for consistency |
| Forget `shrink-0` on icons in flex containers | Add `shrink-0` to prevent icon squishing |

## Forms

| NEVER | DO Instead |
|---|---|
| Style individual inputs differently | Use the shared `inputClass` for all form controls |
| Use `focus:ring-blue-500` or other colors | Use `focus:ring-amber-500` for focus rings |
| Show all validation errors at once | Show first error only: `errors.field[0]` |
| Place error messages far from the field | Place directly below with `mt-1` |
| Use `required` HTML attribute for visual indicators | Handle validation through Zod schemas |
| Forget `disabled:opacity-50 disabled:cursor-not-allowed` on submit | Always add disabled state styling |
