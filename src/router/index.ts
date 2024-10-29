import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import('@/features/home/presentation/views/home-view.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/features/auth/prestentation/views/login-view.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('@/core/layout/layout-view.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
            ),
        },
        {
          path: 'projects',
          name: 'projects',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
            ),
        },
        {
          path: 'estudiantes',
          name: 'estudiantes',
          component: () =>
            import('@/features/students/presentation/views/students-view.vue'),
        },
        {
          path: 'estudiantes/nuevo',
          name: 'newStudent',
          component: () =>
            import('@/features/students/presentation/views/new-student.vue'),
        },
        {
          path: 'estudiantes/editar/:id',
          name: 'editStudent',
          component: () =>
            import('@/features/students/presentation/views/edit-student.vue'),
        },
        {
          path: 'comidas',
          name: 'comidas',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
            ),
        },
        {
          path: 'categorias-alimentacion',
          name: 'categorias-alimentacion',
          component: () =>
            import(
              '@/features/categories/presentation/views/categories-meal-view.vue'
            ),
        },
        {
          path: 'categorias-alimentacion/nueva',
          name: 'newMealCategory',
          component: () =>
            import(
              '@/features/categories/presentation/views/new-meal-category.vue'
            ),
        },
        {
          path: 'categorias-alimentacion/editar/:id',
          name: 'editMealCategory',
          component: () =>
            import(
              '@/features/categories/presentation/views/edit-category.vue'
            ),
        },
        {
          path: 'ejercicios',
          name: 'ejercicios',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
            ),
        },
        {
          path: 'categorias-ejercicios',
          name: 'categorias-ejercicios',
          component: () =>
            import(
              '@/features/categories/presentation/views/categories-exercise-view.vue'
            ),
        },
        {
          path: 'categorias-ejercicios/nueva',
          name: 'newExerciseCategory',
          component: () =>
            import(
              '@/features/categories/presentation/views/new-exercise-category.vue'
            ),
        },
        {
          path: 'categorias-ejercicios/editar/:id',
          name: 'editExerciseCategory',
          component: () =>
            import(
              '@/features/categories/presentation/views/edit-category.vue'
            ),
        },
        {
          path: 'rutinas',
          name: 'rutinas',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
            ),
        },
        {
          path: 'perfil',
          name: 'perfil',
          component: () =>
            import('@/features/users/presentation/views/users-view.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (from.query.role && !to.query.role) {
    next({ path: to.path, query: { ...to.query, role: from.query.role } })
  } else {
    next()
  }
})

export default router
