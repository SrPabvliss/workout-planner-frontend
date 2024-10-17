<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/login')
}
</script>

<template>
  <section class="bg-[#2a3447] text-white">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center md:flex-row gap-6"
    >
      <div class="md:w-1/2 pr-8">
        <h1 class="text-4xl font-bold mb-4">
          Optimiza tu entrenamiento personal
        </h1>
        <p class="text-xl mb-6">
          Gestiona tus rutinas, sigue tu progreso y alcanza tus objetivos
          fitness con WorkoutPlanner.
        </p>
        <Button
          class="font-semibold text-lg text-white"
          size="lg"
          @click="handleClick"
        >
          Comienza ahora
        </Button>
      </div>
      <div class="md:w-1/2">
        <img
          src="https://ik.imagekit.io/rezeve/cms/images/blog-posts/73086932-5f7c-4179-8483-a722862763bb~Rezeve%20Gambar%20Fix%20(66).jpg"
          alt="Persona entrenando"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
</template>
