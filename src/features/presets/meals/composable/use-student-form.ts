/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { ref } from 'vue'
import { PresetMealDataSourceImpl } from '../services/datasource'
import router from '@/router'
import { useToast } from 'vue-toastification'
import type {
  LocalPresetMealDay,
  LocalPresetDayMeal,
} from '../interfaces/ILocalPresetMeal'
import type { IPresetMeal } from '../interfaces/IPresetMeals'

export const presetMealSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  description: z
    .string({ required_error: 'La descripción es requerida.' })
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres.' }),
})

export function usePresetMealForm(currentPreset?: IPresetMeal | null) {
  const mode = ref<'edit' | 'new'>(currentPreset ? 'edit' : 'new')
  const isSubmitting = ref(false)
  const toast = useToast()

  const createInitialDay = (dayOfWeek: number) => ({
    dayOfWeek,
    meals: [],
  })

  const days = ref<LocalPresetMealDay[]>(
    currentPreset
      ? currentPreset.days.map(day => ({
          dayOfWeek: day.dayOfWeek,
          meals: day.meals.map(meal => ({
            mealId: meal.meal.id,
            order: meal.order,
            meal: meal.meal,
          })),
        }))
      : [createInitialDay(1)],
  )

  const defaultValues = ref({
    name: currentPreset?.name || '',
    description: currentPreset?.description || '',
  })

  const addDay = () => {
    if (days.value.length >= 7) {
      toast.warning('No puedes agregar más de 7 días')
      return
    }

    const existingDays = days.value.map(d => d.dayOfWeek)
    let newDayNumber = existingDays.length + 1

    while (existingDays.includes(newDayNumber)) {
      newDayNumber++
    }

    days.value.push(createInitialDay(newDayNumber))
    days.value.sort((a, b) => a.dayOfWeek - b.dayOfWeek)
  }

  const removeDay = (dayOfWeek: number) => {
    if (days.value.length <= 1) {
      toast.warning('Debe haber al menos un día en el plan de alimentación')
      return
    }

    days.value = days.value.filter(day => day.dayOfWeek !== dayOfWeek)
  }

  const updateMeals = (dayIndex: number, meals: LocalPresetDayMeal[]) => {
    if (dayIndex >= 0 && dayIndex < days.value.length) {
      days.value[dayIndex].meals = meals
    }
  }

  const formatDays = (days: any[]) => {
    return days.map(day => ({
      dayOfWeek: day.dayOfWeek,
      meals: day.meals.map((meal: any) => ({
        mealId: meal.mealId,
        order: meal.order,
      })),
    }))
  }

  async function onSubmit(formData: { name: string; description: string }) {
    if (days.value.some(day => day.meals.length === 0)) {
      toast.error('Todos los días deben tener al menos una comida')
      return
    }

    isSubmitting.value = true

    try {
      const submitData = {
        ...formData,
        days: formatDays(days.value),
      }

      let response = null

      if (mode.value === 'edit' && currentPreset) {
        response = await PresetMealDataSourceImpl.getInstance().update(
          currentPreset.id,
          submitData,
        )
      } else {
        response =
          await PresetMealDataSourceImpl.getInstance().create(submitData)
      }

      if (response) {
        setTimeout(() => {
          router.push({ name: 'plantillas-alimentacion' })
        }, 800)
      }
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al procesar la solicitud')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    schema: presetMealSchema,
    onSubmit,
    defaultValues,
    mode,
    isSubmitting,
    days,
    addDay,
    removeDay,
    updateMeals,
  }
}
