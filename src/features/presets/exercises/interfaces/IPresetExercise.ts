import type { IExercise } from '@/features/exercises/interfaces/IExercise'
import type { IUser } from '@/features/users/interfaces/IUser'

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IPresetExercise {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
  type: 'EXERCISE'
  createdBy: IUser
  days: IPresetDay[]
}

export interface IPresetDay {
  id: number
  dayOfWeek: number
  createdAt: Date
  updatedAt: Date
  exercises: IPresetDayExercise[]
}

export interface IPresetDayExercise {
  id: number
  sets: number
  reps: number
  order: number
  exercise: IExercise
}

export interface ICreatePresetExercise {
  name: string
  description: string
  days: ICreatePresetDay[]
}

export interface ICreatePresetDay {
  dayOfWeek: number
  exercises: ICreatePresetDayExercise[]
}

export interface ICreatePresetDayExercise {
  exerciseId: number
  sets: number
  reps: number
  order: number
}

export interface IUpdatePresetExercise extends Partial<ICreatePresetExercise> {}

export interface IUpdatePresetDay extends Partial<ICreatePresetDay> {}

export interface IUpdatePresetDayExercise
  extends Partial<ICreatePresetDayExercise> {}
