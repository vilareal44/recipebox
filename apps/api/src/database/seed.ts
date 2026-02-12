import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { recipes } from './schema';

const dataDir = join(process.cwd(), 'data');
mkdirSync(dataDir, { recursive: true });

const sqlite = new Database(join(dataDir, 'recipes.db'));
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: join(process.cwd(), 'drizzle') });

const seedRecipes = [
  {
    title: 'Fluffy Pancakes',
    description: 'Light and fluffy buttermilk pancakes perfect for a lazy weekend morning. Serve with maple syrup and fresh berries.',
    category: 'breakfast',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    ingredients: JSON.stringify([
      '2 cups all-purpose flour',
      '2 tablespoons sugar',
      '1 tablespoon baking powder',
      '1/2 teaspoon salt',
      '2 large eggs',
      '1 1/2 cups buttermilk',
      '1/4 cup melted butter',
      '1 teaspoon vanilla extract',
    ]),
    instructions: JSON.stringify([
      'Whisk together flour, sugar, baking powder, and salt in a large bowl.',
      'In a separate bowl, beat eggs and mix in buttermilk, melted butter, and vanilla.',
      'Pour wet ingredients into dry ingredients and stir until just combined. Do not overmix.',
      'Heat a griddle or non-stick pan over medium heat and lightly grease.',
      'Pour 1/4 cup batter per pancake onto the griddle.',
      'Cook until bubbles form on the surface, then flip and cook until golden brown.',
    ]),
    imageUrl: null,
  },
  {
    title: 'Avocado Toast with Poached Eggs',
    description: 'Creamy avocado on crispy sourdough topped with perfectly poached eggs and a sprinkle of everything bagel seasoning.',
    category: 'breakfast',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    ingredients: JSON.stringify([
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 large eggs',
      '1 tablespoon white vinegar',
      'Everything bagel seasoning',
      'Red pepper flakes',
      'Salt and pepper to taste',
      'Lemon juice',
    ]),
    instructions: JSON.stringify([
      'Toast the sourdough bread until golden and crispy.',
      'Mash the avocado with a fork, add lemon juice, salt, and pepper.',
      'Bring a pot of water to a gentle simmer, add vinegar.',
      'Create a whirlpool in the water and gently drop in each egg. Poach for 3-4 minutes.',
      'Spread mashed avocado on each toast slice.',
      'Top with poached eggs, everything bagel seasoning, and red pepper flakes.',
    ]),
    imageUrl: null,
  },
  {
    title: 'Mediterranean Chicken Wrap',
    description: 'A hearty wrap filled with grilled chicken, hummus, fresh vegetables, and feta cheese. Perfect for a quick and satisfying lunch.',
    category: 'lunch',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    ingredients: JSON.stringify([
      '2 large flour tortillas',
      '2 grilled chicken breasts, sliced',
      '1/2 cup hummus',
      '1 cup mixed greens',
      '1/2 cucumber, sliced',
      '1/2 cup cherry tomatoes, halved',
      '1/4 cup crumbled feta cheese',
      '1/4 cup kalamata olives, sliced',
      'Tzatziki sauce',
    ]),
    instructions: JSON.stringify([
      'Warm the tortillas in a dry pan for 30 seconds each side.',
      'Spread hummus evenly on each tortilla.',
      'Layer mixed greens, sliced chicken, cucumber, tomatoes, feta, and olives.',
      'Drizzle with tzatziki sauce.',
      'Fold in the sides and roll tightly into a wrap.',
      'Cut in half diagonally and serve.',
    ]),
    imageUrl: null,
  },
  {
    title: 'Garlic Butter Salmon',
    description: 'Pan-seared salmon fillets glazed with garlic butter and fresh herbs. Served with roasted asparagus for an elegant dinner.',
    category: 'dinner',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    ingredients: JSON.stringify([
      '4 salmon fillets (6 oz each)',
      '4 tablespoons butter',
      '4 cloves garlic, minced',
      '1 bunch asparagus, trimmed',
      '2 tablespoons olive oil',
      '1 lemon, sliced',
      'Fresh dill and parsley',
      'Salt and pepper to taste',
    ]),
    instructions: JSON.stringify([
      'Preheat oven to 400°F (200°C). Season salmon with salt and pepper.',
      'Toss asparagus with olive oil, salt, and pepper on a baking sheet. Roast for 10 minutes.',
      'Heat a large oven-safe skillet over medium-high heat. Sear salmon skin-side up for 3 minutes.',
      'Flip salmon, add butter and garlic to the pan. Baste salmon with melted garlic butter.',
      'Transfer skillet to oven and bake for 6-8 minutes until salmon is cooked through.',
      'Serve salmon over asparagus, garnished with fresh herbs and lemon slices.',
    ]),
    imageUrl: null,
  },
  {
    title: 'Chocolate Lava Cake',
    description: 'Rich, decadent chocolate cakes with a molten center. An impressive dessert that is surprisingly easy to make.',
    category: 'dessert',
    prepTime: 15,
    cookTime: 14,
    servings: 4,
    ingredients: JSON.stringify([
      '6 oz dark chocolate (70% cocoa)',
      '1/2 cup unsalted butter',
      '2 large eggs',
      '2 egg yolks',
      '1/4 cup sugar',
      '2 tablespoons all-purpose flour',
      'Pinch of salt',
      'Powdered sugar for dusting',
      'Vanilla ice cream for serving',
    ]),
    instructions: JSON.stringify([
      'Preheat oven to 425°F (220°C). Butter and flour four 6-oz ramekins.',
      'Melt chocolate and butter together in a double boiler or microwave, stirring until smooth.',
      'Whisk eggs, egg yolks, and sugar until thick and pale yellow.',
      'Fold the chocolate mixture into the egg mixture. Add flour and salt, fold gently.',
      'Divide batter evenly among ramekins. Place on a baking sheet.',
      'Bake for 12-14 minutes until edges are firm but center is soft.',
      'Let cool for 1 minute, then invert onto plates. Dust with powdered sugar and serve with ice cream.',
    ]),
    imageUrl: null,
  },
  {
    title: 'Spicy Roasted Chickpeas',
    description: 'Crunchy, protein-packed chickpeas roasted with smoky spices. A healthy and addictive snack ready in under 30 minutes.',
    category: 'snack',
    prepTime: 5,
    cookTime: 25,
    servings: 4,
    ingredients: JSON.stringify([
      '2 cans (15 oz each) chickpeas, drained and rinsed',
      '2 tablespoons olive oil',
      '1 teaspoon smoked paprika',
      '1/2 teaspoon cumin',
      '1/2 teaspoon garlic powder',
      '1/4 teaspoon cayenne pepper',
      '1/2 teaspoon salt',
      'Squeeze of fresh lime juice',
    ]),
    instructions: JSON.stringify([
      'Preheat oven to 400°F (200°C). Pat chickpeas very dry with paper towels.',
      'Toss chickpeas with olive oil on a rimmed baking sheet.',
      'Spread in a single layer and roast for 20 minutes, shaking pan halfway through.',
      'Mix smoked paprika, cumin, garlic powder, cayenne, and salt in a small bowl.',
      'Remove chickpeas from oven, toss with spice mixture and lime juice.',
      'Return to oven for 5 more minutes until extra crispy. Let cool before serving.',
    ]),
    imageUrl: null,
  },
];

db.insert(recipes).values(seedRecipes).run();
console.log('Seeded 6 recipes successfully!');
sqlite.close();
