export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  USERS: {
    GET_ALL: '/users',
    CREATE: '/users',
    GET_BY_ID: (id: number) => `/users/${id}`,
    UPDATE: (id: number) => `/users/${id}`,
    REMOVE: (id: number) => `/users/${id}`,
  },
  STUDENTS: {
    GET_ALL: '/students',
    CREATE: '/students',
    GET_BY_ID: (id: number) => `/students/${id}`,
    GET_ALL_BY_TRAINER: (id: number) => `/students/trainer/${id}`,
    UPDATE: (id: number) => `/students/${id}`,
    REMOVE: (id: number) => `/students/${id}`,
  },
}
