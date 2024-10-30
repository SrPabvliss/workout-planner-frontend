/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { ref, computed } from 'vue'
import type { ICreateExerciseData, IExercise } from '../interfaces/IExercise'
import type { IExerciseImageUpload } from '../interfaces/IExerciseImage'
import { getChangedFields } from '@/lib/object-utils'
import { useToast } from 'vue-toastification'
import router from '@/router'
import { ExerciseDataSourceImpl } from '../services/exercise-datasource'
import { ExerciseImageDataSourceImpl } from '../services/exercise-image-datasource'

export const exerciseSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  description: z
    .string({ required_error: 'La descripción es requerida.' })
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres.' }),
  youtubeUrl: z
    .string()
    .url({ message: 'Debe ser una URL válida.' })
    .nullable()
    .optional(),
  categories: z
    .array(z.number())
    .min(1, { message: 'Debe seleccionar al menos una categoría.' }),
})

export type ExerciseFormData = z.infer<typeof exerciseSchema>

export function useExerciseForm(currentExercise?: IExercise | null) {
  const mode = ref<'new' | 'edit'>(currentExercise ? 'edit' : 'new')
  const isSubmitting = ref(false)
  const toast = useToast()

  const exerciseDataSource = ExerciseDataSourceImpl.getInstance()
  const exerciseImageDataSource = ExerciseImageDataSourceImpl.getInstance()

  const imageFiles = ref<IExerciseImageUpload[]>([])
  const imagesPreviews = ref<string[]>([])
  const removedImageIds = ref<number[]>([])

  const defaultValues = currentExercise
    ? {
        name: currentExercise.name,
        description: currentExercise.description,
        youtubeUrl: currentExercise.youtubeUrl,
        categories: currentExercise.categories.map(c => c.id),
      }
    : undefined

  if (currentExercise?.images) {
    imagesPreviews.value = currentExercise.images.map(img => img.url)
  }

  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    Array.from(input.files).forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        imagesPreviews.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      imageFiles.value.push({
        file,
        isMain: false,
      })
    })
  }

  const removeImage = async (index: number) => {
    if (currentExercise?.images?.[index]) {
      const imageId = currentExercise.images[index].id
      try {
        await exerciseImageDataSource.removeImage(currentExercise.id, imageId)
        removedImageIds.value.push(imageId)
        toast.success('Imagen eliminada correctamente')
      } catch (error) {
        console.error(error)
        toast.error('Error al eliminar la imagen')
        return
      }
    }

    imageFiles.value = imageFiles.value.filter((_, i) => i !== index)
    imagesPreviews.value = imagesPreviews.value.filter((_, i) => i !== index)
  }

  const toggleMainImage = async (index: number) => {
    if (mode.value === 'edit' && currentExercise?.images?.[index]) {
      try {
        await exerciseImageDataSource.setMainImage(
          currentExercise.id,
          currentExercise.images[index].id,
        )
        toast.success('Imagen principal actualizada')
        // Actualizar el estado local
        currentExercise.images = currentExercise.images.map((img, i) => ({
          ...img,
          isMain: i === index,
        }))
      } catch {
        toast.error('Error al actualizar la imagen principal')
      }
    } else {
      // Si es una imagen nueva, actualizar el estado local
      imageFiles.value = imageFiles.value.map((img, i) => ({
        ...img,
        isMain: i === index,
      }))
    }
  }

  const isMainImage = computed(() => (index: number) => {
    if (mode.value === 'edit' && currentExercise?.images?.[index]) {
      return currentExercise.images[index].isMain
    }
    return imageFiles.value[index]?.isMain
  })

  async function onSubmit(data: ExerciseFormData) {
    isSubmitting.value = true

    try {
      let response = null

      if (mode.value === 'edit' && currentExercise) {
        const changedFields = getChangedFields(
          defaultValues as Record<string, any>,
          data as Record<string, any>,
        )

        if (
          Object.keys(changedFields).length === 0 &&
          imageFiles.value.length === 0 &&
          removedImageIds.value.length === 0
        ) {
          toast.error('No se han modificado los campos')
          isSubmitting.value = false
          return
        }

        // Actualizar ejercicio
        if (Object.keys(changedFields).length > 0) {
          response = await exerciseDataSource.update(
            currentExercise.id,
            changedFields,
          )
        }

        // Subir nuevas imágenes si existen
        if (imageFiles.value.length > 0) {
          try {
            await exerciseImageDataSource.uploadImages(
              currentExercise.id,
              imageFiles.value,
            )
          } catch (error) {
            toast.error('Error al subir las imágenes')
            console.error('Error uploading images:', error)
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

        if (response && imageFiles.value.length > 0) {
          try {
            await exerciseImageDataSource.uploadImages(
              response.id,
              imageFiles.value,
            )
          } catch (error) {
            toast.error(
              'El ejercicio se creó pero hubo un error al subir las imágenes',
            )
            console.error('Error uploading images:', error)
          }
        }
      }

      if (response) {
        toast.success(
          mode.value === 'edit'
            ? 'Ejercicio actualizado correctamente'
            : 'Ejercicio creado correctamente',
        )
        setTimeout(() => {
          router.back()
        }, 800)
      }
    } catch (error) {
      console.error('Error in form submission:', error)
      toast.error('Error al guardar el ejercicio')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    schema: exerciseSchema,
    onSubmit,
    defaultValues,
    mode,
    isSubmitting,
    imageFiles,
    imagesPreviews,
    handleImageUpload,
    removeImage,
    toggleMainImage,
    isMainImage,
  }
}
