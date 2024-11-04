import type { IApiExercise } from '@/features/exercises/interfaces/IExercise'
import { type IApiUser } from '../../../users/interfaces/IUser'

export interface IApiPresetExercise {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  type: 'EXERCISE'
  created_by: IApiUser
  days: IApiPresetDay[]
}

export interface IApiPresetDay {
  id: number
  day_of_week: number
  created_at: string
  updated_at: string
  exercises: IApiPresetDayExercise[]
}

export interface IApiPresetDayExercise {
  id: number
  sets: number
  reps: number
  order: number
  exercise: IApiExercise
}
