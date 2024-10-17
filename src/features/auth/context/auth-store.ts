import { defineStore } from 'pinia'
import type { IAccount } from '../interfaces/IAccount'

interface IAuthStore {
  user: IAccount | null
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      user: null as IAccount | null,
      token: '',
    }) as IAuthStore,
  actions: {
    setUser(userData: IAccount | null) {
      this.user = userData
    },
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.user = null
      this.token = ''
    },
    loadData() {
      const store: IAuthStore = JSON.parse(localStorage.getItem('auth') || '{}')
      this.user = store.user
      this.token = store.token
    },
  },
  persist: {
    key: 'auth',
    storage: localStorage,
  },
})
