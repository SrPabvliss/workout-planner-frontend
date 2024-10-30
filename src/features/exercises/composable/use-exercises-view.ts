import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ExerciseDataSourceImpl } from '../services/exercise-datasource'
import type { IExercise } from '../interfaces/IExercise'

export function useExercises() {
  const exercises = ref<IExercise[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

  const loadExercises = async () => {
    try {
      isLoading.value = true
      exercises.value = await ExerciseDataSourceImpl.getInstance().getAll()
    } catch (e) {
      error.value = 'Error al cargar los ejercicios'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const addExercise = () => {
    router.push({ name: 'nuevo-ejercicio' })
  }

  const removeExercise = async (id: number) => {
    try {
      isLoading.value = true
      await ExerciseDataSourceImpl.getInstance().remove(id)
      exercises.value = exercises.value.filter(exercise => exercise.id !== id)
    } catch (e) {
      error.value = 'Error al eliminar el ejercicio'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadExercises()
  })

  return {
    exercises,
    isLoading,
    error,
    addExercise,
    removeExercise,
    loadExercises,
  }
}
