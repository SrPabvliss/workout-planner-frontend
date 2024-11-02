import { ref, onMounted } from 'vue'
import { MealDataSourceImpl } from '../services/datasource'
import type { IUnit } from '../interfaces/IMeal'
import {
  CategoryType,
  type ICategory,
} from '@/features/categories/interfaces/ICategory'
import type { IIngredient } from '@/features/ingredients/interfaces/IIngredient'
import { IngredientDataSourceImpl } from '@/features/ingredients/services/ingredient-datasource'
import { CategoryDataSourceImpl } from '@/features/categories/services/datasource'

export function useFormData() {
  const ingredients = ref<IIngredient[]>([])
  const categories = ref<ICategory[]>([])
  const units = ref<IUnit[]>([])
  const isLoading = ref(true)

  const loadIngredients = async () => {
    ingredients.value = await IngredientDataSourceImpl.getInstance().getAll()
  }

  const loadCategories = async () => {
    const response = await CategoryDataSourceImpl.getInstance().getByType(
      CategoryType.MEAL,
    )
    categories.value = response ?? []
  }

  const loadUnits = async () => {
    const response = await MealDataSourceImpl.getInstance().getAllUnits()
    units.value = response ?? []
  }

  const loadAllData = async () => {
    try {
      isLoading.value = true
      await Promise.all([loadIngredients(), loadCategories(), loadUnits()])
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadAllData()
  })

  return {
    ingredients,
    categories,
    units,
    isLoading,
  }
}
