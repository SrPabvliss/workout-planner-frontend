import { ref } from 'vue'
import type { ICreateMeal, IMeal, IUpdateMeal } from '../interfaces/IMeal'
import { getChangedFields } from '@/lib/object-utils'
import router from '@/router'
import { useToast } from 'vue-toastification'
import { MealDataSourceImpl } from '../services/datasource'
import { fieldConfig, mealSchema } from '../constants'

export function useMealForm(currentMeal?: IMeal | null) {
  const mode = ref(currentMeal ? 'edit' : 'new')
  const isSubmiting = ref(false)
  const toast = useToast()

  const categoryError = ref('')

  const defaultValues = currentMeal
    ? {
        name: currentMeal.name,
        description: currentMeal.description,
        preparation: currentMeal.preparation,
        ingredients: currentMeal.mealIngredients.map(mi => ({
          ingredientId: mi.ingredient.id,
          unitId: mi.unit.id,
          quantity: mi.quantity,
        })),
        categories: currentMeal.mealCategories.map(mc => mc.category.id),
      }
    : {
        name: '',
        description: '',
        preparation: '',
        ingredients: [],
        categories: [],
      }

  async function onSubmit(formData: IUpdateMeal | ICreateMeal) {
    isSubmiting.value = true
    let response = null

    try {
      if (formData.categories?.length === 0) {
        categoryError.value = 'Debe seleccionar al menos una categoría'
        return
      }

      if (mode.value === 'edit' && currentMeal) {
        const changedFields = getChangedFields(defaultValues, formData)

        if (Object.keys(changedFields).length === 0) {
          toast.error('No se han modificado los campos')
          return
        }

        response = await MealDataSourceImpl.getInstance().update(
          currentMeal.id,
          changedFields,
        )
      } else {
        response = await MealDataSourceImpl.getInstance().create(
          formData as ICreateMeal,
        )
      }

      if (response) {
        setTimeout(() => router.back(), 800)
      }
    } catch (error) {
      console.error(error)
    } finally {
      isSubmiting.value = false
    }
  }

  return {
    schema: mealSchema,
    onSubmit,
    defaultValues,
    mode: mode.value,
    isSubmiting,
    fieldConfig,
    categoryError,
  }
}
