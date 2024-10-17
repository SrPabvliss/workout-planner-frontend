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
  </FormKit>
</template>

