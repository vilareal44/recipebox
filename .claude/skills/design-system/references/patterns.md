# Composition Patterns

## Table of Contents

- [App Shell](#app-shell)
- [Page Container](#page-container)
- [Standard Page Structure](#standard-page-structure)
- [Recipe Grid Layout](#recipe-grid-layout)
- [Two-Column Detail Layout](#two-column-detail-layout)
- [Form Page Layout](#form-page-layout)
- [Form Field Groups](#form-field-groups)
- [Dynamic List Fields](#dynamic-list-fields)
- [Three-Column Grid Row](#three-column-grid-row)
- [Category Filter Bar](#category-filter-bar)
- [Page Header with Actions](#page-header-with-actions)
- [Section Heading](#section-heading)
- [Meta Row (Time/Servings)](#meta-row-timeservings)
- [Ingredients List](#ingredients-list)
- [Instructions List](#instructions-list)
- [Loading Skeletons](#loading-skeletons)
- [Empty States](#empty-states)
- [Not Found States](#not-found-states)
- [Icons](#icons)

---

## App Shell

```tsx
<div className="min-h-screen bg-gray-50">
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      {/* Logo left, primary CTA right */}
    </div>
  </header>
  <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <Outlet />
  </main>
</div>
```

## Page Container

Always use this for page-level content width:
```
max-w-6xl mx-auto px-4 sm:px-6
```

## Standard Page Structure

```tsx
<div>
  <h1 className="text-2xl font-bold text-gray-900 mb-6">Page Title</h1>
  {/* page content */}
</div>
```

## Recipe Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
</div>
```

## Two-Column Detail Layout

Used for side-by-side content sections (ingredients + instructions):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h2>
    {/* list */}
  </div>
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h2>
    {/* list */}
  </div>
</div>
```

## Form Page Layout

```tsx
<div>
  <h1 className="text-2xl font-bold text-gray-900 mb-6">New Recipe</h1>
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
    <RecipeForm onSubmit={handleSubmit} isLoading={isLoading} />
  </div>
</div>
```

## Form Field Groups

Standard field:
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
  <input className={inputClass} value={value} onChange={onChange} />
  {errors.field && <p className="text-red-500 text-xs mt-1">{errors.field[0]}</p>}
</div>
```

Overall form spacing: `<form className="space-y-6">`

## Dynamic List Fields

Pattern for ingredients/instructions with add/remove:
```tsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
  <div className="space-y-2">
    {items.map((item, index) => (
      <div key={index} className="flex gap-2">
        <input className={inputClass} value={item} onChange={...} />
        <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
  <button type="button" onClick={addItem} className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
    <Plus className="w-4 h-4" /> Add ingredient
  </button>
</div>
```

For instructions, add step number prefix: `<span className="text-sm text-gray-400 pt-2 w-6 shrink-0">{index + 1}.</span>`

## Three-Column Grid Row

For related numeric fields (prep time, cook time, servings):
```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {/* 3 field groups */}
</div>
```

## Category Filter Bar

Horizontally scrollable filter chips:
```tsx
<div className="flex gap-2 mb-8 overflow-x-auto pb-2">
  {categories.map(cat => (
    <button
      key={cat.value}
      onClick={() => setActive(cat.value)}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        active === cat.value
          ? 'bg-amber-500 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {cat.label}
    </button>
  ))}
</div>
```

## Page Header with Actions

Title + action buttons side by side:
```tsx
<div className="flex flex-wrap items-start justify-between gap-4 mb-4">
  <div>
    {/* badge + title */}
  </div>
  <div className="flex gap-2">
    {/* Edit + Delete buttons */}
  </div>
</div>
```

## Section Heading

```tsx
<h2 className="text-lg font-semibold text-gray-900 mb-3">Section Title</h2>
```

## Meta Row (Time/Servings)

```tsx
<div className="flex gap-6 mb-8 text-sm text-gray-500">
  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {prepTime} min prep</span>
  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {cookTime} min cook</span>
  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {servings} servings</span>
</div>
```

## Ingredients List

Unordered list with amber bullet dots:
```tsx
<ul className="space-y-2">
  {ingredients.map((item, i) => (
    <li key={i} className="flex items-start gap-2 text-gray-600">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
      {item}
    </li>
  ))}
</ul>
```

## Instructions List

Ordered list with amber numbered circles:
```tsx
<ol className="space-y-3">
  {instructions.map((step, i) => (
    <li key={i} className="flex gap-3 text-gray-600">
      <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
        {i + 1}
      </span>
      <span className="pt-0.5">{step}</span>
    </li>
  ))}
</ol>
```

## Loading Skeletons

Always match the structure of the content being loaded.

**Grid skeleton** (render 3 cards):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[1, 2, 3].map(i => (
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

**Page skeleton** (stacked blocks):
```tsx
<div className="animate-pulse space-y-6">
  <div className="h-6 bg-gray-200 rounded w-24" />
  <div className="h-8 bg-gray-200 rounded w-1/2" />
  <div className="h-64 bg-gray-200 rounded-xl" />
</div>
```

Skeleton rules:
- Use `animate-pulse` on the wrapper
- Use `bg-gray-200 rounded` for bar placeholders
- Use `rounded-xl` for large image/card placeholders
- Vary widths: `w-1/4`, `w-1/2`, `w-3/4`, `w-full`
- Use `space-y-3` or `space-y-6` for spacing

## Empty States

Center-aligned with large muted icon:
```tsx
<div className="text-center py-16">
  <IconComponent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
  <h3 className="text-lg font-medium text-gray-500 mb-1">No items found</h3>
  <p className="text-sm text-gray-400">Helpful suggestion text here.</p>
</div>
```

## Not Found States

```tsx
<div className="text-center py-16">
  <h2 className="text-xl font-medium text-gray-500">Item not found</h2>
  <Link to="/" className="text-amber-600 hover:text-amber-700 mt-2 inline-block">
    Back to home
  </Link>
</div>
```

## Icons

Library: `lucide-react` (exclusively).

| Size | Class | Context |
|---|---|---|
| Standard | `w-4 h-4` | Buttons, inline, meta |
| Navigation | `w-6 h-6` | Header logo icon |
| Empty state | `w-16 h-16` | Large decorative icon |

Commonly used icons: `UtensilsCrossed`, `Plus`, `ArrowLeft`, `Pencil`, `Trash2`, `Clock`, `Users`, `X`
