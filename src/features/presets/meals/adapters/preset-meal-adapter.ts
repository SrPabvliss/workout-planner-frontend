import { toSnakeCase } from '@/lib/case-converter'
import { MealAdapter } from '@/features/meals/adapters/meal-adapter'
import { UserAdapter } from '@/features/users/adpaters/user-adapter'
import type {
  IApiPresetDayMeal,
  IApiPresetMeal,
  IApiPresetMealDay,
} from '../interfaces/IApiPresetMeals'
import type {
  ICreatePresetDayMeal,
  ICreatePresetMeal,
  IPresetDayMeal,
  IPresetMeal,
  IPresetMealDay,
  IUpdatePresetMeal,
} from '../interfaces/IPresetMeals'

export class PresetMealAdapter {
  static mapToPresetMeal(apiPreset: IApiPresetMeal): IPresetMeal {
    return {
      id: apiPreset.id,
      name: apiPreset.name,
      description: apiPreset.description,
      createdAt: new Date(apiPreset.created_at),
      updatedAt: new Date(apiPreset.updated_at),
      type: apiPreset.type,
      createdBy: UserAdapter.mapToUser(apiPreset.created_by),
      days: apiPreset.days.map(day => this.mapToPresetDay(day)),
    }
  }

  static mapToPresetDay(apiDay: IApiPresetMealDay): IPresetMealDay {
    return {
      id: apiDay.id,
      dayOfWeek: apiDay.day_of_week,
      createdAt: new Date(apiDay.created_at),
      updatedAt: new Date(apiDay.updated_at),
      meals: apiDay.meals.map(meal => this.mapToPresetDayMeal(meal)),
    }
  }

  static mapToPresetDayMeal(apiMeal: IApiPresetDayMeal): IPresetDayMeal {
    return {
      id: apiMeal.id,
      order: apiMeal.order,
      meal: MealAdapter.mapToMeal(apiMeal.meal),
    }
  }

  static mapManyToPresetMeal(apiPresets: IApiPresetMeal[]): IPresetMeal[] {
    return apiPresets.map(preset => this.mapToPresetMeal(preset))
  }

  static mapToApiPresetMeal(
    preset: ICreatePresetMeal | IUpdatePresetMeal,
  ): Partial<IApiPresetMeal> {
    if (!preset) return {}

    const mappedPreset = {
      name: preset.name,
      description: preset.description,
      days: preset.days?.map(day => ({
        day_of_week: day.dayOfWeek,
        meals: day.meals?.map(meal => ({
          meal_id: (meal as ICreatePresetDayMeal).mealId,
          order: meal.order,
        })),
      })),
    }

    return toSnakeCase(mappedPreset) as Partial<IApiPresetMeal>
  }

  static mapToApiPresetMealUpdate(
    preset: Partial<IPresetMeal>,
  ): Partial<IApiPresetMeal> {
    if (!preset) return {}

    const mappedPreset = {
      name: preset.name,
      description: preset.description,
      days: preset.days?.map(day => ({
        day_of_week: day.dayOfWeek,
        meals: day.meals?.map(meal => ({
          meal_id: meal.meal.id,
          order: meal.order,
        })),
      })),
    }

    return toSnakeCase(mappedPreset) as Partial<IApiPresetMeal>
  }
}
