import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { PresetMealAdapter } from '../adapters/preset-meal-adapter'
import type {
  ICreatePresetMeal,
  IPresetMeal,
  IUpdatePresetMeal,
} from '../interfaces/IPresetMeals'
import type { IApiPresetMeal } from '../interfaces/IApiPresetMeals'

interface PresetMealDataSource {
  getAll(): Promise<IPresetMeal[]>
  getById(id: number): Promise<IPresetMeal | null>
  create(preset: ICreatePresetMeal): Promise<IPresetMeal>
  update(id: number, preset: IUpdatePresetMeal): Promise<IPresetMeal>
  remove(id: number): Promise<IPresetMeal>
}

export class PresetMealDataSourceImpl implements PresetMealDataSource {
  private httpClient: IHttpHandler
  private static instance: PresetMealDataSource

  private constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): PresetMealDataSource {
    if (!this.instance) {
      this.instance = new PresetMealDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiPresetMeal[]>(
      API_ROUTES.PRESET_MEALS.GET_ALL,
    )
    return PresetMealAdapter.mapManyToPresetMeal(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiPresetMeal>(
      API_ROUTES.PRESET_MEALS.GET_BY_ID(id),
    )
    return PresetMealAdapter.mapToPresetMeal(data)
  }

  async create(preset: ICreatePresetMeal) {
    const { data } = await this.httpClient.post<IApiPresetMeal>(
      API_ROUTES.PRESET_MEALS.CREATE,
      PresetMealAdapter.mapToApiPresetMeal(preset),
    )
    return PresetMealAdapter.mapToPresetMeal(data)
  }

  async update(id: number, preset: IUpdatePresetMeal) {
    const { data } = await this.httpClient.patch<IApiPresetMeal>(
      API_ROUTES.PRESET_MEALS.UPDATE(id),
      PresetMealAdapter.mapToApiPresetMeal(preset),
    )
    return PresetMealAdapter.mapToPresetMeal(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiPresetMeal>(
      API_ROUTES.PRESET_MEALS.REMOVE(id),
    )
    return PresetMealAdapter.mapToPresetMeal(data)
  }
}
