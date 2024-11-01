/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { CategoryDataSourceImpl } from '@/features/categories/services/datasource'
import { CategoryType } from '@/features/categories/interfaces/ICategory'
import { Dumbbell } from 'lucide-vue-next'

export function useExerciseCategories(initialCategories?: number[]) {
  const isLoadingCategories = ref(false)
  const selectedCategories = ref<number[]>(initialCategories || [])
  const categoryOptions = ref<{ label: string; value: number; icon?: any }[]>(
    [],
  )
  const categoryError = ref<string>('')

  const loadCategories = async () => {
    try {
      isLoadingCategories.value = true
      const categories = await CategoryDataSourceImpl.getInstance().getByType(
        CategoryType.EXERCISE,
      )
      categoryOptions.value = categories.map(category => ({
        label: category.name,
        value: category.id,
        icon: Dumbbell,
      }))
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      isLoadingCategories.value = false
    }
  }

  const handleCategoriesChange = (newValue: number[]) => {
    selectedCategories.value = newValue
    if (newValue.length > 0) {
      categoryError.value = ''
    }
  }

  const setError = (error: string) => {
    categoryError.value = error
  }

  const clearError = () => {
    categoryError.value = ''
  }

  return {
    isLoadingCategories,
    selectedCategories,
    categoryOptions,
    categoryError,
    loadCategories,
    handleCategoriesChange,
    setError,
    clearError,
  }
}
