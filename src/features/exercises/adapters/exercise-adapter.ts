import { CategoryAdapter } from '@/features/categories/adapters/category-adapter'
import type {
  IApiExercise,
  ICreateExerciseData,
  IExercise,
  IUpdateExerciseData,
} from '../interfaces/IExercise'
import { ExerciseImageAdapter } from './exercise-image-adapter'

export class ExerciseAdapter {
  static mapToExercise(apiExercise: IApiExercise): IExercise {
    return {
      id: apiExercise.id,
      name: apiExercise.name,
      description: apiExercise.description,
      youtubeUrl: apiExercise.youtube_url,
      normalizedName: apiExercise.normalized_name,
      createdBy: apiExercise.created_by,
      createdAt: apiExercise.created_at,
      updatedAt: apiExercise.updated_at,
      images: ExerciseImageAdapter.mapManyToExerciseImage(apiExercise.images),
      categories: CategoryAdapter.mapManyToCategory(apiExercise.categories),
    }
  }

  static mapManyToExercise(apiExercises: IApiExercise[]): IExercise[] {
    return apiExercises.map(exercise => ExerciseAdapter.mapToExercise(exercise))
  }

  static createFormData(data: ICreateExerciseData): FormData {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    if (data.youtubeUrl) {
      formData.append('youtube_url', data.youtubeUrl)
    }
    formData.append('categories', JSON.stringify(data.categories))

    const mainImageIndexes: number[] = []
    data.images?.forEach((image, index) => {
      formData.append('images', image.file)
      if (image.isMain) {
        mainImageIndexes.push(index)
      }
    })

    if (mainImageIndexes.length > 0) {
      formData.append('mainImageIndexes', JSON.stringify(mainImageIndexes))
    }

    return formData
  }

  static updateFormData(data: IUpdateExerciseData): FormData {
    const formData = new FormData()

    if (data.name) formData.append('name', data.name)
    if (data.description) formData.append('description', data.description)
    if (data.youtubeUrl !== undefined) {
      formData.append('youtube_url', data.youtubeUrl || '')
    }
    if (data.categories) {
      formData.append('categories', JSON.stringify(data.categories))
    }

    if (data.images && data.images.length > 0) {
      const mainImageIndexes: number[] = []
      data.images.forEach((image, index) => {
        formData.append('images', image.file)
        if (image.isMain) {
          mainImageIndexes.push(index)
        }
      })

      if (mainImageIndexes.length > 0) {
        formData.append('mainImageIndexes', JSON.stringify(mainImageIndexes))
      }
    }

    if (data.removedImages && data.removedImages.length > 0) {
      formData.append('removedImages', JSON.stringify(data.removedImages))
    }

    return formData
  }
}
