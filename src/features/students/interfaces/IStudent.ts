/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
  IApiTrainer,
  ITrainer,
} from '@/features/trainers/interfaces/ITrainer'
import type { IApiUser, IUser } from '@/features/users/interfaces/IUser'

export interface IApiStudent {
  id: number
  height: number
  weight: number
  trained_before: boolean
  medical_conditions: string
  user: IApiUser
  trainer: IApiTrainer
}

export interface IStudent {
  id: number
  height: number
  weight: number
  trainedBefore: boolean
  medicalConditions: string
  user: IUser
  trainer: ITrainer
}

export interface ICreateStudent extends Omit<IStudent, 'id'> {}

export interface IUpdateStudent extends Partial<ICreateStudent> {}
