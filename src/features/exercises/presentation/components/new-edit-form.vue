<script setup lang="ts">
import { useExerciseForm } from '../../composable/use-exercise-form'
import type { IExercise } from '../../interfaces/IExercise'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { computed } from 'vue'
import ImagePreview from './image-preview.vue'

const props = defineProps<{
  exercise?: IExercise | null
}>()

const {
  schema,
  onSubmit,
  defaultValues,
  mode,
  isSubmitting,
  imagesPreviews,
  handleImageUpload,
  removeImage,
  toggleMainImage,
  isMainImage,
} = useExerciseForm(props.exercise)

const fieldConfig = computed(() => ({
  name: {
    label: 'Nombre',
  },
  description: {
    label: 'Descripción',
    component: 'textarea',
    description: 'Describe el ejercicio detalladamente',
  },
  youtubeUrl: {
    label: 'URL de YouTube',
    description: 'URL del video demostrativo (opcional)',
  },
}))

const formTitle = computed(() =>
  mode.value === 'edit' ? 'Editar Ejercicio' : 'Nuevo Ejercicio',
)
</script>

<template>
  <div class="mx-auto max-w-7xl mt-6">
    <Card>
      <CardHeader>
        <CardTitle>{{ formTitle }}</CardTitle>
      </CardHeader>
      <CardContent>
        <AutoForm
          class="space-y-6"
          :schema="schema"
          :field-config="fieldConfig"
          :initial-values="defaultValues"
          @submit="onSubmit"
        >
          <div class="space-y-4">
            <div class="space-y-2">
              <Label>Imágenes</Label>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="(preview, index) in imagesPreviews"
                  :key="index"
                  class="relative"
                >
                  <ImagePreview
                    :src="preview"
                    :is-main="isMainImage(index)"
                    @remove="removeImage(index)"
                    @toggle-main="toggleMainImage(index)"
                  />
                </div>
                <div
                  class="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-primary"
                  @click="$refs.fileInput.click()"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    class="hidden"
                    @change="handleImageUpload"
                  />
                  <span class="text-gray-500">Agregar imágenes</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <Button
              type="submit"
              class="w-full md:w-auto text-white"
              :disabled="isSubmitting"
            >
              {{ mode === 'edit' ? 'Actualizar' : 'Crear' }} Ejercicio
            </Button>
          </div>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
</template>
