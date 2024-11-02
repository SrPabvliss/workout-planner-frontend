import { ref, onMounted } from 'vue'
import type { IIngredient } from '../interfaces/IIngredient'
import { IngredientDataSourceImpl } from '../services/ingredient-datasource'

export function useIngredients() {
  const ingredients = ref<IIngredient[]>([])

  const loadIngredients = async () => {
    ingredients.value = await IngredientDataSourceImpl.getInstance().getAll()
  }

  const addIngredient = async () => {
    console.log('add ingredient')
  }

  onMounted(() => {
    loadIngredients()
  })

  return {
    ingredients,
    addIngredient,
  }
}
