import { ref, computed } from 'vue'
import {
  AVATAR_CUSTOMIZATION_OPTIONS,
  DEFAULT_AVATAR_OPTIONS,
} from '../constants'
import { useAuthStore } from '@/features/auth/context/auth-store'
import { UserDataSourceImpl } from '../services/datasource'
import { useToast } from 'vue-toastification'

export const useAvatarForm = () => {
  const { user, loadData, setUser } = useAuthStore()
  loadData()
  const isSaving = ref(false)

  const toast = useToast()

  const parseAvatarUrl = (
    url: string,
  ): Partial<typeof DEFAULT_AVATAR_OPTIONS> => {
    try {
      const urlObj = new URL(url)
      const params = new URLSearchParams(urlObj.search)
      const options: Partial<typeof DEFAULT_AVATAR_OPTIONS> = {}

      for (const key of Object.keys(DEFAULT_AVATAR_OPTIONS) as Array<
        keyof typeof DEFAULT_AVATAR_OPTIONS
      >) {
        const value = params.get(key)
        if (value) {
          options[key] = value
        }
      }

      return options
    } catch (error) {
      console.warn('Error parsing avatar URL:', error)
      return {}
    }
  }

  const getInitialOptions = () => {
    if (user?.avatarUrl) {
      const parsedOptions = parseAvatarUrl(user.avatarUrl)
      return {
        ...DEFAULT_AVATAR_OPTIONS,
        ...parsedOptions,
      }
    }
    return { ...DEFAULT_AVATAR_OPTIONS }
  }

  type SelectedOptions = typeof DEFAULT_AVATAR_OPTIONS

  const categories = AVATAR_CUSTOMIZATION_OPTIONS
  const selectedOptions = ref<SelectedOptions>(getInitialOptions())

  const updateOption = (
    categoryId: keyof typeof DEFAULT_AVATAR_OPTIONS,
    value: string,
  ) => {
    selectedOptions.value = {
      ...selectedOptions.value,
      [categoryId]: value,
    }
  }

  const avatarUrl = computed(() => {
    const baseUrl = 'https://api.dicebear.com/9.x/avataaars/svg'
    const params = new URLSearchParams()

    Object.entries(selectedOptions.value).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })

    return `${baseUrl}?${params.toString()}`
  })

  const getCurrentAvatarUrl = () => avatarUrl.value

  const resetOptions = () => {
    selectedOptions.value = { ...DEFAULT_AVATAR_OPTIONS }
  }

  const setOptions = (options: Partial<SelectedOptions>) => {
    selectedOptions.value = {
      ...selectedOptions.value,
      ...options,
    }
  }

  const saveAvatar = async () => {
    isSaving.value = true
    const avatarUrl = getCurrentAvatarUrl()
    const hasChanges = avatarUrl !== user?.avatarUrl
    if (!hasChanges) {
      toast.error('No se han modificado el avatar')
      isSaving.value = false
      return
    }
    const { id } = user!
    const data = await UserDataSourceImpl.getInstance().update(id, {
      avatarUrl,
    })
    if (data && user) {
      setUser({
        ...user,
        avatarUrl,
      })
    }
    isSaving.value = false
  }

  return {
    updateOption,
    avatarUrl,
    categories,
    selectedOptions,
    getCurrentAvatarUrl,
    resetOptions,
    setOptions,
    saveAvatar,
    isSaving,
  }
}
