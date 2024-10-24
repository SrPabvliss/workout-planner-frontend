// use-student-form.ts
import { z } from 'zod'
import { ref } from 'vue'
import { StudentDataSourceImpl } from '../services/datasource'
import type {
  ICreateStudent,
  IStudent,
  IUpdateStudent,
} from '../interfaces/IStudent'
import { getChangedFields } from '@/lib/object-utils'
import router from '@/router'
import { useAuthStore } from '@/features/auth/context/auth-store'
import { useToast } from 'vue-toastification'

export const studentSchema = z.object({
  firstName: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  lastName: z
    .string({ required_error: 'El apellido es requerido.' })
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' }),
  email: z
    .string({ required_error: 'El correo es requerido.' })
    .email({ message: 'El correo debe ser válido.' }),
  username: z
    .string({ required_error: 'El nombre de usuario es requerido.' })
    .min(2, {
      message: 'El nombre de usuario debe tener al menos 2 caracteres.',
    }),
  height: z.number({ required_error: 'La altura es requerida.' }),
  weight: z.number({ required_error: 'El peso es requerido.' }),
  medicalConditions: z.string({
    required_error: 'Las condiciones médicas son requeridas.',
  }),
  trainedBefore: z
    .boolean({
      required_error: 'Tiene entrenamientos anteriores.',
    })
    .default(false),
})

export function useStudentForm(currentStudent?: IStudent | null) {
  const mode = ref(currentStudent ? 'edit' : 'new')
  const { user, loadData } = useAuthStore()
  const isSubmiting = ref(false)
  const toast = useToast()

  loadData()
  const defaultValues = ref(
    currentStudent
      ? {
          firstName: currentStudent.user.firstName,
          lastName: currentStudent.user.lastName,
          email: currentStudent.user.email,
          username: currentStudent.user.username,
          height: currentStudent.height,
          weight: currentStudent.weight,
          medicalConditions: currentStudent.medicalConditions,
          trainedBefore: currentStudent.trainedBefore,
        }
      : null,
  )

  async function onSubmit(formData: IUpdateStudent | ICreateStudent) {
    isSubmiting.value = true
    let response = null
    const hasChanges = ref(false)

    if (mode.value === 'edit' && currentStudent) {
      const changedFields = getChangedFields(
        defaultValues.value as IUpdateStudent,
        formData as IUpdateStudent,
      )


      hasChanges.value = Object.keys(changedFields).length > 0

      if (!hasChanges.value) {
        isSubmiting.value = false
        toast.error('No se han modificado los campos')
        return
      }

      response = await StudentDataSourceImpl.getInstance().update(
        currentStudent.id,
        changedFields,
      )
    } else {
      response = await StudentDataSourceImpl.getInstance().create({
        ...formData,
        trainer: user!.id,
      } as ICreateStudent)
    }

   

    if (response) {
      setTimeout(() => {
        router.back()
        isSubmiting.value = false
      }, 800)
    }
    isSubmiting.value = false
  }

  return {
    schema: studentSchema,
    onSubmit,
    defaultValues,
    mode,
    isSubmiting,
  }
}
