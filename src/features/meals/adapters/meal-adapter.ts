import { toSnakeCase } from '@/lib/case-converter'
import type {
  IApiMeal,
  IApiMealCategory,
  IApiMealIngredient,
  IApiUnit,
} from '../interfaces/IApiMeal'
import type {
  ICreateMeal,
  IMeal,
  IMealCategory,
  IMealIngredient,
  IUnit,
  IUpdateMeal,
} from '../interfaces/IMeal'
import { IngredientAdapter } from '@/features/ingredients/adapters/ingredient-adapter'

export class MealAdapter {
  static mapToMeal(apiMeal: IApiMeal): IMeal {
    return {
      id: apiMeal.id,
      name: apiMeal.name,
      description: apiMeal.description,
      preparation: apiMeal.preparation,
      createdAt: apiMeal.created_at,
      updatedAt: apiMeal.updated_at,
      mealIngredients: apiMeal.meal_ingredients.map(ingredient =>
        this.mapToMealIngredient(ingredient),
      ),
      mealCategories: apiMeal.meal_categories.map(category =>
        this.mapToMealCategory(category),
      ),
      nutritionalInfo: {
        calories: apiMeal.nutritional_info.calories,
        protein: apiMeal.nutritional_info.protein,
        carbs: apiMeal.nutritional_info.carbs,
        fat: apiMeal.nutritional_info.fat,
        fiber: apiMeal.nutritional_info.fiber,
        sugar: apiMeal.nutritional_info.sugar,
        sodium: apiMeal.nutritional_info.sodium,
      },
    }
  }

  static mapToMealIngredient(
    apiMealIngredient: IApiMealIngredient,
  ): IMealIngredient {
    return {
      id: apiMealIngredient.id,
      quantity: Number(apiMealIngredient.quantity),
      createdAt: apiMealIngredient.created_at,
      updatedAt: apiMealIngredient.updated_at,
      ingredient: IngredientAdapter.mapToIngredient(
        apiMealIngredient.ingredient,
      ),
      unit: this.mapToUnit(apiMealIngredient.unit),
    }
  }

  static mapToMealCategory(apiMealCategory: IApiMealCategory): IMealCategory {
    return {
      mealId: apiMealCategory.meal_id,
      categoryId: apiMealCategory.category_id,
      category: apiMealCategory.category,
    }
  }

  static mapToUnit(apiUnit: IApiUnit): IUnit {
    return {
      id: apiUnit.id,
      name: apiUnit.name,
      symbol: apiUnit.symbol,
      type: apiUnit.type,
      isActive: apiUnit.is_active,
    }
  }

  static mapManyToUnit(apiUnits: IApiUnit[]): IUnit[] {
    return apiUnits.map(unit => this.mapToUnit(unit))
  }

  static mapManyToMeal(apiMeals: IApiMeal[]): IMeal[] {
    return apiMeals.map(meal => this.mapToMeal(meal))
  }

  static mapToApiMeal(
    meal: Partial<IMeal> | ICreateMeal | IUpdateMeal,
  ): Partial<IApiMeal> {
    return toSnakeCase(meal) as Partial<IApiMeal>
  }
}
