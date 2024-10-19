/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ITrainer } from '@/features/trainers/interfaces/ITrainer'
import type { IUser } from '@/features/users/interfaces/IUser'

export interface IStudent {
  id: number
  height: number
  weight: number
  trained_before: boolean
  medical_conditions: string
  user: IUser
  trainer: ITrainer
}

export interface ICreateStudent extends Omit<IStudent, 'id'> {}

export interface IUpdateStudent extends Partial<ICreateStudent> {}
