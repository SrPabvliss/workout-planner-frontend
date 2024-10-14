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
  ],
})

export default router
