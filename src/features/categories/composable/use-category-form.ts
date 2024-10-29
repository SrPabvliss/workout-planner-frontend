import { z } from 'zod'
import { ref } from 'vue'
import { CategoryDataSourceImpl } from '../services/datasource'
import type {
  ICategory,
  ICreateCategory,
  IUpdateCategory,
  CategoryType,
} from '../interfaces/ICategory'
import { getChangedFields } from '@/lib/object-utils'
import router from '@/router'
import { useToast } from 'vue-toastification'

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  description: z.string().optional(),
})

export type CategoryFormData = z.infer<typeof categorySchema>

export function useCategoryForm(
  type: CategoryType,
  currentCategory?: ICategory | null,
) {
  const mode = ref(currentCategory ? 'edit' : 'new')
  const isSubmiting = ref(false)
  const toast = useToast()
  const selectedColor = ref(currentCategory?.color || '#000000')
  const categoryType = type

  const defaultValues = currentCategory
    ? {
        name: currentCategory.name,
        description: currentCategory.description,
      }
    : undefined

  async function onSubmit(data: CategoryFormData) {
    isSubmiting.value = true
    let response = null

    const formData = {
      ...data,
      color: selectedColor.value,
      type: categoryType,
    }

    if (mode.value === 'edit' && currentCategory) {
      const changedFields = getChangedFields(
        { ...defaultValues, color: currentCategory.color } as IUpdateCategory,
        formData as IUpdateCategory,
      )

      if (Object.keys(changedFields).length === 0) {
        isSubmiting.value = false
        toast.error('No se han modificado los campos')
        return
      }

      response = await CategoryDataSourceImpl.getInstance().update(
        currentCategory.id,
        changedFields,
      )
    } else {
      response = await CategoryDataSourceImpl.getInstance().create(
        formData as ICreateCategory,
      )
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
    schema: categorySchema,
    onSubmit,
    defaultValues,
    mode,
    isSubmiting,
    selectedColor,
    categoryType,
  }
}
