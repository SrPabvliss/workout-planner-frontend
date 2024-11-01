import { ref, computed } from 'vue'
import { ExerciseImageDataSourceImpl } from '../services/exercise-image-datasource'
import type { IExercise } from '../interfaces/IExercise'
import type {
  IExerciseImageUpload,
  ImagePreviewInfo,
} from '../interfaces/IExerciseImage'

export function useExerciseImages(currentExercise?: IExercise | null) {
  const imageDataSource = ExerciseImageDataSourceImpl.getInstance()
  const pendingImageFiles = ref<IExerciseImageUpload[]>([])
  const imagesPreviews = ref<ImagePreviewInfo[]>([])

  if (currentExercise?.images) {
    imagesPreviews.value = currentExercise.images.map(img => ({
      url: img.url,
      isPending: false,
      isMain: img.isMain,
      id: img.id,
    }))
  }

  const handleNewImages = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    Array.from(input.files).forEach(file => {
      const reader = new FileReader()
      reader.onload = e => {
        imagesPreviews.value.push({
          url: e.target?.result as string,
          isPending: true,
          isMain: false,
        })
      }
      reader.readAsDataURL(file)

      pendingImageFiles.value.push({
        file,
        isMain: false,
      })
    })
  }

  const removeImage = async (index: number) => {
    const image = imagesPreviews.value[index]

    if (!image.isPending && currentExercise) {
      try {
        await imageDataSource.removeImage(currentExercise.id, image.id!)
        imagesPreviews.value = imagesPreviews.value.filter(
          (_, i) => i !== index,
        )
      } catch (error) {
        console.error('Error removing image:', error)
        throw error
      }
    } else {
      const pendingIndex = getPendingImageIndex(index)
      if (pendingIndex !== -1) {
        pendingImageFiles.value.splice(pendingIndex, 1)
      }
      imagesPreviews.value = imagesPreviews.value.filter((_, i) => i !== index)
    }
  }

  const setMainImage = async (index: number) => {
    const image = imagesPreviews.value[index]

    if (!image.isPending && currentExercise) {
      try {
        await imageDataSource.setMainImage(currentExercise.id, image.id!)
        imagesPreviews.value = imagesPreviews.value.map((img, i) => ({
          ...img,
          isMain: i === index,
        }))
      } catch (error) {
        console.error('Error setting main image:', error)
        throw error
      }
    }
  }

  const isMainImage = computed(() => (index: number) => {
    return imagesPreviews.value[index]?.isMain || false
  })

  const canManageImage = computed(() => (index: number) => {
    return !imagesPreviews.value[index]?.isPending && !!currentExercise
  })

  const getPendingImageIndex = (previewIndex: number) => {
    const pendingCount = imagesPreviews.value
      .slice(0, previewIndex)
      .filter(img => img.isPending).length
    return pendingCount - 1
  }

  const uploadPendingImages = async (exerciseId: number) => {
    if (pendingImageFiles.value.length === 0) return

    try {
      await imageDataSource.uploadImages(exerciseId, pendingImageFiles.value)
      pendingImageFiles.value = []
      imagesPreviews.value = imagesPreviews.value.map(img => ({
        ...img,
        isPending: false,
      }))
    } catch (error) {
      console.error('Error uploading images:', error)
      throw error
    }
  }

  return {
    imagesPreviews,
    pendingImageFiles,
    handleNewImages,
    removeImage,
    setMainImage,
    isMainImage,
    canManageImage,
    uploadPendingImages,
    hasPendingImages: computed(() => pendingImageFiles.value.length > 0),
  }
}
