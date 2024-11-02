import { ref, onMounted } from 'vue'
import type { IStudent } from '../interfaces/IStudent'
import { StudentDataSourceImpl } from '../services/datasource'
import { useAuthStore } from '@/features/auth/context/auth-store'

export function useStudents() {
  const students = ref<IStudent[]>([])
  const { user, loadData } = useAuthStore()
  loadData()

  const loadStudents = async () => {
    students.value = await StudentDataSourceImpl.getInstance().getAllByTrainer(
      user!.id,
    )
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
