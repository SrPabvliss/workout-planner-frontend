import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'
import { AuthDataSourceImpl } from '../services/datasource'

export default function useLogin() {
  const zodSchema = z.object({
    username: z.string().min(1, { message: 'El usuario es requerdido' }),
    password: z.string().min(1, { message: 'La contraseña es requerida' }),
    rememberMe: z.boolean().default(false),
  })

  const [zodPlugin, submitHandler] = createZodPlugin(
    zodSchema,

    async formData => {
      const { rememberMe, ...rest } = formData
      AuthDataSourceImpl.getInstance().login(rest)
      console.log('Logging in', rememberMe)
    },
  )

  return {
    zodPlugin,
    submitHandler,
  }
}
