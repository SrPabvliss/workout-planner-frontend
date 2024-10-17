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
          path: 'usuarios',
          name: 'usuarios',
          component: () =>
            import(
              '@/features/dashboard/presentation/views/dashboard-view.vue'
            ),
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
      ],
    },
  ],
})

export default router
