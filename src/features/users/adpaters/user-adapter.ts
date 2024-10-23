import { toSnakeCase } from '@/lib/case-converter'
import type { IApiUser, IUser } from '../interfaces/IUser'

export class UserAdapter {
  static mapToUser(apiUser: IApiUser): IUser {
    return {
      id: apiUser.id,
      firstName: apiUser.first_name,
      lastName: apiUser.last_name,
      username: apiUser.username,
      password: apiUser.password,
      email: apiUser.email,
      avatarUrl: apiUser.avatar_url,
    }
  }

  static mapManyToUser(apiUsers: IApiUser[]): IUser[] {
    return apiUsers.map(user => UserAdapter.mapToUser(user))
  }

  static mapToApiUser(user: Partial<IUser>): Partial<IApiUser> {
    return toSnakeCase(user) as Partial<IApiUser>
  }
}
