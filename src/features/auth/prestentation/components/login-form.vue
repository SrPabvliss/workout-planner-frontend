<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import useLogin from '../../composables/use-login'

const { email, password, rememberMe, onSubmit } = useLogin()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-4">
      <Label for="username">Usuario</Label>
      <Input
        type="email"
        id="username"
        v-model="email"
        class="focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div class="mb-4">
      <Label for="password">Password</Label>
      <Input
        type="password"
        id="password"
        v-model="password"
        class="focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div class="flex justify-between items-center mb-4">
      <Label class="flex items-center" for="rememberMe">
        <Checkbox v-model="rememberMe" id="rememberMe" class="text-white" />
        <span class="ml-2 text-sm text-gray-600">Recordarme</span>
      </Label>
      <a href="#" class="text-sm text-primary hover:underline"
        >Olvidaste tu contraseña?</a
      >
    </div>
    <Button type="submit" class="text-white"> Iniciar sesión </Button>
  </form>
</template>
