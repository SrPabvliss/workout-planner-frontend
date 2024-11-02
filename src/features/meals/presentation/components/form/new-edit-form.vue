<script setup lang="ts">
import type { IMeal } from '../../../interfaces/IMeal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { computed, ref } from 'vue'
import { useMealForm } from '../../../composable/use-meal-form'
import { useFormData } from '../../../composable/use-form-data'
import MealCategories from './meal-categories.vue'
import NutritionalInfoSection from './nutritional-info-section.vue'
import BasicInfoSection from './basic-info-section.vue'
import IngredientSection from './ingredient-section.vue'

const props = defineProps<{
  meal?: IMeal | null
}>()

const { onSubmit, defaultValues, mode, categoryError } = useMealForm(props.meal)
const { ingredients, categories, units, isLoading } = useFormData()

const formValues = ref({
  name: defaultValues.name || '',
  description: defaultValues.description || '',
  preparation: defaultValues.preparation || '',
  ingredients: [...(defaultValues.ingredients || [])],
  categories: [...(defaultValues.categories || [])],
})

const totalNutrition = computed(() => {
  return formValues.value.ingredients.reduce(
    (acc, curr) => {
      const ingredient = ingredients.value.find(i => i.id === curr.ingredientId)
      if (!ingredient) return acc

      const ratio =
        Number(curr.quantity) / ingredient.nutritionalInfo.servingSize
      return {
        calories: acc.calories + ingredient.nutritionalInfo.calories * ratio,
        protein: acc.protein + ingredient.nutritionalInfo.protein * ratio,
        carbs: acc.carbs + ingredient.nutritionalInfo.carbs * ratio,
        fat: acc.fat + ingredient.nutritionalInfo.fat * ratio,
      }
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )
})

const handleSubmit = () => {
  onSubmit(formValues.value)
}
</script>

<template>
  <div class="mx-auto max-w-7xl mt-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BasicInfoSection
          v-model:name="formValues.name"
          v-model:description="formValues.description"
          v-model:preparation="formValues.preparation"
        />
        <IngredientSection
          v-model="formValues.ingredients"
          :ingredients="ingredients"
          :units="units"
        />
        <MealCategories
          v-model:selectedCategories="formValues.categories"
          :category-options="
            categories.map(cat => ({
              label: cat.name,
              value: cat.id,
            }))
          "
          :is-loading-categories="isLoading"
          :category-error="categoryError"
        />
        <Button class="w-full" @click="handleSubmit">
          {{ mode === 'edit' ? 'Actualizar' : 'Crear' }} Comida
        </Button>
      </div>

      <div class="space-y-6">
        <NutritionalInfoSection :nutritional-info="totalNutrition" />
        <Card>
          <CardContent class="p-0">
            <img
              src="https://askthescientists.com/wp-content/uploads/2021/06/AdobeStock_235582346.jpeg"
              alt="Meal illustration"
              class="w-full h-auto rounded-xl"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
