import { ref, computed } from 'vue'
import type { IExercise } from '../interfaces/IExercise'
import type { IExerciseImageUpload } from '../interfaces/IExerciseImage'
import { ExerciseImageDataSourceImpl } from '../services/exercise-image-datasource'

export function useExerciseImages(currentExercise?: IExercise | null) {
  const imageFiles = ref<IExerciseImageUpload[]>([])
  const imagesPreviews = ref<string[]>([])
  const removedImageIds = ref<number[]>([])
  const exerciseImageDataSource = ExerciseImageDataSourceImpl.getInstance()

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
      } catch (error) {
        console.error('deleting error', error)
        return
      }
    }

    imageFiles.value = imageFiles.value.filter((_, i) => i !== index)
    imagesPreviews.value = imagesPreviews.value.filter((_, i) => i !== index)
  }

  const toggleMainImage = async (index: number) => {
    if (currentExercise?.images?.[index]) {
      try {
        await exerciseImageDataSource.setMainImage(
          currentExercise.id,
          currentExercise.images[index].id,
        )
        currentExercise.images = currentExercise.images.map((img, i) => ({
          ...img,
          isMain: i === index,
        }))
      } catch (error) {
        console.log('Error updating main image', error)
      }
    } else {
      imageFiles.value = imageFiles.value.map((img, i) => ({
        ...img,
        isMain: i === index,
      }))
    }
  }

  const isMainImage = computed(() => (index: number) => {
    if (currentExercise?.images?.[index]) {
      return currentExercise.images[index].isMain
    }
    return imageFiles.value[index]?.isMain
  })

  const uploadImages = async (exerciseId: number) => {
    if (imageFiles.value.length > 0) {
      try {
        await exerciseImageDataSource.uploadImages(exerciseId, imageFiles.value)
      } catch (error) {
        console.error('Error uploading images:', error)
        throw error
      }
    }
  }

  return {
    imageFiles,
    imagesPreviews,
    removedImageIds,
    handleImageUpload,
    removeImage,
    toggleMainImage,
    isMainImage,
    uploadImages,
  }
}
