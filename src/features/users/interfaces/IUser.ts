/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IUser {
  id: number
  first_name: string
  last_name: string
  username: string
  password: string
  email: string
}

export interface ICreateUser extends Omit<IUser, 'id' | 'password'> {}

export interface IUpdateUser extends Partial<ICreateUser> {}
