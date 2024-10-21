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
    GET_BY_USER_ID: (id: number) => `/students/user/${id}`,
    UPDATE: (id: number) => `/students/${id}`,
    REMOVE: (id: number) => `/students/${id}`,
  },
  TRAINER: {
    GET_ALL: '/trainers',
    CREATE: '/trainers',
    GET_BY_ID: (id: number) => `/trainers/${id}`,
    GET_BY_USER_ID: (id: number) => `/trainers/user/${id}`,
    UPDATE: (id: number) => `/trainers/${id}`,
    REMOVE: (id: number) => `/trainers/${id}`,
  },
}
