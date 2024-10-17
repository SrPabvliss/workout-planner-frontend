<script setup lang="ts">
import LoginForm from '../components/login-form.vue'

</script>

<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-100 w-screen"
  >
    <div class="lg:px-64 flex-2 md:px-16 md:w-3/4">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">
        Bienvenido de vuelta!
      </h2>
      <LoginForm />
    </div>
    <div
      class="relative w-3/4 lg:flex justify-end items-end overflow-hidden h-screen hidden "
    >
      <img
        src="https://lifehacker.com/imagery/articles/01HF2GX0AVRJ8V9V6WVRCWC4P8/hero-image.fill.size_1248x702.v1699834417.jpg"
        alt="Persona entrenando"
        class="object-cover h-full w-full"
      />

      <div
        class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
      >
        <div class="text-center text-white px-6">
          <h1 class="text-4xl font-bold">Hoy es un buen día para superarte</h1>
          <p class="mt-4 text-lg">
            Da cada paso con confianza. ¡Estamos contigo en cada desafío!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
