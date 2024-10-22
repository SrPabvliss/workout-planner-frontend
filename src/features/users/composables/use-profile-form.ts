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
  medicalConditons: z.string({
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

export default function useProfileUpdate(role: string) {
  const schema =
    role === 'student'
      ? studentSchema.merge(commonSchema)
      : trainerSchema.merge(commonSchema)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(formData: any) {
    if (role === 'student') {
      console.log(
        'StudentDataSourceImpl.getInstance().updateProfile(formData)',
        formData,
      )
    } else if (role === 'trainer') {
      console.log(
        'TrainerDataSourceImpl.getInstance().updateProfile(formData)',
        formData,
      )
    }
  }

  return {
    schema,
    onSubmit,
  }
}
