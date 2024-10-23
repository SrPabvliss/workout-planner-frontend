<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import useLogin from '../../composables/use-login'

const { onSubmit, schema } = useLogin()
</script>

<template>
  <AutoForm
    class="space-y-6"
    :schema="schema"
    @submit="onSubmit"
    :field-config="{
      password: { inputProps: { type: 'password' } },
    }"
  >
    <Button type="submit" class="text-white"> Iniciar sesión </Button>
  </AutoForm>
</template>
