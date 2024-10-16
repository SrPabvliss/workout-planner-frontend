<script setup lang="ts">
import useLogin from '../../composables/use-login'

const { zodPlugin, submitHandler } = useLogin()
</script>

<template>
  <FormKit id="form" type="form" :plugins="[zodPlugin]" @submit="submitHandler">
    <FormKit
      name="username"
      type="text"
      label="Usuario"
      validation-visibility="dirty"
      validation="required"
    />
    <FormKit
      type="password"
      label="Contraseña"
      validation-visibility="dirty"
      name="password"
      validation="required"
      />
    
    <div class="flex flex-col justify-between items-baseline mb-4">
      <FormKit
        type="checkbox"
        label="Recordarme"
        name="rememberMe"
        validation-visibility="dirty"
      />
      <a href="#" class="text-sm text-primary hover:underline">Olvidaste tu contraseña?</a>
    </div>
  </FormKit>
</template>

