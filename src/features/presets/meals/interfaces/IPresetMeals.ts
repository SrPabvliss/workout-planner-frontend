import type { IMeal } from "@/features/meals/interfaces/IMeal"
import type { IUser } from "@/features/users/interfaces/IUser"

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IPresetMeal {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  type: 'MEAL'
  createdBy: IUser
  days: IPresetMealDay[]
}

export interface IPresetMealDay {
  id: number
  dayOfWeek: number
  createdAt: Date
  updatedAt: Date
  meals: IPresetDayMeal[]
}

export interface IPresetDayMeal {
  id: number
  order: number
  meal: IMeal
}

export interface ICreatePresetMeal {
  name: string
  description: string
  days: ICreatePresetMealDay[]
}

export interface ICreatePresetMealDay {
  dayOfWeek: number
  meals: ICreatePresetDayMeal[]
}

export interface ICreatePresetDayMeal {
  mealId: number
  order: number
}

export interface IUpdatePresetMeal extends Partial<ICreatePresetMeal> {}

export interface IUpdatePresetMealDay extends Partial<ICreatePresetMealDay> {}

export interface IUpdatePresetDayMeal extends Partial<ICreatePresetDayMeal> {}
