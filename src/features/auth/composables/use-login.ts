import { z } from 'zod'
import { createZodPlugin } from '@formkit/zod'
import { AuthDataSourceImpl } from '../services/datasource'
import router from '@/router'
import { useModulesStore } from '@/core/context/modules-store'
import useNavLinks from '@/core/composables/use-navlinks'

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
      useModulesStore().setModules(useNavLinks(data.role))
      router.push({ name: 'dashboard', query: { role: data.role } })
    },
  )

  return {
    zodPlugin,
    submitHandler,
  }
}
