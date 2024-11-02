import type { IApiCategory } from "@/features/categories/interfaces/ICategory"
import type { IApiIngredient } from "@/features/ingredients/interfaces/IIngredient"

export interface IApiMeal {
  id: number
  name: string
  description: string
  preparation: string
  created_at: Date
  updated_at: Date
  meal_ingredients: IApiMealIngredient[]
  meal_categories: IApiMealCategory[]
  nutritional_info: IApiMealNutritionalInfo
}

export interface IApiMealCategory {
  meal_id: number
  category_id: number
  category: IApiCategory
}

export interface IApiMealIngredient {
  id: number
  quantity: string
  created_at: Date
  updated_at: Date
  ingredient: IApiIngredient
  unit: IApiUnit
}

export interface IApiUnit {
  id: number
  name: string
  symbol: string
  type: string
  is_active: boolean
}

export interface IApiMealNutritionalInfo {
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  fiber?: number
  sugar?: number
  sodium?: number
}
