import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  IPresetExercise,
  ICreatePresetExercise,
  IUpdatePresetExercise,
} from '../interfaces/IPresetExercise'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { PresetExerciseAdapter } from '../adapters/preset-exercise-adapter'
import type { IApiPresetExercise } from '../interfaces/IApiPresetExercise'

interface PresetExerciseDataSource {
  getAll(): Promise<IPresetExercise[]>
  getById(id: number): Promise<IPresetExercise | null>
  create(preset: ICreatePresetExercise): Promise<IPresetExercise>
  update(id: number, preset: IUpdatePresetExercise): Promise<IPresetExercise>
  remove(id: number): Promise<IPresetExercise>
}

export class PresetExerciseDataSourceImpl implements PresetExerciseDataSource {
  private httpClient: IHttpHandler
  private static instance: PresetExerciseDataSource

  private constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): PresetExerciseDataSource {
    if (!this.instance) {
      this.instance = new PresetExerciseDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiPresetExercise[]>(
      API_ROUTES.PRESET_EXERCISES.GET_ALL,
    )
    return PresetExerciseAdapter.mapManyToPresetExercise(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiPresetExercise>(
      API_ROUTES.PRESET_EXERCISES.GET_BY_ID(id),
    )
    return PresetExerciseAdapter.mapToPresetExercise(data)
  }

  async create(preset: ICreatePresetExercise) {
    const { data } = await this.httpClient.post<IApiPresetExercise>(
      API_ROUTES.PRESET_EXERCISES.CREATE,
      PresetExerciseAdapter.mapToApiPresetExercise(preset),
    )
    return PresetExerciseAdapter.mapToPresetExercise(data)
  }

  async update(id: number, preset: IUpdatePresetExercise) {
    const { data } = await this.httpClient.patch<IApiPresetExercise>(
      API_ROUTES.PRESET_EXERCISES.UPDATE(id),
      PresetExerciseAdapter.mapToApiPresetExercise(preset),
    )
    return PresetExerciseAdapter.mapToPresetExercise(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiPresetExercise>(
      API_ROUTES.PRESET_EXERCISES.REMOVE(id),
    )
    return PresetExerciseAdapter.mapToPresetExercise(data)
  }
}
