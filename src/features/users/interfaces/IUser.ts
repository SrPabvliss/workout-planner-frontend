/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IApiUser {
  id: number
  first_name: string
  last_name: string
  username: string
  password: string
  email: string
  avatar_url?: string
}

export interface IUser {
  id: number
  firstName: string
  lastName: string
  username: string
  password?: string
  email: string
  avatarUrl?: string
}

export interface ICreateUser extends Omit<IUser, 'id' | 'password'> {}

export interface IUpdateUser extends Partial<ICreateUser> {}
