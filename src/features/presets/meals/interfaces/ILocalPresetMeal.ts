import type { IMeal } from '@/features/meals/interfaces/IMeal'

export interface LocalPresetMealDay {
  dayOfWeek: number
  meals: LocalPresetDayMeal[]
}

export interface LocalPresetDayMeal {
  mealId: number
  order: number
  meal?: IMeal
}
