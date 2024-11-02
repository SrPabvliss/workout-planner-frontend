import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type { IApiMeal, IApiUnit } from '../interfaces/IApiMeal'
import type {
  ICreateMeal,
  IMeal,
  IUnit,
  IUpdateMeal,
} from '../interfaces/IMeal'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { MealAdapter } from '../adapters/meal-adapter'

interface MealDataSource {
  getAll(): Promise<IMeal[]>
  getById(id: number): Promise<IMeal | null>
  create(meal: ICreateMeal): Promise<IMeal>
  update(id: number, meal: IUpdateMeal): Promise<IMeal>
  remove(id: number): Promise<IMeal>
  getAllUnits(): Promise<IUnit[]>
}

export class MealDataSourceImpl implements MealDataSource {
  private httpClient: IHttpHandler
  private static instance: MealDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): MealDataSource {
    if (!this.instance) {
      this.instance = new MealDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiMeal[]>(
      API_ROUTES.MEALS.GET_ALL,
    )
    return MealAdapter.mapManyToMeal(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiMeal>(
      API_ROUTES.MEALS.GET_BY_ID(id),
    )
    return MealAdapter.mapToMeal(data)
  }

  async create(meal: ICreateMeal) {
    const { data } = await this.httpClient.post<IApiMeal>(
      API_ROUTES.MEALS.CREATE,
      MealAdapter.mapToApiMeal(meal),
    )
    return MealAdapter.mapToMeal(data)
  }

  async update(id: number, meal: IUpdateMeal) {
    const { data } = await this.httpClient.patch<IApiMeal>(
      API_ROUTES.MEALS.UPDATE(id),
      MealAdapter.mapToApiMeal(meal),
    )
    return MealAdapter.mapToMeal(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiMeal>(
      API_ROUTES.MEALS.REMOVE(id),
    )
    return MealAdapter.mapToMeal(data)
  }

  async getAllUnits() {
    const { data } = await this.httpClient.get<IApiUnit[]>(
      API_ROUTES.UNITS.GET_ALL,
    )
    return MealAdapter.mapManyToUnit(data)
  }
}
