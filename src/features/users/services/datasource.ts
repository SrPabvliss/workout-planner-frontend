import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type {
  IApiUser,
  ICreateUser,
  IUpdateUser,
  IUser,
} from '../interfaces/IUser'
import { UserAdapter } from '../adpaters/user-adapter'

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
    const { data } = await this.httpClient.get<IApiUser[]>(
      API_ROUTES.USERS.GET_ALL,
    )
    return UserAdapter.mapManyToUser(data)
  }

  async getById(id: number) {
    const { data } = await this.httpClient.get<IApiUser>(
      API_ROUTES.USERS.GET_BY_ID(id),
    )
    return UserAdapter.mapToUser(data)
  }

  async create(user: ICreateUser) {
    const { data } = await this.httpClient.post<IApiUser>(
      API_ROUTES.USERS.CREATE,
      user,
    )
    return UserAdapter.mapToUser(data)
  }

  async update(id: number, user: IUpdateUser) {
    const { data } = await this.httpClient.patch<IApiUser>(
      API_ROUTES.USERS.UPDATE(id),
      user,
    )
    return UserAdapter.mapToUser(data)
  }

  async remove(id: number) {
    const { data } = await this.httpClient.delete<IApiUser>(
      API_ROUTES.USERS.REMOVE(id),
    )
    return UserAdapter.mapToUser(data)
  }
}
