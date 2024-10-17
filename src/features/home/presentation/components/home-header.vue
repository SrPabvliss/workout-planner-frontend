<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/login')
}
</script>

<template>
  <header class="bg-white shadow-md">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
    >
      <div class="flex items-center">
        <!-- <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-auto mr-2" /> -->
        <span class="text-xl font-bold text-gray-900">WorkoutPlanner</span>
      </div>
      <Button class="hidden md:block text-white" @click="handleClick"
        >Iniciar sesión</Button
      >
    </div>
  </header>
</template>
