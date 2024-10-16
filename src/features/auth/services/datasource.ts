import { API_ROUTES } from '@/core/api/routes/api-routes'
import { AxiosClient } from '@/core/infrastructure/http/axios-client'
import type { IHttpHandler } from '@/core/interfaces/IHttpHandler'

interface AuthDataSource {
  login({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<boolean>
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

  async login({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<boolean> {
    const response = await this.httpClient.post<any>(API_ROUTES.AUTH.LOGIN, {
      username: username,
      password: password,
    })

    console.log(response)
    return response.success
  }
}
