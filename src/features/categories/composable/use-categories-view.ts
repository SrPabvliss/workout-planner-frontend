import { ref, onMounted } from 'vue'
import type { ICategory, CategoryType } from '../interfaces/ICategory'
import { CategoryDataSourceImpl } from '../services/datasource'

export function useCategories(type: CategoryType) {
  const categories = ref<ICategory[]>([])

  const loadCategories = async () => {
    categories.value =
      await CategoryDataSourceImpl.getInstance().getByType(type)
  }

  const addCategory = async () => {
    console.log('add category')
  }

  onMounted(() => {
    loadCategories()
  })

  return {
    categories,
    addCategory,
  }
}
