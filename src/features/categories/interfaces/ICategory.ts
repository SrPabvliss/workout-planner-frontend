/* eslint-disable @typescript-eslint/no-empty-object-type */

// Enumeración para los tipos de categoría
export enum CategoryType {
  EXERCISE = 'EXERCISE',
  MEAL = 'MEAL',
}

export interface IApiCategory {
  id: number
  name: string
  description?: string
  type: CategoryType
  created_at: string
  updated_at: string
}

export interface ICategory {
  id: number
  name: string
  description?: string
  type: CategoryType
  createdAt: string
  updatedAt: string
}

export interface ICreateCategory
  extends Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateCategory extends Partial<ICreateCategory> {}
