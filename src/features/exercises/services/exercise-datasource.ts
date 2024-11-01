import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import type {
  IApiExercise,
  ICreateExerciseData,
  IExercise,
  IUpdateExerciseData,
} from '../interfaces/IExercise'
import { ExerciseAdapter } from '../adapters/exercise-adapter'

interface ExerciseDataSource {
  getAll(): Promise<IExercise[]>
  getById(id: number): Promise<IExercise>
  create(exercise: ICreateExerciseData): Promise<IExercise>
  update(id: number, exercise: IUpdateExerciseData): Promise<IExercise>
  remove(id: number): Promise<IExercise>
}

export class ExerciseDataSourceImpl implements ExerciseDataSource {
  private httpClient: IHttpHandler
  private static instance: ExerciseDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): ExerciseDataSource {
    if (!this.instance) {
      this.instance = new ExerciseDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiExercise[]>(
      API_ROUTES.EXERCISES.GET_ALL,
    )
    return ExerciseAdapter.mapManyToExercise(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiExercise>(
      API_ROUTES.EXERCISES.GET_BY_ID(id),
    )
    return ExerciseAdapter.mapToExercise(data)
  }

  async create(exerciseData: ICreateExerciseData) {
    const formData = ExerciseAdapter.createFormData(exerciseData)

    const { data } = await this.httpClient.post<IApiExercise>(
      API_ROUTES.EXERCISES.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return ExerciseAdapter.mapToExercise(data)
  }

  async update(id: number, exerciseData: IUpdateExerciseData) {
    const formData = ExerciseAdapter.updateFormData(exerciseData)

    const { data } = await this.httpClient.patch<IApiExercise>(
      API_ROUTES.EXERCISES.UPDATE(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return ExerciseAdapter.mapToExercise(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiExercise>(
      API_ROUTES.EXERCISES.REMOVE(id),
    )
    return ExerciseAdapter.mapToExercise(data)
  }
}
