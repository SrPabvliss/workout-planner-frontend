<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/login')
}
</script>

<template>
  <footer class="bg-[#2a3447] text-white py-8">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <span class="text-xl font-bold">WorkoutPlanner</span>
      <Button class="text-white" variant="ghost" @click="handleClick">
        Iniciar sesión
      </Button>
    </div>
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-center text-sm"
    >
      <p>&copy; 2023 WorkoutPlanner. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>
