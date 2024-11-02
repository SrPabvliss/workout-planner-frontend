/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import type { ICreateExerciseData, IExercise } from '../interfaces/IExercise'
import { useExerciseImages } from './use-exercise-images'
import { getChangedFields } from '@/lib/object-utils'
import { ExerciseDataSourceImpl } from '../services/exercise-datasource'
import router from '@/router'
import { z } from 'zod'
import {
  categoriesSchema,
  exerciseSchema,
  type ExerciseFormData,
} from '../constants'

export function useExerciseForm(currentExercise?: IExercise | null) {
  const mode = ref<'new' | 'edit'>(currentExercise ? 'edit' : 'new')
  const isSubmitting = ref(false)
  const exerciseDataSource = ExerciseDataSourceImpl.getInstance()

  const {
    imagesPreviews,
    removeImage,
    setMainImage,
    handleNewImages,
    uploadPendingImages,
    isMainImage,
    canManageImage,
    hasPendingImages,
  } = useExerciseImages(currentExercise)

  const defaultValues = currentExercise
    ? {
        name: currentExercise.name,
        description: currentExercise.description,
        youtubeUrl: currentExercise.youtubeUrl,
        categories: currentExercise.categories.map(c => c.id),
      }
    : undefined

  const validateCategories = async (categories: number[]) => {
    try {
      await categoriesSchema.parseAsync(categories)
      return null
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message
      }
      return 'Error de validación en categorías'
    }
  }

  async function onSubmit(data: ExerciseFormData) {
    isSubmitting.value = true

    try {
      let response = null

      if (mode.value === 'edit' && currentExercise) {
        const changedFields = getChangedFields(
          defaultValues as Record<string, any>,
          data as Record<string, any>,
        )

        if (Object.keys(changedFields).length > 0 || hasPendingImages.value) {
          if (Object.keys(changedFields).length > 0) {
            response = await exerciseDataSource.update(
              currentExercise.id,
              changedFields,
            )
          }

          if (hasPendingImages.value) {
            await uploadPendingImages(currentExercise.id)
          }
        }
      } else {
        const exerciseData: ICreateExerciseData = {
          name: data.name,
          description: data.description,
          youtubeUrl: data.youtubeUrl,
          categories: data.categories,
        }

        response = await exerciseDataSource.create(exerciseData)

        if (response && hasPendingImages.value) {
          await uploadPendingImages(response.id)
        }
      }

      if (response) {
        setTimeout(() => {
          router.back()
        }, 800)
      }

      return response
    } catch (error) {
      console.error('Error in form submission:', error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    mode,
    schema: exerciseSchema,
    onSubmit,
    defaultValues,
    isSubmitting,
    validateCategories,

    imagesPreviews,
    handleImageUpload: handleNewImages,
    handleImageRemove: removeImage,
    handleSetMainImage: setMainImage,
    isMainImage,
    canManageImage,
    hasPendingImages,
  }
}
