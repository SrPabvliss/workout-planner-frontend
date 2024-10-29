import { ref, onMounted } from 'vue'
import type { IStudent } from '../interfaces/IExercise'
import { StudentDataSourceImpl } from '../services/exercise-image-datasource'
import { useAuthStore } from '@/features/auth/context/auth-store'

export function useStudents() {
  const students = ref<IStudent[]>([])
  const { user, loadData } = useAuthStore()
  loadData()

  const loadStudents = async () => {
    students.value = await StudentDataSourceImpl.getInstance().getAllByTrainer(
      user!.id,
    )
    console.log(students.value)
  }

  const addStudent = async () => {
    console.log('add student')
  }

  onMounted(() => {
    loadStudents()
  })

  return {
    students,
    addStudent,
  }
}
