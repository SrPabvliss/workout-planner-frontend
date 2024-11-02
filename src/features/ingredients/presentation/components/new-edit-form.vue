<script setup lang="ts">
import type { IIngredient } from '../../interfaces/IIngredient'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useIngredientForm } from '../../composable/use-ingredients-form'

const props = defineProps<{
  ingredient?: IIngredient | null
}>()

const { schema, onSubmit, defaultValues, mode, fieldConfig } =
  useIngredientForm(props.ingredient)
</script>

<template>
  <div class="mx-auto max-w-7xl mt-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle
            >{{ mode === 'edit' ? 'Editar' : 'Nuevo' }} Ingrediente</CardTitle
          >
        </CardHeader>
        <CardContent>
          <AutoForm
            class="space-y-6"
            :schema="schema"
            :initial-values="defaultValues"
            :field-config="fieldConfig"
            @submit="onSubmit"
          >
            <Button type="submit" class="w-full md:w-auto text-white">
              {{ mode === 'edit' ? 'Actualizar' : 'Crear' }} Ingrediente
            </Button>
          </AutoForm>
        </CardContent>
      </Card>

      <div class="hidden lg:block">
        <Card class="h-full">
          <CardContent class="h-full p-0 overflow-hidden">
            <img
              src="https://holausana.com/wp-content/uploads/2024/03/Los-5-Alimentos-mas-Nutritivos.jpg"
              alt="Ingredient illustration"
              class="w-full h-full object-cover rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
