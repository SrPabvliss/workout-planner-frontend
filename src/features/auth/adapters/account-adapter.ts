import type { IApiAccount, IAccount } from '../interfaces/IAccount'

export class AccountAdapter {
  static mapToAccount(apiAccount: IApiAccount): IAccount {
    return {
      id: apiAccount.id,
      firstName: apiAccount.first_name,
      lastName: apiAccount.last_name,
      username: apiAccount.username,
      email: apiAccount.email,
      role: apiAccount.role,
      avatarUrl: apiAccount.avatar_url,
    }
  }
}
