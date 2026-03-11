# Layout & Composition Patterns

## Table of Contents
- [App Shell](#app-shell)
- [Page Structure](#page-structure)
- [Responsive Grid](#responsive-grid)
- [Form Page](#form-page)
- [Detail Page](#detail-page)
- [Loading Skeletons](#loading-skeletons)
- [Empty States](#empty-states)
- [Not-Found States](#not-found-states)
- [Filter Bar](#filter-bar)
- [Dynamic List Fields](#dynamic-list-fields)
- [Toast Notifications](#toast-notifications)
- [Icon Usage](#icon-usage)

---

## App Shell

All pages render inside `Layout` which provides:
- Sticky white header with brand + CTA
- Gray-50 background
- Centered content container (max-w-6xl)

```
┌─────────────────────────────────────────┐
│ header (sticky, bg-white, border-b)     │
│  [Logo]                    [New Recipe]  │
├─────────────────────────────────────────┤
│ main (bg-gray-50, max-w-6xl, py-8)     │
│                                         │
│   <page content via Outlet />           │
│                                         │
└─────────────────────────────────────────┘
```

---

## Page Structure

### List Page (Home)

```
div
  ├── Filter bar (flex, overflow-x-auto)
  └── Grid (1/2/3 columns responsive)
       └── RecipeCard × N
```

### Form Page (Create / Edit)

```
div
  ├── h1 (page title)
  └── Content card shell
       └── RecipeForm
```

### Detail Page

```
div
  ├── Back link
  └── Content card shell (overflow-hidden)
       ├── Hero image (optional)
       └── Padded body
            ├── Header row (badge + title | action buttons)
            ├── Description
            ├── Meta row
            └── 2-column grid (ingredients | instructions)
```

---

## Responsive Grid

The primary responsive grid for card lists:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

For content sections (ingredients/instructions split):

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>{/* left column */}</div>
  <div>{/* right column */}</div>
</div>
```

For form field groups (prep/cook/servings):

```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div>{/* field 1 */}</div>
  <div>{/* field 2 */}</div>
  <div>{/* field 3 */}</div>
</div>
```

---

## Form Page

Standard wrapper for create/edit pages:

```tsx
<div>
  <h1 className="text-2xl font-bold text-gray-900 mb-6">New Recipe</h1>
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
    <RecipeForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
  </div>
</div>
```

---

## Detail Page

Header row with action buttons:

```tsx
<div className="flex flex-wrap items-start justify-between gap-4 mb-4">
  <div>
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[category]}`}>
      {category}
    </span>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{title}</h1>
  </div>
  <div className="flex gap-2">
    {/* Edit and Delete buttons */}
  </div>
</div>
```

---

## Loading Skeletons

All skeletons use `animate-pulse` on a parent container with `bg-gray-200 rounded` children.

### Card Grid Skeleton (Home)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[1, 2, 3].map((i) => (
    <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  ))}
</div>
```

### Detail Page Skeleton

```tsx
<div className="animate-pulse space-y-6">
  <div className="h-6 bg-gray-200 rounded w-24" />
  <div className="h-8 bg-gray-200 rounded w-1/2" />
  <div className="h-64 bg-gray-200 rounded-xl" />
</div>
```

### Edit Page Skeleton

```tsx
<div className="animate-pulse space-y-6">
  <div className="h-8 bg-gray-200 rounded w-1/3" />
  <div className="h-96 bg-gray-200 rounded-xl" />
</div>
```

### Skeleton Design Rules

1. Parent gets `animate-pulse` — children inherit the pulsing
2. Use `bg-gray-200 rounded` for text-line placeholders
3. Use `bg-gray-200 rounded-xl` for image/large area placeholders
4. Match approximate widths: `w-1/4` for badges, `w-3/4` for titles, `w-full` for body text, `w-1/2` for meta
5. Match heights: `h-4` for small text, `h-5` for medium text, `h-6`/`h-8` for headings
6. Always render 3 skeleton cards in grids

---

## Empty States

Centered block with large muted icon, heading, and subtext.

```tsx
<div className="text-center py-16">
  <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
  <p className="text-lg font-medium text-gray-500 mb-1">No recipes found</p>
  <p className="text-sm text-gray-400">Try a different category or add a new recipe!</p>
</div>
```

---

## Not-Found States

Simpler centered block for missing resources.

```tsx
<div className="text-center py-16">
  <h2 className="text-xl font-medium text-gray-500">Recipe not found</h2>
  <Link to="/" className="text-amber-600 hover:text-amber-700 mt-2 inline-block">
    Back to recipes
  </Link>
</div>
```

---

## Filter Bar

Horizontal scrollable category filter. `pb-2` prevents scrollbar overlap.

```tsx
<div className="flex gap-2 mb-8 overflow-x-auto pb-2">
  {['All', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack'].map((cat) => (
    <button
      key={cat}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        isActive ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {cat}
    </button>
  ))}
</div>
```

---

## Dynamic List Fields

Pattern for adding/removing items in forms (ingredients, instructions).

```tsx
<div className="space-y-2">
  {items.map((item, index) => (
    <div key={index} className="flex gap-2">
      <input className={inputClass} value={item} onChange={...} />
      {items.length > 1 && (
        <button type="button" onClick={() => remove(index)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  ))}
</div>
<button type="button" onClick={add} className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
  <Plus className="w-4 h-4" />
  Add ingredient
</button>
```

For instructions, add a step number before the input:

```tsx
<span className="text-sm text-gray-400 pt-2 w-6 shrink-0">{index + 1}.</span>
```

---

## Toast Notifications

Using `sonner` with `<Toaster position="bottom-right" richColors />` in App.tsx.

Toasts are triggered at the page level inside mutation `onSuccess`:

```tsx
toast.success('Recipe created successfully!')
toast.success('Recipe updated successfully!')
toast.success('Recipe deleted successfully!')
```

---

## Icon Usage

Library: `lucide-react`

| Icon | Import | Used In |
|------|--------|---------|
| `UtensilsCrossed` | Header logo, empty state | Brand identity |
| `Plus` | Header CTA, add buttons | Creation actions |
| `Clock` | Card meta, detail meta | Time display |
| `Users` | Card meta, detail meta | Servings display |
| `ArrowLeft` | Detail page back link | Navigation |
| `Pencil` | Detail page edit button | Edit action |
| `Trash2` | Detail page delete button | Destructive action |
| `X` | Form remove item buttons | Removal action |

### Icon Sizes

| Context | Size Class |
|---------|-----------|
| Inline (buttons, meta) | `w-4 h-4` |
| Header brand | `w-6 h-6` |
| Empty state illustration | `w-16 h-16` |
