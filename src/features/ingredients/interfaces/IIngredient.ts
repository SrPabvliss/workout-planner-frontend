/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IApiNutritionalInfo, INutritionalInfo } from './INutritionalInfo'

export interface IApiIngredient {
  id: number
  name: string
  normalized_name: string
  is_active: boolean
  nutritional_info: IApiNutritionalInfo
  created_at: string
  updated_at: string
}

export interface IIngredient {
  id: number
  name: string
  normalizedName: string
  isActive: boolean
  nutritionalInfo: INutritionalInfo
  createdAt: string
  updatedAt: string
}

export interface ICreateIngredient
  extends Omit<
    IIngredient,
    'id' | 'normalizedName' | 'createdAt' | 'updatedAt'
  > {}

export interface IUpdateIngredient extends Partial<ICreateIngredient> {}
