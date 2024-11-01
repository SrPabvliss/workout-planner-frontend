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

export interface IExerciseImageUpload {
  file: File
  isMain: boolean
}

export interface ISetMainImage {
  exerciseId: number
  imageId: number
}

export interface ImagePreviewInfo {
  url: string
  isPending: boolean
  isMain?: boolean
  id?: number
}

