/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IApiCategory } from '@/features/categories/interfaces/ICategory'
import type { IIngredient } from '@/features/ingredients/interfaces/IIngredient'

export interface IMeal {
  id: number
  name: string
  description: string
  preparation: string
  createdAt: Date
  updatedAt: Date
  mealIngredients: IMealIngredient[]
  mealCategories: IMealCategory[]
  nutritionalInfo: IMealNutritionalInfo
}

export interface IMealCategory {
  mealId: number
  categoryId: number
  category: IApiCategory
}

export interface IMealIngredient {
  id: number
  quantity: number
  createdAt: Date
  updatedAt: Date
  ingredient: IIngredient
  unit: IUnit
}

export interface IUnit {
  id: number
  name: string
  symbol: string
  type: string
  isActive: boolean
}

export interface IMealNutritionalInfo {
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  fiber?: number
  sugar?: number
  sodium?: number
}

export interface ICreateMeal {
  name: string
  description: string
  preparation: string
  ingredients: {
    ingredientId: number
    unitId: number
    quantity: number
  }[]
  categories: number[]
}

export interface IUpdateMeal extends Partial<ICreateMeal> {}
