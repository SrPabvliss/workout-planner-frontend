import { z } from 'zod'

export const ingredientSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  nutritionalInfo: z.object({
    servingSize: z.number({
      required_error: 'La porción es requerida.',
      invalid_type_error: 'Debe ser un número',
    }),
    servingUnit: z.string({
      required_error: 'La unidad de medida es requerida.',
    }),
    calories: z.number({
      required_error: 'Las calorías son requeridas.',
      invalid_type_error: 'Debe ser un número',
    }),
    protein: z.number({
      required_error: 'Las proteínas son requeridas.',
      invalid_type_error: 'Debe ser un número',
    }),
    carbs: z.number({
      required_error: 'Los carbohidratos son requeridos.',
      invalid_type_error: 'Debe ser un número',
    }),
    fat: z.number({
      required_error: 'Las grasas son requeridas.',
      invalid_type_error: 'Debe ser un número',
    }),
    fiber: z
      .number({
        invalid_type_error: 'Debe ser un número',
      })
      .optional(),
    sugar: z
      .number({
        invalid_type_error: 'Debe ser un número',
      })
      .optional(),
    sodium: z
      .number({
        invalid_type_error: 'Debe ser un número',
      })
      .optional(),
  }),
})

export const fieldConfig = {
  name: {
    label: 'Nombre',
  },
  nutritionalInfo: {
    servingSize: {
      label: 'Tamaño de porción',
      inputProps: {
        type: 'number',
        min: 0,
      },
    },
    servingUnit: {
      label: 'Unidad de medida',
    },
    label: 'Información Nutricional',
    calories: {
      label: 'Calorías',
      inputProps: {
        type: 'number',
        min: 0,
      },
    },
    protein: {
      label: 'Proteínas (g)',
      inputProps: {
        type: 'number',
        min: 0,
        step: 0.1,
      },
    },
    carbs: {
      label: 'Carbohidratos (g)',
      inputProps: {
        type: 'number',
        min: 0,
        step: 0.1,
      },
    },
    fat: {
      label: 'Grasas (g)',
      inputProps: {
        type: 'number',
        min: 0,
        step: 0.1,
      },
    },
    fiber: {
      label: 'Fibra (g)',
      inputProps: {
        type: 'number',
        min: 0,
        step: 0.1,
      },
    },
    sugar: {
      label: 'Azúcares (g)',
      inputProps: {
        type: 'number',
        min: 0,
        step: 0.1,
      },
    },
    sodium: {
      label: 'Sodio (mg)',
      inputProps: {
        type: 'number',
        min: 0,
      },
    },
  },
}
