<script setup lang="ts">
import { reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<template>
  <section class="bg-gray-100 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-8 rounded-lg">
        Solicita un entrenador
      </h2>
      <form
        @submit.prevent="handleSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <Label for="name"> Nombre completo </Label>
          <Input id="name" type="text" v-model="form.name" required />
        </div>
        <div class="mb-4">
          <Label for="email"> Correo electrónico </Label>
          <Input id="email" type="email" v-model="form.email" required />
        </div>
        <div class="mb-6">
          <Label for="message"> Mensaje </Label>
          <Textarea
            id="message"
            v-model="form.message"
            rows="4"
            required
          ></Textarea>
        </div>
        <div class="flex items-center justify-between">
          <Button class="text-white" type="submit"> Enviar solicitud </Button>
        </div>
      </form>
    </div>
  </section>
</template>
