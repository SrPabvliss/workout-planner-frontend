import type { IExercise } from '@/features/exercises/interfaces/IExercise'

export interface LocalPresetDay {
  dayOfWeek: number
  exercises: LocalPresetDayExercise[]
}

export interface LocalPresetDayExercise {
  exerciseId: number
  sets: number
  reps: number
  order: number
  exercise?: IExercise
}


