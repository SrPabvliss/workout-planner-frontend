<script setup lang="ts">
import { useCategoryForm } from '../../composable/use-category-form'
import { type ICategory, CategoryType } from '../../interfaces/ICategory'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { computed } from 'vue'

const props = defineProps<{
  category?: ICategory | null
  categoryType: CategoryType
}>()

const { schema, onSubmit, defaultValues, mode, selectedColor, categoryType } =
  useCategoryForm(props.categoryType, props.category)

const fieldConfig = computed(() => ({
  name: {
    label: 'Nombre',
  },
  description: {
    label: 'Descripción',
    component: 'textarea',
    description: 'Describe el propósito de esta categoría',
  },
}))

const formTitle = computed(() => {
  const action = mode.value === 'edit' ? 'Editar' : 'Nueva'
  const type = categoryType === CategoryType.MEAL ? 'Alimentación' : 'Ejercicio'
  return `${action} Categoría de ${type}`
})
</script>

<template>
  <div class="mx-auto max-w-7xl mt-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>{{ formTitle }}</CardTitle>
        </CardHeader>
        <CardContent>
          <AutoForm
            class="space-y-4"
            :schema="schema"
            :field-config="fieldConfig"
            :initial-values="defaultValues"
            @submit="onSubmit"
          >
            <div class="space-y-4">
              <div class="space-y-2">
                <Label>Color</Label>
                <div class="flex items-center gap-4">
                  <Input
                    type="color"
                    v-model="selectedColor"
                    class="w-20 h-10 p-1"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end mt-6">
              <Button type="submit" class="w-full md:w-auto text-white">
                {{ mode === 'edit' ? 'Actualizar' : 'Crear' }} Categoría
              </Button>
            </div>
          </AutoForm>
        </CardContent>
      </Card>

      <div class="hidden lg:block">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                class="p-6 rounded-lg transition-colors"
                :style="{
                  backgroundColor: `${selectedColor}20`,
                  borderLeft: `4px solid ${selectedColor}`,
                }"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-4 h-4 rounded-full"
                    :style="{ backgroundColor: selectedColor }"
                  />
                  <span class="font-medium">Ejemplo de categoría</span>
                </div>
                <p class="mt-2 text-sm">
                  Así es como se verá tu categoría en el listado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
