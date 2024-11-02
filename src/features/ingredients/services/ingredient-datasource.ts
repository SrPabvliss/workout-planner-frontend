import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  IApiIngredient,
  ICreateIngredient,
  IIngredient,
  IUpdateIngredient,
} from '../interfaces/IIngredient'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { IngredientAdapter } from '../adapters/ingredient-adapter'

interface IngredientDataSource {
  getAll(): Promise<IIngredient[]>
  getById(id: number): Promise<IIngredient | null>
  getActive(): Promise<IIngredient[]>
  create(ingredient: ICreateIngredient): Promise<IIngredient>
  update(id: number, ingredient: IUpdateIngredient): Promise<IIngredient>
  remove(id: number): Promise<IIngredient>
}

export class IngredientDataSourceImpl implements IngredientDataSource {
  private httpClient: IHttpHandler
  private static instance: IngredientDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): IngredientDataSource {
    if (!this.instance) {
      this.instance = new IngredientDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiIngredient[]>(
      API_ROUTES.INGREDIENTS.GET_ALL,
    )
    return IngredientAdapter.mapManyToIngredient(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiIngredient>(
      API_ROUTES.INGREDIENTS.GET_BY_ID(id),
    )
    return IngredientAdapter.mapToIngredient(data)
  }

  async getActive() {
    const { data } = await this.httpClient.get<IApiIngredient[]>(
      API_ROUTES.INGREDIENTS.GET_ACTIVE,
    )
    return IngredientAdapter.mapManyToIngredient(data)
  }

  async create(ingredient: ICreateIngredient) {
    const { data } = await this.httpClient.post<IApiIngredient>(
      API_ROUTES.INGREDIENTS.CREATE,
      IngredientAdapter.mapToApiIngredient(ingredient),
    )
    console.log('data', data)
    return IngredientAdapter.mapToIngredient(data)
  }

  async update(id: number, ingredient: IUpdateIngredient) {
    const { data } = await this.httpClient.patch<IApiIngredient>(
      API_ROUTES.INGREDIENTS.UPDATE(id),
      IngredientAdapter.mapToApiIngredient(ingredient),
    )
    return IngredientAdapter.mapToIngredient(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiIngredient>(
      API_ROUTES.INGREDIENTS.REMOVE(id),
    )
    return IngredientAdapter.mapToIngredient(data)
  }
}
