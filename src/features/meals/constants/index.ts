import { z } from "zod"

export const MEAL_CATEGORIES_CONFIG = {
  maxDisplayedTags: 6,
  title: 'Categorías de Comida',
  placeholders: {
    loading: 'Cargando categorías...',
    default: 'Seleccionar categorías...',
  },
  emptyMessage: 'No se encontraron categorías',
} as const

export const MEAL_FORM_TITLES = {
  edit: 'Editar Comida',
  new: 'Nueva Comida',
} as const

export const mealSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  preparation: z
    .string()
    .min(1, 'Las instrucciones de preparación son requeridas'),
  ingredients: z
    .array(
      z.object({
        ingredientId: z.number(),
        unitId: z.number(),
        quantity: z.number().min(0.1, 'La cantidad debe ser mayor a 0'),
      }),
    )
    .min(1, 'Debe agregar al menos un ingrediente'),
  categories: z
    .array(z.number())
    .min(1, 'Debe seleccionar al menos una categoría'),
})

export const fieldConfig = {
  name: {
    label: 'Nombre',
    description: 'Nombre de la comida',
  },
  description: {
    label: 'Descripción',
    description: 'Breve descripción de la comida',
    inputProps: {
      type: 'textarea',
    },
  },
  preparation: {
    label: 'Preparación',
    description: 'Instrucciones paso a paso',
    inputProps: {
      type: 'textarea',
      rows: 5,
    },
  },
  ingredients: {
    label: 'Ingredientes',
    description: 'Seleccione los ingredientes y sus cantidades',
  },
  categories: {
    label: 'Categorías',
    description: 'Seleccione las categorías aplicables',
  },
}
