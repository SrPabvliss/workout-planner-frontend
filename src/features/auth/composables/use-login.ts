import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'
import { AuthDataSourceImpl } from '../services/datasource'
import router from '@/router'
import { useAuthStore } from '@/features/auth/context/auth-store'

export default function useLogin() {
  const zodSchema = z.object({
    username: z.string().min(1, { message: 'El usuario es requerdido' }),
    password: z.string().min(1, { message: 'La contraseña es requerida' }),
    rememberMe: z.boolean().default(false),
  })

  const [zodPlugin, submitHandler] = createZodPlugin(
    zodSchema,

    async formData => {
      const data = await AuthDataSourceImpl.getInstance().login(formData)
      if (!data) return
      router.push(`/${data.role}`)

      const authStore = useAuthStore()

      authStore.loadData()
    },
  )

  return {
    zodPlugin,
    submitHandler,
  }
}
