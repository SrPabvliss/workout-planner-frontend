import { ref } from 'vue'
import type {
  ICreateIngredient,
  IIngredient,
  IUpdateIngredient,
} from '../interfaces/IIngredient'
import { getChangedFields } from '@/lib/object-utils'
import router from '@/router'
import { useToast } from 'vue-toastification'
import { IngredientDataSourceImpl } from '../services/ingredient-datasource'
import { fieldConfig, ingredientSchema } from '../constants'

export function useIngredientForm(currentIngredient?: IIngredient | null) {
  const mode = ref(currentIngredient ? 'edit' : 'new')
  const isSubmiting = ref(false)
  const toast = useToast()

  const defaultValues = currentIngredient
    ? {
        name: currentIngredient.name,
        nutritionalInfo: {
          calories: currentIngredient.nutritionalInfo.calories,
          protein: currentIngredient.nutritionalInfo.protein,
          carbs: currentIngredient.nutritionalInfo.carbs,
          fat: currentIngredient.nutritionalInfo.fat,
          fiber: currentIngredient.nutritionalInfo.fiber,
          sugar: currentIngredient.nutritionalInfo.sugar,
          sodium: currentIngredient.nutritionalInfo.sodium,
          servingSize: currentIngredient.nutritionalInfo.servingSize,
          servingUnit: currentIngredient.nutritionalInfo.servingUnit,
        },
      }
    : {
        name: '',
        nutritionalInfo: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0,
          sodium: 0,
          servingSize: 100,
          servingUnit: 'g',
        },
      }

  async function onSubmit(formData: IUpdateIngredient | ICreateIngredient) {
    isSubmiting.value = true
    let response = null

    try {
      if (mode.value === 'edit' && currentIngredient) {
        const changedFields = getChangedFields(defaultValues, formData)

        if (Object.keys(changedFields).length === 0) {
          toast.error('No se han modificado los campos')
          return
        }

        response = await IngredientDataSourceImpl.getInstance().update(
          currentIngredient.id,
          { ...changedFields, isActive: currentIngredient.isActive },
        )
      } else {
        response = await IngredientDataSourceImpl.getInstance().create({
          ...formData,
          isActive: true,
        } as ICreateIngredient)
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
    schema: ingredientSchema,
    onSubmit,
    defaultValues,
    mode,
    isSubmiting,
    fieldConfig,
  }
}
