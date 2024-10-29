import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CategoryDataSourceImpl } from '../services/datasource'
import { CategoryType, type ICategory } from '../interfaces/ICategory'

export function useEditCategory() {
  const route = useRoute()
  const categoryId = Number(route.params.id)
  const category = ref<ICategory | null>(null)
  const categoryValue = computed(() => category.value)

  const breadcrumbItems = computed(() => {
    const baseRoute =
      category.value?.type === CategoryType.MEAL
        ? 'categorias-alimentacion'
        : 'categorias-ejercicios'
    const baseLabel =
      category.value?.type === CategoryType.MEAL
        ? 'Categorías de Alimentación'
        : 'Categorías de Ejercicios'

    return [
      { label: baseLabel, href: baseRoute },
      { label: 'Editar', href: 'editCategory', current: true },
    ]
  })

  const loadCategory = async () => {
    try {
      const response =
        await CategoryDataSourceImpl.getInstance().getById(categoryId)
      category.value = response
    } catch (error) {
      console.error('Error loading category:', error)
    }
  }

  return {
    category,
    categoryValue,
    breadcrumbItems,
    loadCategory,
  }
}
