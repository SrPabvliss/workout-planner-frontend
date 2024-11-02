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
  CATEGORIES: {
    GET_ALL: '/categories',
    CREATE: '/categories',
    GET_BY_ID: (id: number) => `/categories/${id}`,
    GET_BY_TYPE: (type: string) => `/categories/type/${type}`,
    UPDATE: (id: number) => `/categories/${id}`,
    REMOVE: (id: number) => `/categories/${id}`,
  },
  EXERCISES: {
    GET_ALL: '/exercises',
    CREATE: '/exercises',
    GET_BY_ID: (id: number) => `/exercises/${id}`,
    UPDATE: (id: number) => `/exercises/${id}`,
    REMOVE: (id: number) => `/exercises/${id}`,
    SET_MAIN_IMAGE: (exerciseId: number, imageId: number) =>
      `/exercises/${exerciseId}/images/${imageId}/main`,
    REMOVE_IMAGE: (exerciseId: number, imageId: number) =>
      `/exercises/${exerciseId}/images/${imageId}`,
    UPLOAD_IMAGES: (exerciseId: number) => `/exercises/${exerciseId}/images`,
  },
  INGREDIENTS: {
    GET_ALL: '/ingredients',
    GET_ACTIVE: '/ingredients/active',
    CREATE: '/ingredients',
    GET_BY_ID: (id: number) => `/ingredients/${id}`,
    UPDATE: (id: number) => `/ingredients/${id}`,
    REMOVE: (id: number) => `/ingredients/${id}`,
  },
  NUTRITIONAL_INFO: {
    GET_BY_INGREDIENT_ID: (id: number) => `/ingredients/${id}/nutritional-info`,
    UPDATE: (id: number) => `/ingredients/${id}/nutritional-info`,
  },
}
