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

  static mapToApiUser(user: IUser): IApiUser {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email,
      avatar_url: user.avatarUrl,
    }
  }

  static mapToApiUsers(users: IUser[]): IApiUser[] {
    return users.map(user => UserAdapter.mapToApiUser(user))
  }
}
