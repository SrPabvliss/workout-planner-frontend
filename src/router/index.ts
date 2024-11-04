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
            import('@/features/meals/presentation/views/meals-view.vue'),
        },
        {
          path: 'comidas/nueva',
          name: 'nueva-comida',
          component: () =>
            import('@/features/meals/presentation/views/new-meal.vue'),
        },
        {
          path: 'comidas/editar/:id',
          name: 'editar-comida',
          component: () =>
            import('@/features/meals/presentation/views/edit-meal.vue'),
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
        {
          path: 'ejercicios',
          name: 'ejercicios',
          component: () =>
            import(
              '@/features/exercises/presentation/views/exercises-view.vue'
            ),
        },
        {
          path: 'ejercicios/nuevo',
          name: 'nuevo-ejercicio',
          component: () =>
            import('@/features/exercises/presentation/views/new-exercise.vue'),
        },
        {
          path: 'ejercicios/editar/:id',
          name: 'editar-ejercicio',
          component: () =>
            import('@/features/exercises/presentation/views/edit-exercise.vue'),
        },
        {
          path: '/ingredientes',
          name: 'ingredientes',
          component: () =>
            import(
              '@/features/ingredients/presentation/views/ingredients-view.vue'
            ),
        },
        {
          path: '/ingredientes/nuevo',
          name: 'nuevo-ingrediente',
          component: () =>
            import(
              '@/features/ingredients/presentation/views/new-ingredient.vue'
            ),
        },
        {
          path: '/ingredientes/editar/:id',
          name: 'editar-ingrediente',
          component: () =>
            import(
              '@/features/ingredients/presentation/views/edit-ingredient.vue'
            ),
        },
        {
          path: 'plantillas-ejercicios',
          name: 'plantillas-ejercicios',
          component: () =>
            import(
              '@/features/presets/exercises/presentation/views/preset-exercises-view.vue'
            ),
        },
        {
          path: 'plantillas-ejercicios/nueva',
          name: 'nueva-plantilla-ejercicio',
          component: () =>
            import(
              '@/features/presets/exercises/presentation/views/new-preset-exercise.vue'
            ),
        },
        {
          path: 'plantillas-ejercicios/editar/:id',
          name: 'editar-plantilla-ejercicio',
          component: () =>
            import(
              '@/features/presets/exercises/presentation/views/edit-preset-exercise.vue'
            ),
        },

        /*
        {
          path: 'plantillas-alimentacion',
          name: 'plantillas-alimentacion',
          component: () =>
            import('@/features/presets/meals/presentation/views/preset-meals-view.vue'),
        },
        {
          path: 'plantillas-alimentacion/nueva',
          name: 'nueva-plantilla-alimentacion',
          component: () =>
            import('@/features/presets/meals/presentation/views/new-preset-meal.vue'),
        },
        {
          path: 'plantillas-alimentacion/editar/:id',
          name: 'editar-plantilla-alimentacion',
          component: () =>
            import('@/features/presets/meals/presentation/views/edit-preset-meal.vue'),
        },
        */
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
