import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import type { IApiExerciseImage, IExerciseImage } from '../interfaces/IExerciseImage'
import { ExerciseImageAdapter } from '../adapters/exercise-image-adapter'

interface ExerciseImageDataSource {
  setMainImage(exerciseId: number, imageId: number): Promise<IExerciseImage>
  removeImage(exerciseId: number, imageId: number): Promise<IExerciseImage>
}

export class ExerciseImageDataSourceImpl implements ExerciseImageDataSource {
  private httpClient: IHttpHandler
  private static instance: ExerciseImageDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ExerciseImageDataSource {
    if (!this.instance) {
      this.instance = new ExerciseImageDataSourceImpl()
    }
    return this.instance
  }

  async setMainImage(exerciseId: number, imageId: number) {
    const { data } = await this.httpClient.patch<IApiExerciseImage>(
      API_ROUTES.EXERCISES.SET_MAIN_IMAGE(exerciseId, imageId),
    )
    return ExerciseImageAdapter.mapToExerciseImage(data)
  }

  async removeImage(exerciseId: number, imageId: number) {
    const { data } = await this.httpClient.delete<IApiExerciseImage>(
      API_ROUTES.EXERCISES.REMOVE_IMAGE(exerciseId, imageId),
    )
    return ExerciseImageAdapter.mapToExerciseImage(data)
  }
}
