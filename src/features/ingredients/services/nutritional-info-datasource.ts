import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  IApiNutritionalInfo,
  INutritionalInfo,
} from '../interfaces/INutritionalInfo'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { NutritionalInfoAdapter } from '../adapters/nutritional-info-adapter'

interface NutritionalInfoDataSource {
  getByIngredientId(id: number): Promise<INutritionalInfo | null>
  update(
    id: number,
    nutritionalInfo: Partial<INutritionalInfo>,
  ): Promise<INutritionalInfo>
}

export class NutritionalInfoDataSourceImpl
  implements NutritionalInfoDataSource
{
  private httpClient: IHttpHandler
  private static instance: NutritionalInfoDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): NutritionalInfoDataSource {
    if (!this.instance) {
      this.instance = new NutritionalInfoDataSourceImpl()
    }
    return this.instance
  }

  async getByIngredientId(id: number) {
    const { data } = await this.httpClient.get<IApiNutritionalInfo>(
      API_ROUTES.NUTRITIONAL_INFO.GET_BY_INGREDIENT_ID(id),
    )
    return NutritionalInfoAdapter.mapToNutritionalInfo(data)
  }

  async update(id: number, nutritionalInfo: Partial<INutritionalInfo>) {
    const { data } = await this.httpClient.patch<IApiNutritionalInfo>(
      API_ROUTES.NUTRITIONAL_INFO.UPDATE(id),
      NutritionalInfoAdapter.mapToApiNutritionalInfo(nutritionalInfo),
    )
    return NutritionalInfoAdapter.mapToNutritionalInfo(data)
  }
}
