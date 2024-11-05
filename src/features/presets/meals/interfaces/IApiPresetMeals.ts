import type { IApiMeal } from "@/features/meals/interfaces/IApiMeal"
import type { IApiUser } from "@/features/users/interfaces/IUser"

export interface IApiPresetMeal {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  type: 'MEAL'
  created_by: IApiUser
  days: IApiPresetMealDay[]
}

export interface IApiPresetMealDay {
  id: number
  day_of_week: number
  created_at: string
  updated_at: string
  meals: IApiPresetDayMeal[]
}

export interface IApiPresetDayMeal {
  id: number
  order: number
  meal: IApiMeal
}
