/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IApiUser, IUser } from '@/features/users/interfaces/IUser'

export interface IApiTrainer {
  id: number
  specialization: string
  years_of_experience: number
  user: IApiUser
}

export interface ITrainer {
  id: number
  specialization: string
  yearsOfExperience: number
  user: IUser
}

export interface ICreateTrainer extends Omit<ITrainer, 'id'> {}

export interface IUpdateTrainer extends Partial<ICreateTrainer> {}
