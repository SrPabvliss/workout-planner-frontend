<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { useRoute } from 'vue-router'
import MealBreadcrumb from '../components/meal-breadcrumb.vue'
import { ref, onMounted, computed } from 'vue'
import NewEditForm from '../components/form/new-edit-form.vue'
import type { IMeal } from '../../interfaces/IMeal'
import { MealDataSourceImpl } from '../../services/datasource'

const route = useRoute()
const mealId = Number(route.params.id)
const meal = ref<IMeal | null>(null)
const mealValue = computed(() => meal.value)

const breadcrumbItems = ref([
  { label: 'Todas las comidas', href: 'comidas' },
  { label: 'Editar', href: 'editMeal', current: true },
])

const getCurrentMeal = async () => {
  const response = await MealDataSourceImpl.getInstance().getById(mealId)
  meal.value = response
}

onMounted(() => {
  getCurrentMeal()
})
</script>

<template>
  <ContentLayout :title="'Editar comida'">
    <template #content>
      <MealBreadcrumb :breadcrumbItems="breadcrumbItems" />
      <NewEditForm v-if="meal" :meal="mealValue as IMeal" />
    </template>
  </ContentLayout>
</template>
