import { ref, onMounted } from 'vue'
import type { IPresetExercise } from '../interfaces/IPresetExercise'
import { PresetExerciseDataSourceImpl } from '../services/datasource'
import { useAuthStore } from '@/features/auth/context/auth-store'

export function usePresetExercises() {
  const presets = ref<IPresetExercise[]>([])
  const { loadData } = useAuthStore()
  loadData()

  const loadPresets = async () => {
    presets.value = await PresetExerciseDataSourceImpl.getInstance().getAll()
  }

  const addPreset = async () => {
    console.log('add preset')
  }

  onMounted(() => {
    loadPresets()
  })

  return {
    presets,
    addPreset,
  }
}
