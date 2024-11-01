<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useExerciseCategories } from '@/features/exercises/composable/use-exercise-categories'
import { useExerciseForm } from '@/features/exercises/composable/use-exercise-form'
import {
  EXERCISE_FIELD_CONFIG,
  EXERCISE_FORM_SCHEMA,
  FORM_TITLES,
} from '@/features/exercises/constants'
import type { IExercise } from '@/features/exercises/interfaces/IExercise'
import { computed, onMounted } from 'vue'
import ExerciseCategorySection from './exercise-category-section.vue'
import ExerciseImageSection from './exercise-image-section.vue'

const props = defineProps<{
  exercise?: IExercise | null
}>()

const {
  onSubmit,
  defaultValues,
  mode,
  isSubmitting,
  imagesPreviews,
  handleImageUpload,
  handleImageRemove,
  handleSetMainImage,
  isMainImage,
  canManageImage,
  validateCategories,
  hasPendingImages,
} = useExerciseForm(props.exercise)

const {
  isLoadingCategories,
  selectedCategories,
  categoryOptions,
  categoryError,
  loadCategories,
  setError,
  clearError,
} = useExerciseCategories(defaultValues?.categories)

onMounted(() => {
  loadCategories()
})

const formSchema = computed(() => EXERCISE_FORM_SCHEMA)
const fieldConfig = computed(() => EXERCISE_FIELD_CONFIG)
const formTitle = computed(() =>
  mode.value === 'edit' ? FORM_TITLES.edit : FORM_TITLES.new,
)

const handleSubmit = async (formData: any) => {
  const categoriesError = await validateCategories(selectedCategories.value)
  if (categoriesError) {
    setError(categoriesError)
    return
  }

  clearError()
  onSubmit({
    ...formData,
    categories: selectedCategories.value,
  })
}
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
          :schema="formSchema"
          :field-config="fieldConfig"
          :initial-values="defaultValues"
          @submit="handleSubmit"
        >
          <div class="space-y-4">
            <ExerciseCategorySection
              v-model:selectedCategories="selectedCategories"
              :category-options="categoryOptions"
              :is-loading-categories="isLoadingCategories"
              :category-error="categoryError"
            />

            <ExerciseImageSection
              :images-previews="imagesPreviews"
              :is-main-image="isMainImage"
              :can-manage-image="canManageImage"
              :on-remove="handleImageRemove"
              :on-toggle-main="handleSetMainImage"
              :on-upload="handleImageUpload"
              :disabled="isSubmitting"
            />
          </div>

          <div class="flex justify-end mt-6">
            <Button
              type="submit"
              class="w-full md:w-auto text-white"
              :disabled="isSubmitting"
            >
              {{ formTitle }}
              <span v-if="hasPendingImages" class="ml-2 text-sm">
                (Hay imágenes pendientes por guardar)
              </span>
            </Button>
          </div>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
</template>
