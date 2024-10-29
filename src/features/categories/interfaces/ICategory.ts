/* eslint-disable @typescript-eslint/no-empty-object-type */

export enum CategoryType {
  EXERCISE = 'EXERCISE',
  MEAL = 'MEAL',
}

export interface IApiCategory {
  id: number
  name: string
  description?: string
  type: CategoryType
  color?: string | null
  normalized_name?: string | null
  created_at: string
  updated_at: string
}

export interface ICategory {
  id: number
  name: string
  description?: string
  type: CategoryType
  color?: string | null
  normalizedName?: string | null
  createdAt: string
  updatedAt: string
}

export interface ICreateCategory
  extends Omit<
    ICategory,
    'id' | 'createdAt' | 'updatedAt' | 'normalizedName'
  > {}

export interface IUpdateCategory extends Partial<ICreateCategory> {}
