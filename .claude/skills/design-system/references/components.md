# Component Reference

## Table of Contents
- [Layout Shell](#layout-shell)
- [Primary Button](#primary-button)
- [Submit Button](#submit-button)
- [Secondary Button](#secondary-button)
- [Destructive Button](#destructive-button)
- [Ghost Link Button](#ghost-link-button)
- [Icon-Only Remove Button](#icon-only-remove-button)
- [Input / Textarea / Select](#input--textarea--select)
- [Form Label](#form-label)
- [Form Error](#form-error)
- [Category Badge](#category-badge)
- [Filter Tabs](#filter-tabs)
- [Recipe Card](#recipe-card)
- [Content Card Shell](#content-card-shell)
- [Back Link](#back-link)
- [Ingredient List](#ingredient-list)
- [Instruction List](#instruction-list)
- [Meta Row](#meta-row)

---

## Layout Shell

The app shell wrapping all pages. Source: `components/layout.tsx`

```tsx
<div className="min-h-screen bg-gray-50">
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-amber-600 transition-colors">
        <UtensilsCrossed className="w-6 h-6 text-amber-600" />
        <span className="text-xl font-bold">RecipeBox</span>
      </Link>
      <Link to="/recipes/new" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
        <Plus className="w-4 h-4" />
        New Recipe
      </Link>
    </div>
  </header>
  <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <Outlet />
  </main>
</div>
```

---

## Primary Button

CTA button for main actions (header "New Recipe").

```tsx
<Link className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
  <Plus className="w-4 h-4" />
  New Recipe
</Link>
```

---

## Submit Button

Form submission button. Full-width on mobile, auto on sm+.

```tsx
<button
  type="submit"
  disabled={isLoading}
  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
>
  {isLoading ? 'Saving...' : initialData ? 'Update Recipe' : 'Create Recipe'}
</button>
```

---

## Secondary Button

Used for non-primary actions (Edit button on detail page).

```tsx
<Link className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
  <Pencil className="w-4 h-4" />
  Edit
</Link>
```

---

## Destructive Button

Used for delete actions.

```tsx
<button className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
  <Trash2 className="w-4 h-4" />
  Delete
</button>
```

---

## Ghost Link Button

Text-only action links (e.g., "Add ingredient", "Add step").

```tsx
<button
  type="button"
  className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
>
  <Plus className="w-4 h-4" />
  Add ingredient
</button>
```

---

## Icon-Only Remove Button

Used to remove items from dynamic lists. Only shown when list has >1 item.

```tsx
<button
  type="button"
  onClick={() => removeItem(index)}
  className="p-2 text-red-400 hover:text-red-600 transition-colors"
>
  <X className="w-4 h-4" />
</button>
```

---

## Input / Textarea / Select

All form inputs share a single class string. Source: `recipe-form.tsx:86-87`

```tsx
const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent';

<input type="text" className={inputClass} />
<textarea rows={3} className={inputClass} />
<select className={inputClass}>
  <option value="">Select a category</option>
  <option value="breakfast">Breakfast</option>
  {/* ... */}
</select>
```

---

## Form Label

```tsx
<label className="block text-sm font-medium text-gray-700 mb-1">
  Title
</label>
```

For dynamic list sections (Ingredients, Instructions), use `mb-2` instead of `mb-1`.

---

## Form Error

```tsx
{errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
```

---

## Category Badge

Pill badge with per-category colors. Used on cards and detail page.

```tsx
const categoryColors: Record<string, string> = {
  breakfast: 'bg-amber-100 text-amber-800',
  lunch: 'bg-green-100 text-green-800',
  dinner: 'bg-blue-100 text-blue-800',
  dessert: 'bg-pink-100 text-pink-800',
  snack: 'bg-orange-100 text-orange-800',
};

<span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[recipe.category]}`}>
  {recipe.category}
</span>
```

---

## Filter Tabs

Horizontal scrollable filter bar. Source: `pages/home.tsx`

```tsx
<div className="flex gap-2 mb-8 overflow-x-auto pb-2">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat === 'All' ? undefined : cat)}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
        isActive
          ? 'bg-amber-500 text-white'
          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {cat}
    </button>
  ))}
</div>
```

---

## Recipe Card

Full card component. Source: `components/recipe-card.tsx`

```tsx
<Link to={`/recipes/${recipe.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
  {recipe.imageUrl ? (
    <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
  ) : (
    <div className={`w-full h-48 ${categoryPlaceholders[recipe.category]} flex items-center justify-center`}>
      <span className="text-4xl opacity-50">{categoryEmojis[recipe.category]}</span>
    </div>
  )}
  <div className="p-6">
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[recipe.category]}`}>
        {recipe.category}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{recipe.title}</h3>
    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{recipe.description}</p>
    <div className="flex items-center gap-4 text-sm text-gray-400">
      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{totalTime} min</span>
      <span className="flex items-center gap-1"><Users className="w-4 h-4" />{recipe.servings} servings</span>
    </div>
  </div>
</Link>
```

Category placeholder map:

```tsx
const categoryPlaceholders: Record<string, string> = {
  breakfast: 'bg-amber-200',
  lunch: 'bg-green-200',
  dinner: 'bg-blue-200',
  dessert: 'bg-pink-200',
  snack: 'bg-orange-200',
};
```

---

## Content Card Shell

Wraps form pages and detail view content. Reused identically across pages.

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
  {/* content */}
</div>
```

For detail page (with hero image), use `overflow-hidden` and no padding on the outer shell:

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  <img className="w-full h-72 object-cover" />
  <div className="p-6 sm:p-8">
    {/* content */}
  </div>
</div>
```

---

## Back Link

Navigation link to return to the recipes list.

```tsx
<Link to="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
  <ArrowLeft className="w-4 h-4" />
  Back to recipes
</Link>
```

---

## Ingredient List

Unordered list with amber bullet dots.

```tsx
<h2 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h2>
<ul className="space-y-2">
  {recipe.ingredients.map((ingredient, i) => (
    <li key={i} className="flex items-start gap-2 text-gray-600">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
      {ingredient}
    </li>
  ))}
</ul>
```

---

## Instruction List

Ordered list with amber numbered circles.

```tsx
<h2 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h2>
<ol className="space-y-3">
  {recipe.instructions.map((instruction, i) => (
    <li key={i} className="flex gap-3 text-gray-600">
      <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
        {i + 1}
      </span>
      <span className="pt-0.5">{instruction}</span>
    </li>
  ))}
</ol>
```

---

## Meta Row

Displays prep time, cook time, and servings with icons.

**On cards** (compact):
```tsx
<div className="flex items-center gap-4 text-sm text-gray-400">
  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{totalTime} min</span>
  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{servings} servings</span>
</div>
```

**On detail page** (expanded):
```tsx
<div className="flex gap-6 mb-8 text-sm text-gray-500">
  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Prep: {prepTime}m</span>
  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Cook: {cookTime}m</span>
  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{servings} servings</span>
</div>
```
