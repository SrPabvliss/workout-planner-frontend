import { z } from 'zod'

export const categoriesSchema = z.array(z.number()).min(1, {
  message: 'Debe seleccionar al menos una categoría.',
})

export const exerciseSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  description: z
    .string({ required_error: 'La descripción es requerida.' })
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres.' }),
  youtubeUrl: z
    .string()
    .url({ message: 'Debe ser una URL válida.' })
    .nullable()
    .optional(),
})

export type ExerciseFormData = z.infer<typeof exerciseSchema> & {
  categories: number[]
}

export const EXERCISE_FORM_SCHEMA = z.object({
  name: z.string(),
  description: z.string(),
  youtubeUrl: z.string().nullable().optional(),
})

export const EXERCISE_FIELD_CONFIG = {
  name: {
    label: 'Nombre',
    description: undefined,
  },
  description: {
    label: 'Descripción',
    componentType: 'textarea',
    description: 'Describe el ejercicio detalladamente',
  },
  youtubeUrl: {
    label: 'URL de YouTube',
    description: 'URL del video demostrativo (opcional)',
  },
}

export const CATEGORIES_CONFIG = {
  maxDisplayedTags: 6,
  title: 'Categorías',
  placeholders: {
    loading: 'Cargando categorías...',
    default: 'Buscar categorías...',
  },
  emptyMessage: 'No se encontraron categorías',
} as const

export const IMAGES_CONFIG = {
  addButtonText: 'Agregar imágenes',
} as const

export const FORM_TITLES = {
  edit: 'Editar Ejercicio',
  new: 'Nuevo Ejercicio',
} as const
