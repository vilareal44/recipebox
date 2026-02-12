import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { DATABASE_CONNECTION } from '../database/database.module';
import { recipes, Recipe } from '../database/schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: BetterSQLite3Database<typeof import('../database/schema')>,
  ) {}

  async findAll(category?: string) {
    const query = category
      ? this.db.select().from(recipes).where(eq(recipes.category, category))
      : this.db.select().from(recipes);
    const results = await query;
    return results.map((r) => this.deserializeRecipe(r));
  }

  async findOne(id: number) {
    const result = await this.db
      .select()
      .from(recipes)
      .where(eq(recipes.id, id));
    if (result.length === 0) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return this.deserializeRecipe(result[0]);
  }

  async create(dto: CreateRecipeDto) {
    const serialized = this.serializeRecipe(dto);
    const result = await this.db
      .insert(recipes)
      .values(serialized)
      .returning();
    return this.deserializeRecipe(result[0]);
  }

  async update(id: number, dto: UpdateRecipeDto) {
    const existing = await this.db
      .select()
      .from(recipes)
      .where(eq(recipes.id, id));
    if (existing.length === 0) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.prepTime !== undefined) updateData.prepTime = dto.prepTime;
    if (dto.cookTime !== undefined) updateData.cookTime = dto.cookTime;
    if (dto.servings !== undefined) updateData.servings = dto.servings;
    if (dto.ingredients !== undefined)
      updateData.ingredients = JSON.stringify(dto.ingredients);
    if (dto.instructions !== undefined)
      updateData.instructions = JSON.stringify(dto.instructions);
    if (dto.imageUrl !== undefined) updateData.imageUrl = dto.imageUrl || null;

    const result = await this.db
      .update(recipes)
      .set(updateData)
      .where(eq(recipes.id, id))
      .returning();
    return this.deserializeRecipe(result[0]);
  }

  async remove(id: number) {
    const existing = await this.db
      .select()
      .from(recipes)
      .where(eq(recipes.id, id));
    if (existing.length === 0) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    await this.db.delete(recipes).where(eq(recipes.id, id));
    return { success: true };
  }

  private serializeRecipe(dto: CreateRecipeDto) {
    return {
      ...dto,
      ingredients: JSON.stringify(dto.ingredients),
      instructions: JSON.stringify(dto.instructions),
      imageUrl: dto.imageUrl || null,
    };
  }

  private deserializeRecipe(recipe: Recipe) {
    return {
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients as string) as string[],
      instructions: JSON.parse(recipe.instructions as string) as string[],
    };
  }
}
