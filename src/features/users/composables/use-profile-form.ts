/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '@/features/auth/context/auth-store'
import type { IStudent } from '@/features/students/interfaces/IStudent'
import { StudentDataSourceImpl } from '@/features/students/services/datasource'
import type { ITrainer } from '@/features/trainers/interfaces/ITrainer'
import { TrainerDataSourceImpl } from '@/features/trainers/services/datasource'
import { getChangedFields } from '@/lib/object-utils'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

const commonSchema = z.object({
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
})

const studentSchema = commonSchema.extend({
  height: z.number({ required_error: 'La altura es requerida.' }),
  weight: z.number({ required_error: 'El peso es requerido.' }),
  medicalConditions: z.string({
    required_error: 'Las condiciones médicas son requeridas.',
  }),
  trainedBefore: z.boolean({
    required_error: 'Tiene entrenamientos anteriores.',
  }),
})

const trainerSchema = commonSchema.extend({
  specialization: z.string({
    required_error: 'La especialización es requerida.',
  }),
  yearsOfExperience: z.number({
    required_error: 'El año de experiencia es requerido.',
  }),
})

export const getCurrentUser = async () => {
  const { user, loadData } = useAuthStore()
  loadData()

  if (!user) return null

  const { role } = user

  if (role === 'student') {
    return await StudentDataSourceImpl.getInstance().getByUserId(user.id)
  }

  return await TrainerDataSourceImpl.getInstance().getByUserId(user.id)
}

export default function useProfileUpdate(role: string) {
  const toast = useToast()

  const schema =
    role === 'student'
      ? studentSchema.merge(commonSchema)
      : trainerSchema.merge(commonSchema)

  const defaultValues = ref<any>(null)
  const userId = ref<number | null>(null)
  const originalData = ref<any>(null)
  const currentValues = ref<any>(null)

  const loadUserData = async () => {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      const formattedData = {
        firstName: currentUser.user.firstName,
        lastName: currentUser.user.lastName,
        email: currentUser.user.email,
        username: currentUser.user.username,
        ...(role === 'student'
          ? {
              height: (currentUser as IStudent).height,
              weight: (currentUser as IStudent).weight,
              medicalConditions: (currentUser as IStudent).medicalConditions,
              trainedBefore: (currentUser as IStudent).trainedBefore,
            }
          : {
              specialization: (currentUser as ITrainer).specialization,
              yearsOfExperience: (currentUser as ITrainer).yearsOfExperience,
            }),
      }

      defaultValues.value = formattedData
      originalData.value = formattedData
      currentValues.value = formattedData
      userId.value = currentUser.id
    }
  }

  onMounted(() => {
    loadUserData()
  })

  async function onSubmit(formData: any) {
    const changedFields = getChangedFields(originalData.value, formData)

    if (Object.keys(changedFields).length === 0) {
      toast.error('No se han modificado los campos')
      return
    }

    if (role === 'student') {
      console.log('update student')
      await StudentDataSourceImpl.getInstance().update(
        userId.value!,
        changedFields,
      )
    } else {
      console.log('update trainer')
      await TrainerDataSourceImpl.getInstance().update(
        userId.value!,
        changedFields,
      )
    }

    originalData.value = { ...formData }
  }

  return {
    schema,
    onSubmit,
    defaultValues,
  }
}
