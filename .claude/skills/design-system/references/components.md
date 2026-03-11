# Component Reference

No component library (no shadcn/ui, no Radix, no cva). All elements are native HTML with Tailwind classes.

## Table of Contents

- [Primary Button](#primary-button)
- [Secondary/Outline Button](#secondaryoutline-button)
- [Destructive Button](#destructive-button)
- [Inline Text Button](#inline-text-button)
- [Filter Chip Button](#filter-chip-button)
- [Form Input](#form-input)
- [Textarea](#textarea)
- [Select](#select)
- [Form Label](#form-label)
- [Validation Error](#validation-error)
- [Content Card](#content-card)
- [Recipe Card](#recipe-card)
- [Category Badge](#category-badge)
- [Back Navigation Link](#back-navigation-link)
- [Skeleton Loader](#skeleton-loader)
- [Empty State](#empty-state)
- [Toast Notifications](#toast-notifications)

---

## Primary Button

Used for: submit actions, nav CTA ("New Recipe").

```tsx
<button
  className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  Create Recipe
</button>
```

Nav variant (with icon):
```tsx
<Link
  to="/recipes/new"
  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
>
  <Plus className="w-4 h-4" />
  New Recipe
</Link>
```

Submit variant: adds `w-full sm:w-auto` and `disabled:opacity-50 disabled:cursor-not-allowed`.

## Secondary/Outline Button

Used for: Edit action on detail page.

```tsx
<Link
  to={`/recipes/${id}/edit`}
  className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
>
  <Pencil className="w-4 h-4" />
  Edit
</Link>
```

## Destructive Button

Used for: Delete action on detail page.

```tsx
<button
  onClick={handleDelete}
  className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
>
  <Trash2 className="w-4 h-4" />
  Delete
</button>
```

## Inline Text Button

Used for: "Add ingredient", "Add step" links in forms.

```tsx
<button
  type="button"
  onClick={addItem}
  className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
>
  <Plus className="w-4 h-4" />
  Add ingredient
</button>
```

## Filter Chip Button

Used for: Category filter bar on home page. Two states.

Active:
```tsx
<button className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-amber-500 text-white">
  Breakfast
</button>
```

Inactive:
```tsx
<button className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-white text-gray-600 hover:bg-gray-100 border border-gray-200">
  Lunch
</button>
```

## Form Input

Shared class constant (defined once, used for all inputs):

```tsx
const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent";

<input type="text" className={inputClass} />
```

Numeric input: same class, `type="number"` with `min="0"`.

## Textarea

Same shared input class:

```tsx
<textarea className={inputClass} rows={3} />
```

## Select

Same shared input class:

```tsx
<select className={inputClass}>
  <option value="">Select a category</option>
  <option value="breakfast">Breakfast</option>
  ...
</select>
```

## Form Label

```tsx
<label className="block text-sm font-medium text-gray-700 mb-1">
  Title
</label>
```

For list fields (ingredients, instructions): use `mb-2` instead of `mb-1`.

## Validation Error

```tsx
{errors.title && (
  <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>
)}
```

## Content Card

The standard white card wrapper used on detail and form pages:

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  {/* content */}
</div>
```

With padding (form pages):
```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
  {/* form content */}
</div>
```

## Recipe Card

Full implementation (`recipe-card.tsx`):

```tsx
<Link to={`/recipes/${recipe.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
  {recipe.imageUrl ? (
    <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
  ) : (
    <div className={`w-full h-48 ${categoryPlaceholders[recipe.category]} flex items-center justify-center`}>
      <span className="text-4xl opacity-50">{emoji}</span>
    </div>
  )}
  <div className="p-6">
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[recipe.category]}`}>
      {recipe.category}
    </span>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{recipe.title}</h3>
    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{recipe.description}</p>
    <div className="flex items-center gap-4 text-sm text-gray-400">
      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {totalTime} min</span>
      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {recipe.servings}</span>
    </div>
  </div>
</Link>
```

## Category Badge

```tsx
const categoryColors: Record<string, string> = {
  breakfast: 'bg-amber-100 text-amber-800',
  lunch: 'bg-green-100 text-green-800',
  dinner: 'bg-blue-100 text-blue-800',
  dessert: 'bg-pink-100 text-pink-800',
  snack: 'bg-orange-100 text-orange-800',
};

<span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[category]}`}>
  {category}
</span>
```

## Back Navigation Link

```tsx
<Link to="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
  <ArrowLeft className="w-4 h-4" />
  Back to recipes
</Link>
```

## Skeleton Loader

Card skeleton (used in grid):
```tsx
<div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
  <div className="w-full h-48 bg-gray-200" />
  <div className="p-6 space-y-3">
    <div className="h-4 bg-gray-200 rounded w-1/4" />
    <div className="h-5 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
</div>
```

Page skeleton (detail page):
```tsx
<div className="animate-pulse space-y-6">
  <div className="h-6 bg-gray-200 rounded w-24" />
  <div className="h-8 bg-gray-200 rounded w-1/2" />
  <div className="h-64 bg-gray-200 rounded-xl" />
</div>
```

## Empty State

```tsx
<div className="text-center py-16">
  <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
  <h3 className="text-lg font-medium text-gray-500 mb-1">No recipes found</h3>
  <p className="text-sm text-gray-400">Try a different category or add a new recipe.</p>
</div>
```

## Toast Notifications

Using `sonner` library. Mounted in `App.tsx`:
```tsx
<Toaster position="bottom-right" richColors />
```

Usage:
```tsx
import { toast } from 'sonner';
toast.success('Recipe created!');
toast.error('Failed to delete recipe');
```
