import { ref, onMounted } from 'vue'
import type { IMeal } from '../interfaces/IMeal'
import { MealDataSourceImpl } from '../services/datasource'

export function useMeals() {
  const meals = ref<IMeal[]>([])

  const loadMeals = async () => {
    meals.value = await MealDataSourceImpl.getInstance().getAll()
  }

  const addMeal = async () => {
    console.log('add meal')
  }

  onMounted(() => {
    loadMeals()
  })

  return {
    meals,
    addMeal,
  }
}
