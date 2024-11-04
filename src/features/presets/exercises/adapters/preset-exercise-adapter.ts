import { toSnakeCase } from '@/lib/case-converter'
import { ExerciseAdapter } from '@/features/exercises/adapters/exercise-adapter'
import type {
  IPresetExercise,
  IPresetDay,
  IPresetDayExercise,
  ICreatePresetExercise,
  ICreatePresetDayExercise,
  IUpdatePresetExercise,
} from '../interfaces/IPresetExercise'
import type {
  IApiPresetDay,
  IApiPresetDayExercise,
  IApiPresetExercise,
} from '../interfaces/IApiPresetExercise'
import { UserAdapter } from '@/features/users/adpaters/user-adapter'

export class PresetExerciseAdapter {
  static mapToPresetExercise(apiPreset: IApiPresetExercise): IPresetExercise {
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

  static mapToPresetDay(apiDay: IApiPresetDay): IPresetDay {
    return {
      id: apiDay.id,
      dayOfWeek: apiDay.day_of_week,
      createdAt: new Date(apiDay.created_at),
      updatedAt: new Date(apiDay.updated_at),
      exercises: apiDay.exercises.map(exercise =>
        this.mapToPresetDayExercise(exercise),
      ),
    }
  }

  static mapToPresetDayExercise(
    apiExercise: IApiPresetDayExercise,
  ): IPresetDayExercise {
    return {
      id: apiExercise.id,
      sets: apiExercise.sets,
      reps: apiExercise.reps,
      order: apiExercise.order,
      exercise: ExerciseAdapter.mapToExercise(apiExercise.exercise),
    }
  }

  static mapManyToPresetExercise(
    apiPresets: IApiPresetExercise[],
  ): IPresetExercise[] {
    return apiPresets.map(preset => this.mapToPresetExercise(preset))
  }

  static mapToApiPresetExercise(
    preset: ICreatePresetExercise | IUpdatePresetExercise,
  ): Partial<IApiPresetExercise> {
    if (!preset) return {}

    const mappedPreset = {
      name: preset.name,
      description: preset.description,
      days: preset.days?.map(day => ({
        day_of_week: day.dayOfWeek,
        exercises: day.exercises?.map(exercise => ({
          exercise_id: (exercise as ICreatePresetDayExercise).exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          order: exercise.order,
        })),
      })),
    }

    return toSnakeCase(mappedPreset) as Partial<IApiPresetExercise>
  }

  static mapToApiPresetExerciseUpdate(
    preset: Partial<IPresetExercise>,
  ): Partial<IApiPresetExercise> {
    if (!preset) return {}

    const mappedPreset = {
      name: preset.name,
      description: preset.description,
      days: preset.days?.map(day => ({
        day_of_week: day.dayOfWeek,
        exercises: day.exercises?.map(exercise => ({
          exercise_id: exercise.exercise.id,
          sets: exercise.sets,
          reps: exercise.reps,
          order: exercise.order,
        })),
      })),
    }

    return toSnakeCase(mappedPreset) as Partial<IApiPresetExercise>
  }
}
