import { ref, onMounted } from 'vue'
import { PresetMealDataSourceImpl } from '../services/datasource'
import { useAuthStore } from '@/features/auth/context/auth-store'
import type { IPresetMeal } from '../interfaces/IPresetMeals'

export function usePresetMeals() {
  const presets = ref<IPresetMeal[]>([])
  const { loadData } = useAuthStore()
  loadData()

  const loadPresets = async () => {
    presets.value = await PresetMealDataSourceImpl.getInstance().getAll()
  }

  const addPreset = async () => {
    console.log('add preset meal')
  }

  onMounted(() => {
    loadPresets()
  })

  return {
    presets,
    addPreset,
  }
}
