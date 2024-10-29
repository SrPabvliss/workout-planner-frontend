/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface IApiExerciseImage {
  id: number
  url: string
  public_id: string
  is_main: boolean
  created_at: string
}

export interface IExerciseImage {
  id: number
  url: string
  publicId: string
  isMain: boolean
  createdAt: string
}

export interface ICreateExerciseImage extends Omit<IExerciseImage, 'id' | 'createdAt'> {}

export interface IUpdateExerciseImage extends ICreateExerciseImage {
  id?: number
}

export interface ISetMainImage {
  exerciseId: number
  imageId: number
}
