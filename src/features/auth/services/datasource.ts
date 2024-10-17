import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'
import type { ILogin, ILoginResponse } from '../interfaces/ILogin'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '@/features/auth/context/auth-store'
import type { IAccount } from '../interfaces/IAccount'

interface AuthDataSource {
  login({ username, password }: ILogin): Promise<IAccount>
  logout(): void
}

export class AuthDataSourceImpl implements AuthDataSource {
  private httpClient: IHttpHandler
  private static instance: AuthDataSource

  constructor() {
    this.httpClient = AxiosClient.getInstance()
  }

  static getInstance(): AuthDataSource {
    if (!this.instance) {
      this.instance = new AuthDataSourceImpl()
    }
    return this.instance
  }

  async login({ username, password }: ILogin) {
    const { data } = await this.httpClient.post<ILoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      {
        username: username,
        password: password,
      },
    )

    if (!data) return data

    const user = jwtDecode<IAccount>(data.access_token)
    useAuthStore().setToken(data.access_token)
    useAuthStore().setUser(user)
    this.httpClient.setAccessToken(data.access_token)

    return user
  }

  logout() {
    useAuthStore().logout()
    this.httpClient.setAccessToken(null)
  }
}
