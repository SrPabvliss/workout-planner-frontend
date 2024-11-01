import type {
  IApiCategory,
  ICategory,
} from '@/features/categories/interfaces/ICategory'
import type {
  IApiExerciseImage,
  IExerciseImage,
  IExerciseImageUpload,
} from './IExerciseImage'

export interface IApiExercise {
  id: number
  name: string
  description: string
  youtube_url: string | null
  normalized_name: string
  created_by: number
  created_at: string
  updated_at: string
  images: IApiExerciseImage[]
  categories: IApiCategory[]
}

export interface IExercise {
  id: number
  name: string
  description: string
  youtubeUrl: string | null
  normalizedName: string
  createdBy: number
  createdAt: string
  updatedAt: string
  images: IExerciseImage[]
  categories: ICategory[]
}

export interface ICreateExerciseData {
  name: string
  description: string
  youtubeUrl?: string | null
  categories: number[]
  images?: IExerciseImageUpload[]
}

export interface IUpdateExerciseData extends Partial<ICreateExerciseData> {
  removedImages?: number[]
}
