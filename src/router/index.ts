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
      path: '',
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
          path: 'comidas',
          name: 'comidas',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
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
