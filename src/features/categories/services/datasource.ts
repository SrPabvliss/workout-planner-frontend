import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  IApiCategory,
  ICategory,
  ICreateCategory,
  IUpdateCategory,
  CategoryType,
} from '../interfaces/ICategory'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import { API_ROUTES } from '@/core/api/routes/api-routes'
import { CategoryAdapter } from '../adapters/category-adapter'

interface CategoryDataSource {
  getAll(): Promise<ICategory[]>
  getById(id: number): Promise<ICategory | null>
  getByType(type: CategoryType): Promise<ICategory[]>
  create(category: ICreateCategory): Promise<ICategory>
  update(id: number, category: IUpdateCategory): Promise<ICategory>
  remove(id: number): Promise<ICategory>
}

export class CategoryDataSourceImpl implements CategoryDataSource {
  private httpClient: IHttpHandler
  private static instance: CategoryDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): CategoryDataSource {
    if (!this.instance) {
      this.instance = new CategoryDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IApiCategory[]>(
      API_ROUTES.CATEGORIES.GET_ALL,
    )
    return CategoryAdapter.mapManyToCategory(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiCategory>(
      API_ROUTES.CATEGORIES.GET_BY_ID(id),
    )
    return CategoryAdapter.mapToCategory(data)
  }

  async getByType(type: CategoryType) {
    const { data } = await this.httpClient.get<IApiCategory[]>(
      API_ROUTES.CATEGORIES.GET_BY_TYPE(type),
    )
    return CategoryAdapter.mapManyToCategory(data)
  }

  async create(category: ICreateCategory) {
    const { data } = await this.httpClient.post<IApiCategory>(
      API_ROUTES.CATEGORIES.CREATE,
      CategoryAdapter.mapToApiCategory(category),
    )
    return CategoryAdapter.mapToCategory(data)
  }

  async update(id: number, category: IUpdateCategory) {
    const { data } = await this.httpClient.patch<IApiCategory>(
      API_ROUTES.CATEGORIES.UPDATE(id),
      CategoryAdapter.mapToApiCategory(category),
    )
    return CategoryAdapter.mapToCategory(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiCategory>(
      API_ROUTES.CATEGORIES.REMOVE(id),
    )
    return CategoryAdapter.mapToCategory(data)
  }
}
