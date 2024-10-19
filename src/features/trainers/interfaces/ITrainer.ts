/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { IUser } from '@/features/users/interfaces/IUser'

export interface ITrainer {
  id: number
  specialization: string
  years_of_experience: number
  user: IUser
}

export interface ICreateTrainer extends Omit<ITrainer, 'id'> {}

export interface IUpdateTrainer extends Partial<ICreateTrainer> {}