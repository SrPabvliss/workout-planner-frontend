/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { ref } from 'vue'
import type { IPresetExercise } from '../interfaces/IPresetExercise'
import { PresetExerciseDataSourceImpl } from '../services/datasource'
import router from '@/router'
import { useToast } from 'vue-toastification'
import type {
  LocalPresetDay,
  LocalPresetDayExercise,
} from '../interfaces/ILocalPresetExercise'

export const presetExerciseSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  description: z
    .string({ required_error: 'La descripción es requerida.' })
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres.' }),
})

export function usePresetExerciseForm(currentPreset?: IPresetExercise | null) {
  const mode = ref<'edit' | 'new'>(currentPreset ? 'edit' : 'new')
  const isSubmitting = ref(false)
  const toast = useToast()

  const createInitialDay = (dayOfWeek: number) => ({
    dayOfWeek,
    exercises: [],
  })

  const days = ref<LocalPresetDay[]>(
    currentPreset
      ? currentPreset.days.map(day => ({
          dayOfWeek: day.dayOfWeek,
          exercises: day.exercises.map(ex => ({
            exerciseId: ex.exercise.id,
            sets: ex.sets,
            reps: ex.reps,
            order: ex.order,
            exercise: ex.exercise,
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
      toast.warning('Debe haber al menos un día en la rutina')
      return
    }

    days.value = days.value.filter(day => day.dayOfWeek !== dayOfWeek)
  }

  const updateExercises = (
    dayIndex: number,
    exercises: LocalPresetDayExercise[],
  ) => {
    if (dayIndex >= 0 && dayIndex < days.value.length) {
      days.value[dayIndex].exercises = exercises
    }
  }

  const formatDays = (days: any[]) => {
    return days.map(day => ({
      dayOfWeek: day.dayOfWeek,
      exercises: day.exercises.map((ex: any) => ({
        exerciseId: ex.exerciseId,
        sets: ex.sets,
        reps: ex.reps,
        order: ex.order,
      })),
    }))
  }

  async function onSubmit(formData: { name: string; description: string }) {
    if (days.value.some(day => day.exercises.length === 0)) {
      toast.error('Todos los días deben tener al menos un ejercicio')
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
        response = await PresetExerciseDataSourceImpl.getInstance().update(
          currentPreset.id,
          submitData,
        )
      } else {
        response =
          await PresetExerciseDataSourceImpl.getInstance().create(submitData)
      }

      if (response) {
        setTimeout(() => {
          router.push({ name: 'plantillas-ejercicios' })
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
    schema: presetExerciseSchema,
    onSubmit,
    defaultValues,
    mode,
    isSubmitting,
    days,
    addDay,
    removeDay,
    updateExercises,
  }
}
