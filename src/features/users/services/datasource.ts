import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type { ICreateUser, IUpdateUser, IUser } from '../interfaces/IUser'

interface UserDataSource {
  getAll(): Promise<IUser[]>
  getById(id: number): Promise<IUser | null>
  create(user: ICreateUser): Promise<IUser>
  update(id: number, user: IUpdateUser): Promise<IUser>
  remove(id: number): Promise<IUser>
}

export class UserDataSourceImpl implements UserDataSource {
  private httpClient: IHttpHandler
  private static instance: UserDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): UserDataSource {
    if (!this.instance) {
      this.instance = new UserDataSourceImpl()
    }
    return this.instance
  }

  async getAll() {
    const { data } = await this.httpClient.get<IUser[]>(
      API_ROUTES.USERS.GET_ALL,
    )
    return data
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IUser>(
      API_ROUTES.USERS.GET_BY_ID(id),
    )
    return data
  }

  async create(user: ICreateUser) {
    const { data } = await this.httpClient.post<IUser>(
      API_ROUTES.USERS.CREATE,
      user,
    )
    return data
  }

  async update(id: number, user: IUpdateUser) {
    const { data } = await this.httpClient.patch<IUser>(
      API_ROUTES.USERS.UPDATE(id),
      user,
    )
    return data
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IUser>(
      API_ROUTES.USERS.REMOVE(id),
    )
    return data
  }


}
